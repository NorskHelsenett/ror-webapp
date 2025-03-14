import { NodePool } from './../../../core/models/clusterOrder';
import { AsyncPipe, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { ConfigService } from './../../../core/services/config.service';
import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { ClusterNodeListComponent } from '../cluster-node-list/cluster-node-list.component';
import { ClusterNodepoolCreateorupdateComponent } from '../cluster-nodepool-createorupdate/cluster-nodepool-createorupdate.component';
import { MessageService } from 'primeng/api';
import { AclService } from '../../../core/services/acl.service';
import { AclAccess, AclScopes } from '../../../core/models/acl-scopes';
import { catchError, Observable, share, tap } from 'rxjs';

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
    AsyncPipe,
  ],
  templateUrl: './cluster-nodepool-list.component.html',
  styleUrl: './cluster-nodepool-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterNodepoolListComponent implements OnInit, OnDestroy {
  @Input() nodepools: any[] = [];
  @Input() cluster: any;
  showNodepoolEditor: boolean = false;
  rows = 10;
  rowsPerPage: number[] = [10, 20, 50];
  selectedNodepool: any | undefined;
  aclFetchError: any;
  adminOwner$: Observable<boolean> | undefined;

  private configService = inject(ConfigService);
  private messageService = inject(MessageService);
  private aclService = inject(AclService);
  private changeDetector = inject(ChangeDetectorRef);

  constructor() {}

  ngOnInit(): void {
    this.rows = this.configService?.config?.rows;
    this.rowsPerPage = this.configService?.config?.rowsPerPage;

    this.adminOwner$ = this.aclService.check(AclScopes.ROR, AclScopes.Global, AclAccess.Owner).pipe(
      share(),
      catchError((error: any) => {
        this.aclFetchError = error;
        this.changeDetector.detectChanges();
        throw error;
      }),
    );
  }

  ngOnDestroy(): void {}

  toggleNodepoolEditor(nodePool?: any): void {
    this.selectedNodepool = nodePool;
    this.showNodepoolEditor = !this.showNodepoolEditor;
    this.changeDetector.detectChanges();
  }

  deleteNodepool(nodePool: any): void {
    console.log('Nodepool deleted', nodePool);
    this.messageService.add({ severity: 'success', summary: 'Nodepool deleted', detail: 'Nodepool deleted successfully' });

    const newlist = this.cluster?.topology?.nodePools.filter((np: any) => np?.name !== nodePool?.name);
    this.cluster.topology.nodePools = newlist;
  }
}
