import { ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { catchError, finalize, Observable, Subscription, tap } from 'rxjs';
import { ClusterNodepoolListComponent } from '../../components/cluster-nodepool-list/cluster-nodepool-list.component';

import { ClusterNodepoolCreateorupdateComponent } from '../../components/cluster-nodepool-createorupdate/cluster-nodepool-createorupdate.component';
import { SpinnerComponent } from '../../../shared/components';
import { AsyncPipe } from '@angular/common';
import { Resourcesv2Service } from '../../../core/services/resourcesv2.service';
import { MessageService } from 'primeng/api';
import { Resource, ResourceQuery, ResourceSet } from '@rork8s/ror-resources/models';
import { LucideAngularModule, AsteriskIcon } from 'lucide-angular';

@Component({
  selector: 'app-cluster-nodepools',
  imports: [TranslateModule, ClusterNodepoolListComponent, ClusterNodepoolCreateorupdateComponent, SpinnerComponent, AsyncPipe, LucideAngularModule],
  templateUrl: './cluster-nodepools.component.html',
  styleUrl: './cluster-nodepools.component.scss',
})
export class ClusterNodepoolsComponent implements OnInit, OnDestroy {
  readonly asteriskIcon = AsteriskIcon;
  @Input() cluster: any;
  showNodepoolEditor: boolean = false;
  selectedNodepool: any | undefined;
  nodepools: any[] = [];

  clusterResource: Resource | undefined;
  clusterResourceSet$: Observable<ResourceSet> | undefined;
  clusterResourceSetFetchError: any;
  isLoading = true;
  loadedFromResources = false;

  private changeDetector = inject(ChangeDetectorRef);
  private resourcesv2Service = inject(Resourcesv2Service);
  private messageService = inject(MessageService);

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.fetchKubernetesClusterResource();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleNodepoolEditor(nodePool?: any): void {
    this.selectedNodepool = nodePool;
    this.showNodepoolEditor = !this.showNodepoolEditor;
    this.changeDetector.detectChanges();
  }

  fetchKubernetesClusterResource(): void {
    this.isLoading = true;
    this.clusterResourceSetFetchError = null;
    this.clusterResource = undefined;
    this.loadedFromResources = false;
    this.changeDetector.detectChanges();

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
    this.clusterResourceSet$ = this.resourcesv2Service.getResources(query).pipe(
      tap((data: ResourceSet) => {
        if (data?.resources?.length === 1) {
          this.clusterResource = data?.resources[0];
          this.loadedFromResources = true;
          return this.clusterResource;
        } else {
          this.clusterResource = undefined;
          this.nodepools = undefined;
          return null;
        }
      }),
      catchError((error: any) => {
        this.clusterResourceSetFetchError = error;
        this.isLoading = false;
        this.changeDetector.detectChanges();
        throw error;
      }),
      finalize(() => {
        this.setNodepools(this.clusterResource);
        this.isLoading = false;
        this.changeDetector.detectChanges();
      }),
    );
  }

  editNodepool(nodePool?: any): void {
    this.selectedNodepool = nodePool;
    this.showNodepoolEditor = true;
    this.changeDetector.detectChanges();
  }

  deleteNodepool(nodePool: any): void {
    console.log('delete nodepool', nodePool);
    this.messageService.add({ severity: 'success', summary: 'Nodepool deleted', detail: 'Nodepool deleted successfully' }); // translate

    // const newlist = this.cluster?.topology?.nodePools.filter((np: any) => np?.name !== nodePool?.name);
    // this.cluster.topology.nodePools = newlist;
    // implement
  }

  setNodepools(clusterResource: Resource): void {
    this.nodepools = clusterResource?.kubernetescluster?.spec?.topology?.workers?.nodePools || [];
    if (!this.nodepools) {
      this.nodepools = [];
    }

    for (const nodepool of this.nodepools) {
      const metrics = this.cluster?.topology?.nodePools?.find((np: any) => np?.name === nodepool?.name)?.metrics;
      if (metrics) {
        nodepool.metrics = metrics;
      }
    }

    if (this.nodepools.length === 0) {
      for (const clusterPool of this.cluster?.topology?.nodePools) {
        this.nodepools.push({
          machineClass: clusterPool?.machineClass,
          provider: clusterPool?.workspace?.datacenter?.provider,
          name: clusterPool?.name,
          replicas: clusterPool?.metrics?.nodeCount,
          autoscaling: {
            enabled: false,
            minReplicas: 0,
            maxReplicas: 0,
            scalingRules: null,
          },
          metadata: {
            labels: null,
            annotations: null,
          },
          taints: null,
          metrics: clusterPool?.metrics,
        });
      }
    }

    this.changeDetector.detectChanges();
  }
}
