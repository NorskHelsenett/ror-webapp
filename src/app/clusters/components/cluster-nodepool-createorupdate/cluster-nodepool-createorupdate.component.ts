import { ProviderFeaturesService } from './../../../core/services/provider-features.service';
import { NodepoolService } from './../../services/nodepool.service';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClusterService } from '../../services';
import { TableModule } from 'primeng/table';
import { PriceService } from '../../../core/services/price.service';
import { Price } from '../../../core/models/price';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ConfigService } from '../../../core/services/config.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { ClusterNodepoolCreateorupdateSummaryComponent } from '../cluster-nodepool-createorupdate-summary/cluster-nodepool-createorupdate-summary.component';
import { CheckboxModule } from 'primeng/checkbox';
import { uniqueNamesGenerator, Config, adjectives, colors, animals, names } from 'unique-names-generator';
import { DropdownModule } from 'primeng/dropdown';
import { Resourcesv2Service } from '../../../core/services/resourcesv2.service';
import { MessageService } from 'primeng/api';
import * as CryptoJs from 'crypto-js';
import { ColorService } from '../../../core/services/color.service';

@Component({
  selector: 'app-cluster-nodepool-createorupdate',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    TableModule,
    SharedModule,
    TitleCasePipe,
    InputNumberModule,
    FormsModule,
    ClusterNodepoolCreateorupdateSummaryComponent,
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
  @Input() cluster: any;

  private clusterService = inject(ClusterService);
  private configService = inject(ConfigService);
  private priceService = inject(PriceService);
  private changeDetector = inject(ChangeDetectorRef);
  private formbuilder = inject(FormBuilder);
  private messageService = inject(MessageService);
  private providerFeaturesService = inject(ProviderFeaturesService);
  private resourceV2Service = inject(Resourcesv2Service);
  private nodepoolService = inject(NodepoolService);
  private translateService = inject(TranslateService);
  private colorService = inject(ColorService);

  @Output() close = new EventEmitter<void>();

  clusterId: string | undefined;

  nodePoolId: string | undefined;
  nodePool: any | undefined;
  prices: Price[] = [];
  rows: number = 10;
  rowsPerPage: number[] = [10, 20, 50];

  nodepoolForm: FormGroup = this.nodepoolService?.nodepoolForm;
  labelForm: FormGroup | undefined;
  tagForm: FormGroup | undefined;
  nodepoolFetchError: any;
  selectedPrice: Price | undefined;

  pricesFetchError: any;
  showLabelEdit: boolean = false;
  maxNodes: number = 10;

  get labelsArray(): any {
    return this.nodepoolForm?.get('labels');
  }

  get tagsArray(): any {
    return this.nodepoolForm?.get('tags');
  }

  private subscriptions = new Subscription();
  private customConfig: Config = {
    dictionaries: [adjectives, colors],
    separator: '-',
    length: 2,
  };

  private labelPattern = /^[a-zA-Z0-9-_./]{1,63}$/;
  private labelValuePattern = /(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])?/;

  constructor() {}

  ngOnInit(): void {
    this.fetchPrices();
    this.rows = this.configService?.config?.rows;
    this.rowsPerPage = this.configService?.config?.rowsPerPage;

    const form = this.formbuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.labelPattern)]],
      price: [, [Validators.required]],
      autoScale: [false, [Validators.required]],
      minNodes: [1, [Validators.required]],
      maxNodes: [3, [Validators.required]],
      labels: this.formbuilder.array([], { validators: [] }),
      tags: this.formbuilder.array([], { validators: [] }),
    });
    this.nodepoolService.nodepoolForm = form;
    this.nodepoolForm = form;

    this.labelForm = this.formbuilder.group({
      key: ['', [Validators.required, Validators.pattern(this.labelPattern)]],
      value: ['', [Validators.required, Validators.pattern(this.labelValuePattern)]],
    });

    this.tagForm = this.formbuilder.group({
      key: ['', [Validators.required, Validators.pattern(this.labelPattern)]],
      value: ['', [Validators.required, Validators.pattern(this.labelValuePattern)]],
      color: ['', [Validators.required]],
    });

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

    const nodeCount = this.nodePool?.nodes?.length;

    this.nodepoolForm?.patchValue({
      name: this.nodePool?.name,
      minNodes: nodeCount,
      autoScale: false,
      maxNodes: this.nodePool?.maxNodes || this.maxNodes,
    });
  }

  addLabel(keyInput: HTMLInputElement, valueInput: HTMLInputElement): void {
    if (!keyInput?.value) {
      this.messageService?.add({
        severity: 'error',
        summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.error'),
        detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.labelKeyError'),
      });
      return;
    }

    if (!valueInput?.value) {
      this.messageService?.add({
        severity: 'error',
        summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.error'),
        detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.labelValueError'),
      });
      return;
    }

    for (const label of this.nodepoolForm.get('labels')?.value) {
      if (label?.key === keyInput.value) {
        this.messageService?.add({
          severity: 'error',
          summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.error'),
          detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.labelKeyExists'),
        });
        return;
      }
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
    this.changeDetector.detectChanges();
  }

  addTag(tagkeyInput: HTMLInputElement, tagvalueInput: HTMLInputElement): void {
    if (!tagkeyInput?.value) {
      this.messageService?.add({
        severity: 'error',
        summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.error'),
        detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.tagKeyError'),
      });
      return;
    }

    if (!tagvalueInput?.value) {
      this.messageService?.add({
        severity: 'error',
        summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.error'),
        detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.tagValueError'),
      });
      return;
    }

    for (const tag of this.nodepoolForm.get('tags')?.value) {
      if (tag?.key === tagkeyInput.value) {
        this.messageService?.add({
          severity: 'error',
          summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.error'),
          detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.labelKeyExists'),
        });
        return;
      }
    }

    const colorHash = this.stringToSixCharHex(tagkeyInput.value);
    let color = this.colorService.getHexColor(colorHash);

    (this.nodepoolForm.get('tags') as FormArray).push(
      this.formbuilder.group({
        key: [tagkeyInput.value, [Validators.required, Validators.pattern(this.labelPattern)]],
        value: [tagvalueInput.value, [Validators.required, Validators.pattern(this.labelValuePattern)]],
        color: [color, [Validators.required]],
      }),
    );

    tagkeyInput.value = '';
    tagvalueInput.value = '';

    tagkeyInput.focus();
    this.changeDetector.detectChanges();
  }

  removeLabel(label: FormControl): void {
    (this.nodepoolForm.get('labels') as FormArray).removeAt((this.nodepoolForm.get('labels') as FormArray).controls.indexOf(label));
  }

  removeTag(tag: FormControl): void {
    (this.nodepoolForm.get('tags') as FormArray).removeAt((this.nodepoolForm.get('tags') as FormArray).controls.indexOf(tag));
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
      const nodePool = this.nodepoolForm?.value;

      let nodes = [];
      for (let i = 0; i < nodePool.minNodes; i++) {
        let name = `${nodePool?.name}-${this.getRandomShortName()}`;
        nodes.push({
          name: name,
          role: 'worker',
          created: new Date(),
          osImage: 'ACoolDistro',
          machineName: name,
          metrics: {
            priceMonth: -1,
            priceYear: -12,
            cpu: 0,
            memory: 0,
            cpuConsumed: 0,
            memoryConsumed: 0,
            cpuPercentage: 0,
            memoryPercentage: 0,
            nodePoolCount: 0,
            nodeCount: 0,
            clusterCount: 0,
          },
          architecture: 'amd64',
          containerRuntimeVersion: 'containerd://2.0.0',
          kernelVersion: 'unknown',
          kubeProxyVersion: 'unknown',
          kubeletVersion: 'unknown',
          operatingSystem: 'linux',
          machineClass: nodePool?.price?.machineClass,
        });
      }

      this.cluster?.topology?.nodePools?.push({
        name: `${nodePool?.name}-${this.getRandomShortName()}`,
        machineClass: nodePool?.price?.machineClass,
        metrics: {
          priceMonth: nodePool?.price?.price,
          priceYear: nodePool?.price?.price * 12,
          cpu: nodePool?.price?.cpu,
          memory: nodePool?.price?.memory,
          cpuConsumed: 0,
          memoryConsumed: 0,
          cpuPercentage: 0,
          memoryPercentage: 0,
          nodePoolCount: 0,
          nodeCount: nodePool?.minNodes,
          clusterCount: 0,
        },
        nodes: nodes,
        minNodes: 1,
      });

      this.messageService?.add({
        severity: 'success',
        summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.success'),
        detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.createSuccess'),
      });
      setTimeout(() => {
        this.hide();
      }, 100);
    } else {
      this.messageService?.add({
        severity: 'error',
        summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.error'),
        detail: 'Form is invalid',
      });
    }
  }

  getMinMaxNodes(): number {
    const minNodes = this.nodepoolForm?.get('minNodes')?.value;
    const maxNodes = this.nodepoolForm?.get('maxNodes')?.value;
    return minNodes;
  }

  minNodesChanged(event: any): void {
    const minNodes = this.nodepoolForm?.get('minNodes')?.value;
    const maxNodes = this.nodepoolForm?.get('maxNodes')?.value;
    if (minNodes > maxNodes) {
      this.nodepoolForm?.get('maxNodes')?.setValue(minNodes);
    }
    this.changeDetector.detectChanges();
  }

  autoscaleChanged(event: any): void {
    if (event?.checked) {
      const minNodes = this.nodepoolForm?.get('minNodes')?.value;
      const maxNodes = this.nodepoolForm?.get('maxNodes')?.value;
      if (maxNodes !== 0) {
        let mxNodes = minNodes + 1;
        if (mxNodes > this.maxNodes) {
          mxNodes = this.maxNodes;
        }
        this.nodepoolForm?.get('maxNodes')?.setValue(mxNodes);
      } else {
        this.nodepoolForm?.get('maxNodes')?.setValue(this.maxNodes);
      }
    }
    this.changeDetector.detectChanges();
  }

  getColorFromHex(hex: string): string {
    return this.colorService.getTailwindColorName(hex);
  }

  private getRandomName(): string {
    const randomName: string = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: '-',
    });
    return randomName;
  }

  private getRandomShortName(): string {
    const randomName = uniqueNamesGenerator({
      dictionaries: [names],
    });
    return randomName;
  }

  private setDefaultPrice(): void {
    if (!this.prices || this.prices?.length === 0) {
      return;
    }

    this.selectedPrice = this.prices.find((price: Price) => price?.machineClass?.includes('medium'));
    this.nodepoolForm?.get('price')?.setValue(this.selectedPrice);

    if (this.nodePool) {
      this.selectedPrice = this.prices.find((price: Price) => price?.machineClass === this.nodePool?.machineClass);
      this.nodepoolForm?.get('price')?.setValue(this.selectedPrice);
    }

    this.changeDetector.detectChanges();
  }

  private stringToSixCharHex(input: string): string {
    // Convert string to a numeric hash
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }

    // Convert to hex and ensure positive value
    const hex = (hash >>> 0).toString(16).toUpperCase();

    // Pad or truncate to 6 characters
    if (hex.length < 6) {
      return hex.padStart(6, '0');
    }
    return hex.slice(0, 6);
  }
}
