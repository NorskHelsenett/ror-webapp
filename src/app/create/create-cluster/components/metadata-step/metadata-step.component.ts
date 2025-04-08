import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, model, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClusterFormService } from '../../services/cluster-form.service';
import { Observable, Subscription, catchError, share, tap } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AclScopes, AclAccess } from '../../../../core/models/acl-scopes';
import { AclService } from '../../../../core/services/acl.service';
import { CommonModule } from '@angular/common';
import { InputDropdownComponent } from '../../../../shared/components/input-dropdown/input-dropdown.component';
import { SelectModule } from 'primeng/select';
import { ConfigService } from '../../../../core/services/config.service';
import { ChipModule } from 'primeng/chip';
import { ColorService } from '../../../../core/services/color.service';
import { HexService } from '../../../../core/services/hex.service';

@Component({
  selector: 'app-metadata-step',
  templateUrl: './metadata-step.component.html',
  styleUrls: ['./metadata-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, CommonModule, SelectModule, InputDropdownComponent, FormsModule, ReactiveFormsModule, ChipModule],
})
export class MetadataStepComponent implements OnInit, OnDestroy, AfterViewInit {
  private clusterFormService = inject(ClusterFormService);
  private configService = inject(ConfigService);
  private colorService = inject(ColorService);
  private hexService = inject(HexService);

  @Input() clusterForm: FormGroup = this.clusterFormService.clusterForm;

  nextstep = model();
  prevstep = model();

  availableCriticalities: any[];
  selectedCriticality: any;
  availableSensitivities: any[];
  selectedSensitivity: any;

  account: any | undefined;

  accountClaims: any | undefined;
  accessGroups: any[] = [];
  ownergroupEditable = false;
  adminOwner$: Observable<boolean> | undefined;
  aclFetchError: any;

  tagForm: FormGroup;
  tags: string[] = [];

  private subscriptions = new Subscription();
  private rortextregex = this.configService.config.regex.forms;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private fb: FormBuilder,
    private oauthService: OAuthService,
    private translateService: TranslateService,
    private aclService: AclService,
  ) {}
  ngOnInit(): void {
    this.setup();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  setup(): void {
    this.fetchAcl();

    this.tagForm = this.fb.group({
      tag: [null, { validators: [Validators.required, Validators.minLength(1), Validators.pattern(this.rortextregex)] }],
    });

    this.setupCriticalityAndSensitivity();
    this.subscriptions.add(this.translateService.onLangChange.subscribe(() => this.setupCriticalityAndSensitivity()));

    let domain = '';
    this.accountClaims = this.oauthService?.getIdentityClaims();
    const emailArray = this.accountClaims?.email?.split('@');
    if (emailArray?.length > 1) {
      domain = emailArray[1];
    }
    this.accessGroups = this.accountClaims?.groups.map((x: any) => {
      return { name: `${x}@${domain}` };
    });
    this.accessGroups = this.accessGroups.filter((x: any) => x?.name !== null);

    this.changeDetector.detectChanges();
  }

  fetchAcl(): void {
    this.adminOwner$ = this.aclService.check(AclScopes.ROR, AclScopes.Global, AclAccess.Owner).pipe(
      share(),
      tap((isAdminOwner: boolean) => {
        this.ownergroupEditable = isAdminOwner;
      }),
      catchError((error: any) => {
        this.aclFetchError = error;
        this.changeDetector.detectChanges();
        throw error;
      }),
    );
  }

  setupCriticalityAndSensitivity(): void {
    this.availableCriticalities = [
      {
        name: this.translateService.instant('pages.clusters.details.edit.form.availableCriticalities.1'),
        value: 1,
      },
      {
        name: this.translateService.instant('pages.clusters.details.edit.form.availableCriticalities.2'),
        value: 2,
      },
      {
        name: this.translateService.instant('pages.clusters.details.edit.form.availableCriticalities.3'),
        value: 3,
      },
      {
        name: this.translateService.instant('pages.clusters.details.edit.form.availableCriticalities.4'),
        value: 4,
      },
    ];

    this.availableSensitivities = [
      {
        name: this.translateService.instant('pages.clusters.details.edit.form.availableSensitivities.1'),
        value: 1,
      },
      {
        name: this.translateService.instant('pages.clusters.details.edit.form.availableSensitivities.2'),
        value: 2,
      },
      {
        name: this.translateService.instant('pages.clusters.details.edit.form.availableSensitivities.3'),
        value: 3,
      },
      {
        name: this.translateService.instant('pages.clusters.details.edit.form.availableSensitivities.4'),
        value: 4,
      },
    ];

    let selectedCriticality = this.clusterFormService?.clusterForm?.get('criticality')?.value;
    if (selectedCriticality) {
      const filter = this.availableCriticalities?.filter((x) => x?.value == selectedCriticality?.value);
      if (filter.length === 1) {
        this.clusterFormService?.clusterForm?.get('criticality')?.setValue(filter[0]);
      }
    }

    let selectedSensitivity = this.clusterFormService?.clusterForm?.get('sensitivity')?.value;
    if (selectedSensitivity) {
      const filter = this.availableSensitivities?.filter((x) => x?.value == selectedSensitivity?.value);
      if (filter.length === 1) {
        this.clusterFormService?.clusterForm?.get('sensitivity')?.setValue(filter[0]);
      }
    }

    this.changeDetector.detectChanges();
  }

  validForm(): boolean {
    const ownerGroupValid = this.clusterFormService?.clusterForm?.get('ownergroup')?.valid;
    return ownerGroupValid;
  }

  nextSteps(): void {
    this.nextstep.set(true);
  }

  previousSteps(): void {
    this.prevstep.set(true);
  }

  addTag(tag: string): void {
    if (!tag || tag.length === 0) {
      return;
    }

    this.tags.push(tag);
    this.clusterFormService.clusterForm?.patchValue({ tags: this.tags });
    this.tagForm.reset();
    this.changeDetector.detectChanges();
  }

  removeTag(tag: string): void {
    if (!tag || tag.length === 0) {
      return;
    }
    this.tags = this.tags.filter((t) => t !== tag);
    this.clusterFormService.clusterForm?.patchValue({ tags: this.tags });
    this.changeDetector.detectChanges();
  }

  getColorByText(text: string): string {
    const consthexColor = this.hexService.stringToSixCharHex(text);
    const color = this.colorService.getTailwindColorName(consthexColor);
    if (color) {
      return color;
    } else {
      return 'gray-500';
    }
  }

  private createServiceTagArray(): Map<string, string> {
    let serviceTags: Map<string, string> = new Map();
    const formServiceTags = this.clusterFormService.clusterForm?.get('tags')?.getRawValue();
    if (!formServiceTags || formServiceTags?.length == 0) {
      return serviceTags;
    }

    formServiceTags.forEach((tag: string) => {
      serviceTags.set(tag, '');
    });

    return serviceTags;
  }
}
