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
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ConfigService } from '../../../core/services/config.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { ClusterNodepoolCreateorupdateSummaryComponent } from '../cluster-nodepool-createorupdate-summary/cluster-nodepool-createorupdate-summary.component';
import { CheckboxModule } from 'primeng/checkbox';
import { uniqueNamesGenerator, Config, adjectives, colors, animals, names } from 'unique-names-generator';
import { Resourcesv2Service } from '../../../core/services/resourcesv2.service';
import { MessageService } from 'primeng/api';
import { Select, SelectModule } from 'primeng/select';

@Component({
  selector: 'app-cluster-nodepool-createorupdate',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    TableModule,
    TitleCasePipe,
    InputNumberModule,
    FormsModule,
    ClusterNodepoolCreateorupdateSummaryComponent,
    CheckboxModule,
    SelectModule,
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

  @Output() close = new EventEmitter<void>();

  clusterId: string | undefined;

  nodePoolId: string | undefined;
  nodePool: any | undefined;
  prices: Price[] = [];
  rows: number = 10;
  rowsPerPage: number[] = [10, 20, 50];

  nodepoolForm: FormGroup = this.nodepoolService?.nodepoolForm;
  labelForm: FormGroup | undefined;
  taintForm: FormGroup | undefined;
  taintEffects: any[] = [
    { label: 'NoSchedule', value: 'NoSchedule' },
    { label: 'PreferNoSchedule', value: 'PreferNoSchedule' },
    { label: 'NoExecute', value: 'NoExecute' },
  ];
  nodepoolFetchError: any;
  selectedPrice: Price | undefined;

  pricesFetchError: any;
  showLabelEdit: boolean = false;
  maxNodes: number = 10;

  get labelsArray(): any {
    return this.nodepoolForm?.get('metadata')?.get('labels');
  }

  get taintArray(): any {
    return this.nodepoolForm?.get('taint');
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

    let form = this.formbuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.labelPattern)]],
      price: [, [Validators.required]],
      machineClass: [null, [Validators.required]],
      provider: [this.cluster?.workspace?.datacenter?.provider, [Validators.required]],
      replicas: [null, [Validators.required]],
      autoscaling: this.formbuilder.group({
        enabled: [false],
        minReplicas: [1, [Validators.required]],
        maxReplicas: [3, [Validators.required]],
        scalingRyles: this.formbuilder.array([], { validators: [] }),
      }),
      metadata: this.formbuilder.group({
        labels: this.formbuilder.array([], { validators: [] }),
        annotations: this.formbuilder.array([], { validators: [] }),
      }),
      taint: this.formbuilder.array([], { validators: [] }),
    });

    this.nodepoolService.nodepoolForm = form;
    this.nodepoolForm = form;

    this.labelForm = this.formbuilder.group({
      key: ['', [Validators.required, Validators.pattern(this.labelPattern)]],
      value: ['', [Validators.required, Validators.pattern(this.labelValuePattern)]],
    });

    this.taintForm = this.formbuilder.group({
      key: ['', [Validators.required, Validators.pattern(this.labelPattern)]],
      value: ['', [Validators.required, Validators.pattern(this.labelValuePattern)]],
      effect: ['', [Validators.required]],
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
    this.nodepoolForm?.get('machineClass')?.setValue(price?.machineClass);
    this.changeDetector.detectChanges();
  }

  private initializeNodepool(): void {
    if (!this.nodePool) {
      return;
    }

    const price = this.prices.find((price) => price?.machineClass === this.nodePool?.machineClass);

    if (this.labelsArray?.length > 0) {
      this.labelsArray?.clear();
    }
    if (this.taintArray?.length > 0) {
      this.taintArray?.clear();
    }

    if (this.nodePool?.metadata?.labels) {
      Object.entries(this.nodePool.metadata.labels).forEach(([key, value]) => {
        console.log('label', { key, value });
        this.labelsArray?.push(
          this.formbuilder.group({
            key: [key, [Validators.required, Validators.pattern(this.labelPattern)]],
            value: [value, [Validators.required, Validators.pattern(this.labelValuePattern)]],
          }),
        );
      });
    }

    for (const taint of this.nodePool?.taint) {
      this.taintArray?.push(
        this.formbuilder.group({
          key: [taint?.key, [Validators.required, Validators.pattern(this.labelPattern)]],
          value: [taint?.value, [Validators.required, Validators.pattern(this.labelValuePattern)]],
          effect: [taint?.effect, [Validators.required]],
        }),
      );
    }

    this.nodepoolForm?.patchValue({
      name: this.nodePool?.name,
      price: price,
      machineClass: this.nodePool?.machineClass,
      provider: this.cluster?.workspace?.datacenter?.provider,
      replicas: this.nodePool?.replicas,
      autoscaling: {
        enabled: false,
        minReplicas: 1,
        maxReplicas: 3,
      },
      metadata: {
        annotations: this.nodePool?.metadata?.annotations || [],
      },
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

    const labelsArray = this.nodepoolForm.get('metadata')?.get('labels') as FormArray;
    const labels = labelsArray?.value || [];

    for (const label of labels) {
      if (label?.key === keyInput.value) {
        this.messageService?.add({
          severity: 'error',
          summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.error'),
          detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.labelKeyExists'),
        });
        return;
      }
    }

    labelsArray.push(
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

  addTaint(keyInput: HTMLInputElement, valueInput: HTMLInputElement, effectInput: Select): void {
    if (!keyInput?.value) {
      this.messageService?.add({
        severity: 'error',
        summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.error'),
        detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.taintKeyError'),
      });
      return;
    }

    if (!valueInput?.value) {
      this.messageService?.add({
        severity: 'error',
        summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.error'),
        detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.taintValueError'),
      });
      return;
    }

    if (!effectInput?.value) {
      this.messageService?.add({
        severity: 'error',
        summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.error'),
        detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.taintEffectError'),
      });
      return;
    }

    const taintArray = this.nodepoolForm?.get('taint') as FormArray;
    const taints = taintArray?.value || [];

    for (const taint of taints) {
      if (taint?.key === keyInput.value) {
        this.messageService?.add({
          severity: 'error',
          summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.error'),
          detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.taintKeyExists'),
        });
        return;
      }
    }

    taintArray.push(
      this.formbuilder.group({
        key: [keyInput?.value, [Validators.required, Validators.pattern(this.labelPattern)]],
        value: [valueInput?.value, [Validators.required, Validators.pattern(this.labelValuePattern)]],
        effect: [effectInput?.value?.value, [Validators.required]],
      }),
    );

    keyInput.value = '';
    valueInput.value = '';
    effectInput.value = undefined;

    keyInput.focus();
    this.changeDetector.detectChanges();
  }

  removeLabel(label: FormControl): void {
    const labelsArray = this.nodepoolForm.get('metadata')?.get('labels') as FormArray;
    labelsArray?.removeAt(labelsArray?.controls?.indexOf(label));
  }

  removeTaint(taint: FormControl): void {
    const taintArray = this.nodepoolForm?.get('taint') as FormArray;
    taintArray?.removeAt(taintArray?.controls?.indexOf(taint));
  }

  getShortName(): string {
    const shortName: string = uniqueNamesGenerator(this.customConfig);
    return shortName;
  }

  proposeNewName(): void {
    this.nodepoolForm?.get('name')?.setValue(this.getRandomName());
  }

  resetName(): void {
    this.nodepoolForm?.get('name')?.setValue(this.nodePool?.name);
  }

  onPriceChange(price: Price): void {
    this.selectedPrice = price;
    this.nodepoolForm?.get('price')?.setValue(this.selectedPrice);
    this.nodepoolForm?.get('machineClass')?.setValue(this.selectedPrice?.machineClass);
    this.changeDetector.detectChanges();
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
    const minNodes = this.nodepoolForm?.get('autoscaling')?.get('minNodes')?.value;
    const maxNodes = this.nodepoolForm?.get('autoscaling')?.get('maxReplicas')?.value;
    return minNodes;
  }

  minNodesChanged(event: any): void {
    const minNodes = this.nodepoolForm?.get('autoscaling')?.get('minReplicas')?.value;
    const maxNodes = this.nodepoolForm?.get('autoscaling')?.get('maxReplicas')?.value;
    if (minNodes > maxNodes) {
      this.nodepoolForm?.get('autoscaling')?.get('maxReplicas')?.setValue(minNodes);
    }
    this.changeDetector.detectChanges();
  }

  autoscalingChanged(event: any): void {
    if (event?.checked) {
      const minNodes = this.nodepoolForm?.get('autoscaling')?.get('minReplicas')?.value;
      const maxNodes = this.nodepoolForm?.get('autoscaling')?.get('maxReplicas')?.value;
      if (maxNodes !== 0) {
        let mxNodes = minNodes + 1;
        if (mxNodes > this.maxNodes) {
          mxNodes = this.maxNodes;
        }
        this.nodepoolForm?.get('autoscaling')?.get('maxReplicas')?.setValue(mxNodes);
      } else {
        this.nodepoolForm?.get('autoscaling')?.get('maxReplicas')?.setValue(this.maxNodes);
      }
    }
    this.changeDetector.detectChanges();
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
}
