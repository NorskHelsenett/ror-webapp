import { NodepoolService } from './../../services/nodepool.service';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClusterService } from '../../services';
import { TableModule } from 'primeng/table';
import { PriceService } from '../../../core/services/price.service';
import { Price } from '../../../core/models/price';
import { SharedModule } from '../../../shared/shared.module';
import { JsonPipe, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { ConfigService } from '../../../core/services/config.service';
import { ProviderComponent } from '../../../shared/components/provider/provider.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ClusterNodepoolCreateorupdateSummaryComponent } from '../cluster-nodepool-createorupdate-summary/cluster-nodepool-createorupdate-summary.component';
import { CheckboxModule } from 'primeng/checkbox';

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
  ],
  templateUrl: './cluster-nodepool-createorupdate.component.html',
  styleUrl: './cluster-nodepool-createorupdate.component.scss',
})
export class ClusterNodepoolCreateorupdateComponent implements OnInit, OnDestroy {
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

  nodepoolForm: FormGroup = this.nodepoolService?.nodepoolForm;
  nodepoolFetchError: any;
  selectedPrice: Price | undefined;

  pricesFetchError: any;

  private clusterService = inject(ClusterService);
  private configService = inject(ConfigService);
  private priceService = inject(PriceService);
  private changeDetector = inject(ChangeDetectorRef);
  private formbuilder = inject(FormBuilder);
  private subscriptions = new Subscription();

  constructor(private nodepoolService: NodepoolService) {}

  ngOnInit(): void {
    this.rows = this.configService?.config?.rows;
    this.rowsPerPage = this.configService?.config?.rowsPerPage;
    this.fetchPrices();
    const form = this.formbuilder.group({
      name: ['', [Validators.required]],
      price: [null, [Validators.required]],
      autoScale: [false, [Validators.required]],
      minNodes: [1, [Validators.required]],
      maxNodes: [3, [Validators.required]],
    });

    this.nodepoolService.nodepoolForm = form;
    this.nodepoolForm = form;

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
            const pricesPerProvider = prices.filter((price) => price?.provider === provider);
            this.prices = pricesPerProvider;
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
        .subscribe((prices) => {
          this.nodepoolForm?.get('price')?.setValue(prices[0].id);
          this.changeDetector.detectChanges();
        }),
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

    console.log(this.nodepoolForm?.value);
  }
}
