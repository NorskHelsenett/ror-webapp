import { ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, Observable, Subscription, tap } from 'rxjs';
import { ClusterNodepoolListComponent } from '../../components/cluster-nodepool-list/cluster-nodepool-list.component';

import { ClusterNodepoolCreateorupdateComponent } from '../../components/cluster-nodepool-createorupdate/cluster-nodepool-createorupdate.component';
import { SpinnerComponent } from '../../../shared/components';
import { AsyncPipe } from '@angular/common';
import { Resourcesv2Service } from '../../../core/services/resourcesv2.service';
import { MessageService } from 'primeng/api';
import { Resource, ResourceQuery, ResourceSet } from '@rork8s/ror-resources/models';
import { LucideAngularModule, AsteriskIcon } from 'lucide-angular';
import { NodePoolChange } from '../../models/nodepool';
import { ProviderFeaturesService } from '../../../core/services/provider-features.service';

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
  isNodepoolEditable = false;

  clusterResource: Resource | undefined;
  clusterResourceSet$: Observable<ResourceSet> | undefined;
  clusterResourceSet: ResourceSet | undefined;
  clusterResourceSetFetchError: any;
  isLoading = true;
  loadedFromResources = false;

  private changeDetector = inject(ChangeDetectorRef);
  private resourcesv2Service = inject(Resourcesv2Service);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);
  private providerFeaturesService = inject(ProviderFeaturesService);

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
          this.clusterResourceSet = data;
          this.clusterResource = data?.resources[0];
          this.loadedFromResources = true;
          this.isNodepoolEditable = this.providerFeaturesService.isNodePoolEditable(
            this.clusterResource?.kubernetescluster?.spec?.topology?.workers?.nodePools[0]?.provider,
            this.cluster?.versions?.kubernetes || '',
          );
          return this.clusterResource;
        } else {
          this.clusterResource = undefined;
          this.nodepools = undefined;
          this.clusterResourceSet = undefined;
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
    this.clusterResourceSet$?.subscribe((resourceSet: ResourceSet) => {
      if (!resourceSet || !resourceSet.resources || resourceSet.resources.length === 0) {
        this.messageService.add({
          severity: 'error',
          summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.nodepoolDeleteErrorTitle'),
          detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.nodepoolResourceError'),
        });
        return;
      }
      let updatedResourceSet = this.clusterResourceSet;
      let nodepoolList = resourceSet.resources[0]?.kubernetescluster?.spec?.topology?.workers?.nodePools || [];
      const index = this.clusterResourceSet?.resources[0]?.kubernetescluster?.spec?.topology?.workers?.nodePools.findIndex(
        (np) => np.name === nodePool?.name,
      );

      nodepoolList.splice(index, 1);
      updatedResourceSet.resources[0].kubernetescluster.spec.topology.workers.nodePools = nodepoolList;
      this.subscriptions.add(
        this.resourcesv2Service
          .updateResourceSet(this.clusterResource?.metadata?.uid, updatedResourceSet)
          .pipe(
            tap(() => {
              this.messageService.add({
                severity: 'success',
                summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.nodepoolDeletedTitle'),
                detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.nodepoolDeleted'),
              });
              this.fetchKubernetesClusterResource();
            }),
            catchError((error: any) => {
              this.messageService.add({
                severity: 'error',
                summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.nodepoolDeletedErrorTitle'),
                detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.nodepoolDeletedError'),
              });
              this.changeDetector.detectChanges();
              this.fetchKubernetesClusterResource();
              throw error;
            }),
          )
          .subscribe(),
      );
    });
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

  createOrUpdateNodepool(nodePoolChange: NodePoolChange): void {
    this.subscriptions.add(
      this.clusterResourceSet$?.subscribe((resourceSet: ResourceSet) => {
        if (!resourceSet || !resourceSet.resources || resourceSet.resources.length === 0) {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.nodepoolDeleteErrorTitle'),
            detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.nodepoolResourceError'),
          });
          return;
        }

        let updatedResourceSet = this.clusterResourceSet;
        let nodepoolList = resourceSet.resources[0]?.kubernetescluster?.spec?.topology?.workers?.nodePools || [];
        const index = this.clusterResourceSet?.resources[0]?.kubernetescluster?.spec?.topology?.workers?.nodePools.findIndex(
          (np) => np.name === nodePoolChange?.previousNodePool?.name,
        );
        if (index !== -1) {
          nodepoolList[index] = nodePoolChange.nodePool;
          updatedResourceSet.resources[0].kubernetescluster.spec.topology.workers.nodePools = nodepoolList;
          this.subscriptions.add(
            this.resourcesv2Service
              .updateResourceSet(this.clusterResource?.metadata?.uid, updatedResourceSet)
              .pipe(
                tap(() => {
                  this.messageService.add({
                    severity: 'success',
                    summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.nodepoolUpdatedTitle'),
                    detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.nodepoolUpdated'),
                  });
                  this.fetchKubernetesClusterResource();
                }),
                catchError((error: any) => {
                  this.messageService.add({
                    severity: 'error',
                    summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.nodepoolUpdatedErrorTitle'),
                    detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.nodepoolUpdatedError'),
                  });
                  this.changeDetector.detectChanges();
                  this.fetchKubernetesClusterResource();
                  throw error;
                }),
              )
              .subscribe(),
          );
        } else {
          nodepoolList.push(nodePoolChange?.nodePool);
          updatedResourceSet.resources[0].kubernetescluster.spec.topology.workers.nodePools = nodepoolList;
          this.subscriptions.add(
            this.resourcesv2Service
              .updateResourceSet(this.clusterResource?.metadata?.uid, updatedResourceSet)
              .pipe(
                tap(() => {
                  this.messageService.add({
                    severity: 'success',
                    summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.nodepoolCreatedTitle'),
                    detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.nodepoolCreated'),
                  });
                  this.fetchKubernetesClusterResource();
                }),
                catchError((error: any) => {
                  this.messageService.add({
                    severity: 'error',
                    summary: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.nodepoolCreatedErrorTitle'),
                    detail: this.translateService.instant('pages.clusters.details.nodePools.createorupdate.form.nodepoolCreatedError'),
                  });
                  this.changeDetector.detectChanges();
                  this.fetchKubernetesClusterResource();
                  throw error;
                }),
              )
              .subscribe(),
          );
        }
      }),
    );

    this.showNodepoolEditor = false;
    this.selectedNodepool = undefined;
    this.changeDetector.detectChanges();
  }
}
