import { Resourcesv2Service } from './../../../core/services/resourcesv2.service';
import { NodePool } from './../../../core/models/clusterOrder';
import { AsyncPipe, JsonPipe, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { ConfigService } from './../../../core/services/config.service';
import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ClusterNodeListComponent } from '../cluster-node-list/cluster-node-list.component';
import { ClusterNodepoolCreateorupdateComponent } from '../cluster-nodepool-createorupdate/cluster-nodepool-createorupdate.component';
import { MessageService } from 'primeng/api';
import { AclService } from '../../../core/services/acl.service';
import { AclAccess, AclScopes } from '../../../core/models/acl-scopes';
import { catchError, finalize, Observable, share, tap } from 'rxjs';
import { FormatBytesPipe } from '../../../shared/pipes';
import { Resource, ResourceQuery, ResourceSet } from '@rork8s/ror-resources/models';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-cluster-nodepool-list',
  imports: [
    TranslateModule,
    TableModule,
    LowerCasePipe,
    TitleCasePipe,
    ButtonModule,
    ClusterNodeListComponent,
    ClusterNodepoolCreateorupdateComponent,
    AsyncPipe,
    FormatBytesPipe,
    SpinnerComponent,
    JsonPipe,
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

  clusterResource: Resource | undefined;
  clusterResourceSet$: Observable<ResourceSet> | undefined;
  clusterResourceSetFetchError: any;
  isLoading = true; // Start with loading state active

  private configService = inject(ConfigService);
  private messageService = inject(MessageService);
  private aclService = inject(AclService);
  private changeDetector = inject(ChangeDetectorRef);
  private resourcesv2Service = inject(Resourcesv2Service);

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

    this.fetchKubernetesClusterResource();
  }

  ngOnDestroy(): void {}

  toggleNodepoolEditor(nodePool?: any): void {
    this.selectedNodepool = nodePool;
    this.showNodepoolEditor = !this.showNodepoolEditor;
    this.changeDetector.detectChanges();
  }

  deleteNodepool(nodePool: any): void {
    this.messageService.add({ severity: 'success', summary: 'Nodepool deleted', detail: 'Nodepool deleted successfully' });

    const newlist = this.cluster?.topology?.nodePools.filter((np: any) => np?.name !== nodePool?.name);
    this.cluster.topology.nodePools = newlist;
  }

  fetchKubernetesClusterResource(): void {
    this.isLoading = true;
    this.clusterResourceSetFetchError = null;
    this.clusterResource = undefined;
    this.changeDetector.detectChanges(); // Force update to show loading state
    console.log('Datacenter name:', this.cluster?.workspace?.datacenter?.name);
    console.log('Cluster name:', this.cluster?.clusterName);
    const query: ResourceQuery = {
      versionkind: {
        Group: '',
        Kind: 'KubernetesCluster',
        Version: 'general.ror.internal/v1alpha1',
      },
      filters: [
        {
          field: 'metadata.name',
          type: 'string',
          operator: 'eq',
          value: this.cluster?.clusterName,
        },
        {
          field: 'rormeta.ownerref.subject',
          type: 'string',
          operator: 'eq',
          value: this.cluster?.workspace?.datacenter?.name,
        },
        {
          field: 'rormeta.ownerref.scope',
          type: 'string',
          operator: 'eq',
          value: 'datacenter',
        },
      ],
    };
    console.log('Query:', query);
    this.clusterResourceSet$ = this.resourcesv2Service.getResources(query).pipe(
      tap((data: ResourceSet) => {
        if (data?.resources?.length === 1) {
          this.clusterResource = data?.resources[0];
          return this.clusterResource;
        } else {
          this.clusterResource = undefined;
          return null;
        }
      }),
      catchError((error: any) => {
        this.clusterResourceSetFetchError = error;
        this.isLoading = false;
        this.changeDetector.detectChanges(); // Force update on error
        throw error;
      }),
      finalize(() => {
        this.isLoading = false;
        this.changeDetector.detectChanges();
      }),
    );
  }
}
