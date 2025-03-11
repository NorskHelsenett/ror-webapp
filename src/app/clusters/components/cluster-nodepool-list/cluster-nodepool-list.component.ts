import { NodePool } from './../../../core/models/clusterOrder';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { ConfigService } from './../../../core/services/config.service';
import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { ClusterNodeListComponent } from '../cluster-node-list/cluster-node-list.component';
import { ClusterNodepoolCreateorupdateComponent } from '../cluster-nodepool-createorupdate/cluster-nodepool-createorupdate.component';

@Component({
  selector: 'app-cluster-nodepool-list',
  standalone: true,
  imports: [
    TranslateModule,
    TableModule,
    LowerCasePipe,
    SharedModule,
    TitleCasePipe,
    ButtonModule,
    ClusterNodeListComponent,
    ClusterNodepoolCreateorupdateComponent,
  ],
  templateUrl: './cluster-nodepool-list.component.html',
  styleUrl: './cluster-nodepool-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterNodepoolListComponent implements OnInit, OnDestroy {
  @Input() nodepools: any[] = [];
  showNodepoolEditor: boolean = false;
  rows = 10;
  rowsPerPage: number[] = [10, 20, 50];
  selectedNodepool: any | undefined;

  private configService = inject(ConfigService);
  private changeDetector = inject(ChangeDetectorRef);

  constructor() {}

  ngOnInit(): void {
    this.rows = this.configService?.config?.rows;
    this.rowsPerPage = this.configService?.config?.rowsPerPage;
  }

  ngOnDestroy(): void {}

  toggleNodepoolEditor(nodePool?: any): void {
    this.selectedNodepool = nodePool;
    this.showNodepoolEditor = !this.showNodepoolEditor;
    this.changeDetector.detectChanges();
  }
}
