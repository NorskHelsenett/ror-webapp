import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ClusterService } from '../../services';
import { PriceService } from '../../../core/services/price.service';
import { Subscription } from 'rxjs';
import { Price } from '../../../core/models/price';
import { ClusterNodepoolListComponent } from '../../components/cluster-nodepool-list/cluster-nodepool-list.component';

@Component({
  selector: 'app-cluster-nodepools',
  imports: [TranslateModule, ClusterNodepoolListComponent],
  templateUrl: './cluster-nodepools.component.html',
  styleUrl: './cluster-nodepools.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterNodepoolsComponent implements OnInit, OnDestroy {
  @Input() cluster: any;
  prices: Price[];

  private clusterService = inject(ClusterService);
  private priceService = inject(PriceService);
  private changeDetector = inject(ChangeDetectorRef);

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.priceService.getAll().subscribe((prices: Price[]) => {
        this.prices = prices;
        this.changeDetector.detectChanges();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getCluster(): any {
    return this.clusterService.getCluster();
  }
}
