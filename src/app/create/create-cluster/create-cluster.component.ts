import { ClusterFormService } from './services/cluster-form.service';
import { Subscription, tap } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationStepComponent, MetadataStepComponent, ResourcesStepComponent, SummaryComponent, SummaryStepComponent } from './components';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-cluster',
  templateUrl: './create-cluster.component.html',
  styleUrls: ['./create-cluster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StepperModule,
    RouterModule,
    SummaryComponent,
    ButtonModule,
    LocationStepComponent,
    ResourcesStepComponent,
    SummaryStepComponent,
    MetadataStepComponent,
  ],
})
export class CreateClusterComponent implements OnInit, OnDestroy {
  private clusterFormService = inject(ClusterFormService);

  private translateService = inject(TranslateService);
  private changeDetector = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  items: MenuItem[];
  activeIndex: number = 0;
  environment = environment;

  activeStep: number = 1;

  clusterForm: FormGroup = this.clusterFormService?.clusterForm;
  nodePools: any[] | undefined;

  private subscriptions = new Subscription();

  ngOnInit() {
    this.setupSteps();
    this.setupForm();
    this.subscriptions.add(
      this.translateService.onLangChange
        .pipe(
          tap(() => {
            this.setupSteps();
            this.changeDetector.detectChanges();
          }),
        )
        .subscribe(),
    );
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  private setupSteps(): void {
    this.items = [
      {
        label: this.translateService.instant('pages.create.cluster.steps.location.title'),
        routerLink: 'new',
      },
      {
        label: this.translateService.instant('pages.create.cluster.steps.resources.title'),
        routerLink: 'resources',
      },
      {
        label: this.translateService.instant('pages.create.cluster.steps.metadata.title'),
        routerLink: 'metadata',
      },
      {
        label: this.translateService.instant('pages.create.cluster.steps.summary.title'),
        routerLink: 'summary',
      },
    ];
  }

  private setupForm(): void {
    this.clusterForm = this.fb.group({
      project: [null, [Validators.required]],
      provider: [null, [Validators.required]],
      providerConfig: this.fb.group({
        tanzu: this.fb.group({
          workspace: [null, [Validators.required]],
        }),
        azure: this.fb.group({
          region: [null, [Validators.required]],
          subscription: [null, [Validators.required]],
          resourceGroup: [null, [Validators.required]],
        }),
      }),
      environment: [null, [Validators.required]],
      clusterName: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]{2,}$/)]],
      availability: [null, [Validators.required]],
      k8sVersion: [null, [Validators.required]],
      tags: [[], []],
      ownergroup: [null, [Validators.required, Validators.min(1), Validators.email]],
      overrideOwnergroup: [false, []],
      orderBy: [null, [Validators.required]],
      capasity: [null, [Validators.required, Validators.minLength(1)]],
      sensitivity: [null, { validators: [Validators.required, Validators.min(1), Validators.max(4)] }],
      criticality: [null, { validators: [Validators.required, Validators.min(1), Validators.max(4)] }],
    });
    this.clusterFormService.clusterForm = this.clusterForm;
  }

  addNodePool(price: any): void {
    if (!this.nodePools) {
      this.nodePools = [];
    }
    this.nodePools.push({
      name: `worker-${this.nodePools.length + 1}`,
      count: price.count,
      machineClass: price.machineClass,
      price: price.price,
    });
    this.clusterForm.patchValue({ capasity: this.nodePools });
    this.changeDetector.detectChanges();
  }

  removeNodePool(nodePool: any): void {
    this.nodePools = this.nodePools.filter((x: any) => {
      if (x != nodePool) {
        return x;
      }
    });

    if (this.nodePools && this.nodePools.length === 0) {
      this.nodePools = undefined;
      this.clusterForm.patchValue({ capasity: null });
    } else {
      this.clusterForm.patchValue({ capasity: this.nodePools });
    }

    this.changeDetector.detectChanges();
  }

  getNodePoolSum(): number {
    return this.clusterFormService.getNodePoolSum();
  }

  linkToStep(step: number | string): void {
    this.activeStep = step as number;
    this.activeIndex = (step as number) - 1;
    this.changeDetector.detectChanges();
  }
}
