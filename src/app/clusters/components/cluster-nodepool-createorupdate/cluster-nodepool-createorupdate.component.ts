import { ProviderFeaturesService } from './../../../core/services/provider-features.service';
import { NodepoolService } from './../../services/nodepool.service';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClusterService } from '../../services';
import { TableModule } from 'primeng/table';
import { PriceService } from '../../../core/services/price.service';
import { Price } from '../../../core/models/price';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule, JsonPipe, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { ConfigService } from '../../../core/services/config.service';
import { ProviderComponent } from '../../../shared/components/provider/provider.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ClusterNodepoolCreateorupdateSummaryComponent } from '../cluster-nodepool-createorupdate-summary/cluster-nodepool-createorupdate-summary.component';
import { CheckboxModule } from 'primeng/checkbox';
import { Label } from '../../../core/models/label';
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { DropdownModule } from 'primeng/dropdown';
import { uniquePropertyValidator } from '../../../shared/validators/uniquePropertyValidator';

@Component({
  selector: 'app-cluster-nodepool-createorupdate',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    TableModule,
    LowerCasePipe,
    SharedModule,
    ProviderComponent,
    TitleCasePipe,
    InputNumberModule,
    FormsModule,
    ClusterNodepoolCreateorupdateSummaryComponent,
    JsonPipe,
    CheckboxModule,
    DropdownModule,
    CommonModule,
  ],
  templateUrl: './cluster-nodepool-createorupdate.component.html',
  styleUrl: './cluster-nodepool-createorupdate.component.scss',
})
export class ClusterNodepoolCreateorupdateComponent implements OnInit, OnDestroy {
  Object: any;
  @Input() set nodepool(value: any | undefined) {
    this.nodePool = value;
    this.nodePoolId = value?.id;
    this.initializeNodepool();
  }
  get nodepool(): any | undefined {
    return this.nodePool;
  }

  @Output() close = new EventEmitter<void>();

  clusterId: string | undefined;
  nodePoolId: string | undefined;
  nodePool: any | undefined;
  prices: Price[] = [];
  rows: number = 10;
  rowsPerPage: number[] = [10, 20, 50];
  labels: Label[] = [];
  tags: string[] = [];

  nodepoolForm: FormGroup = this.nodepoolService?.nodepoolForm;
  labelForm: FormGroup | undefined;
  nodepoolFetchError: any;
  selectedPrice: Price | undefined;

  pricesFetchError: any;
  showLabelEdit: boolean = false;

  get labelsArray(): any {
    return this.nodepoolForm?.get('labels');
  }

  private clusterService = inject(ClusterService);
  private configService = inject(ConfigService);
  private priceService = inject(PriceService);
  private changeDetector = inject(ChangeDetectorRef);
  private formbuilder = inject(FormBuilder);
  private providerFeaturesService = inject(ProviderFeaturesService);
  private subscriptions = new Subscription();
  private customConfig: Config = {
    dictionaries: [adjectives, colors],
    separator: '-',
    length: 2,
  };

  private labelPattern = /^[a-zA-Z0-9-_./]{1,63}$/;
  private labelValuePattern = /(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])?/;

  constructor(private nodepoolService: NodepoolService) {}

  ngOnInit(): void {
    this.rows = this.configService?.config?.rows;
    this.rowsPerPage = this.configService?.config?.rowsPerPage;

    const form = this.formbuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.labelPattern)]],
      price: [, [Validators.required]],
      autoScale: [false, [Validators.required]],
      minNodes: [1, [Validators.required]],
      maxNodes: [3, [Validators.required]],
      labels: this.formbuilder.array(
        [
          // this.formbuilder.group(
          //   {
          //     key: ['', [Validators.required, Validators.pattern(this.labelPattern)]],
          //     value: ['', [Validators.required, Validators.pattern(this.labelValuePattern)]],
          //   },
          //   { validators: [] },
          // ),
        ],
        { validators: [] },
      ),
      tags: this.formbuilder.array([], { validators: [Validators.pattern(this.labelPattern)] }),
    });

    this.labelForm = this.formbuilder.group({
      key: ['', [Validators.required, Validators.pattern(this.labelPattern)]],
      value: ['', [Validators.required, Validators.pattern(this.labelValuePattern)]],
    });
    this.fetchPrices();

    this.nodepoolService.nodepoolForm = form;
    this.nodepoolForm = form;
    this.proposeNewName();

    if (this.nodePool) {
      this.initializeNodepool();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  cancel(): void {
    this.reset();
    this.hide();
  }

  hide(): void {
    this.close.emit();
  }

  reset(): void {
    this.nodepoolForm?.reset();
  }

  fetchPrices(): void {
    this.pricesFetchError = null;
    const provider = this.clusterService?.getCluster()?.workspace?.datacenter?.provider;
    this.subscriptions.add(
      this.priceService
        ?.getAll()
        .pipe(
          map((prices) => {
            const pricesPerProvider = prices.filter((price) => {
              return price?.provider === provider;
            });
            this.prices = pricesPerProvider;

            this.setDefaultPrice();

            return pricesPerProvider;
          }),
          catchError((error) => {
            this.pricesFetchError = error;
            return null;
          }),
          finalize(() => {
            this.changeDetector.detectChanges();
          }),
        )
        .subscribe(),
    );
  }

  onPriceSelected(price: Price): void {
    this.selectedPrice = price;
    this.nodepoolForm?.get('price')?.setValue(price);
  }

  private initializeNodepool(): void {
    if (!this.nodePool) {
      return;
    }
    this.nodepoolForm?.patchValue({
      name: this.nodePool?.name,
    });
  }

  addLabel(keyInput: HTMLInputElement, valueInput: HTMLInputElement): void {
    if (!keyInput?.value) {
      return;
    }

    (this.nodepoolForm.get('labels') as FormArray).push(
      this.formbuilder.group({
        key: [keyInput.value, [Validators.required, Validators.pattern(this.labelPattern)]],
        value: [valueInput.value, [Validators.required, Validators.pattern(this.labelValuePattern)]],
      }),
    );

    keyInput.value = '';
    valueInput.value = '';

    keyInput.focus();
  }

  removeLabel(label: FormControl): void {
    (this.nodepoolForm.get('labels') as FormArray).removeAt((this.nodepoolForm.get('labels') as FormArray).controls.indexOf(label));
  }

  addTag(tag: string): void {
    this.tags.push(tag);
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  getShortName(): string {
    const shortName: string = uniqueNamesGenerator(this.customConfig);
    return shortName;
  }

  proposeNewName(): void {
    this.nodepoolForm?.get('name')?.setValue(this.getRandomName());
  }

  onPriceChange(event: any): void {
    this.nodepoolForm?.get('price')?.setValue(event.value);
  }

  submit(): void {
    if (this.nodepoolForm?.valid) {
      //this.nodepoolService?.create(this.nodepoolForm?.value);
      this.hide();
    }
  }

  getMaxMinNodes(): number {
    const minNodes = this.nodepoolForm?.get('minNodes')?.value;
    const maxNodes = this.nodepoolForm?.get('maxNodes')?.value;
    const autoScale = this.nodepoolForm?.get('autoScale')?.value;
    return 10;
  }

  getMinMaxNodes(): number {
    const minNodes = this.nodepoolForm?.get('minNodes')?.value;
    const maxNodes = this.nodepoolForm?.get('maxNodes')?.value;
    // const autoScale = this.nodepoolForm?.get('autoScale')?.value;
    // if (!autoScale) {
    //   return 10;
    // }
    return minNodes;
  }

  autoscaleChanged(event: any): void {
    this.changeDetector.detectChanges();
  }

  private getRandomName(): string {
    const randomName: string = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: '-',
    });
    return randomName;
  }

  private setDefaultPrice(): void {
    if (this.prices.length > 0) {
      this.selectedPrice = this.prices.find((price) => price.machineClass.includes('medium'));
      // this.nodepoolForm?.patchValue({
      //   price: this.selectedPrice?.machineClass,
      // });
      this.nodepoolForm?.get('price')?.setValue(this.selectedPrice);
      this.changeDetector.detectChanges();
    }
  }
}
