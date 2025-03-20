import { Subscription } from 'rxjs';
import { PriceService } from '../../../core/services/price.service';
import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { Price } from '../../../core/models/price';
import { ConfigService } from '../../../core/services/config.service';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { CommonModule, LowerCasePipe } from '@angular/common';
import { FormatBytesPipe } from '../../../shared/pipes';

@Component({
  selector: 'app-cluster-node-pools',
  templateUrl: './cluster-node-pools.component.html',
  styleUrls: ['./cluster-node-pools.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, TableModule, LowerCasePipe, CommonModule, FormatBytesPipe],
})
export class ClusterNodePoolsComponent implements OnInit, OnDestroy {
  private configService = inject(ConfigService);
  private changeDetector = inject(ChangeDetectorRef);
  private priceService = inject(PriceService);
  @Input() cluster: any = undefined;

  rows = this.configService.config.rows;
  rowsPerPage = this.configService.config.rowsPerPage;

  private prices: Price[];
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

  findMachineClasses(): void {
    for (let i = 0; i < this.cluster?.topology?.nodePools?.length; i++) {
      let nodePool = this.cluster?.topology?.nodePools[i];
      nodePool['machineClass'] = 'Unknown';
      if (!nodePool) {
        continue;
      }

      if (nodePool?.nodes?.length === 0) {
        continue;
      }

      const node = nodePool?.nodes[0];
      const price = this.prices.find((p: any) => {
        if (
          p?.memoryBytes === node?.metrics?.memory &&
          p?.provider === this.cluster?.workspace?.datacenter?.provider &&
          p?.cpu === node?.metrics?.cpu
        ) {
          return p;
        }
      });

      if (price) {
        nodePool['machineClass'] = price.machineClass;
      }
    }
  }
}
