import { OAuthService } from 'angular-oauth2-oidc';
import { MetricsService } from '../../../core/services/metrics.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, AfterContentInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, tap, catchError, share, finalize } from 'rxjs';
import { Location } from '@angular/common';
import { AclScopes, AclAccess } from '../../../core/models/acl-scopes';
import { AclService } from '../../../core/services/acl.service';
import { ClustersService } from '../../../core/services/clusters.service';
import { ResourceType } from '../../../core/models/resources/resourceType';
import { ResourceQuery } from '@rork8s/ror-resources/models';
import { ClusterService } from '../../services';

@Component({
  selector: 'app-cluster-details',
  templateUrl: './cluster-details.component.html',
  styleUrls: ['./cluster-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterDetailsComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {
  clusterId: string | undefined;

  cluster$: Observable<any> | undefined;
  clusterError: any;

  metrics$: Observable<any> | undefined;
  metricsError: any;
  userClaims: any;

  editInvalidCount: string;

  activeTabIndex = 0;

  selectedTabIndex: number = 0;
  adminOwner$: Observable<boolean> | undefined;
  aclFetchError: any;

  resourceTypes: ResourceType[];
  selectedResource: any | undefined;
  sidebarVisible = false;

  private subscriptions = new Subscription();
  private tabs: any[] = [
    {
      metadata: '',
      query: '',
    },
    {
      metadata: 'ingresses',
      query: 'tab=ingresses',
    },
    {
      metadata: 'nodepools',
      query: 'tab=nodepools',
    },
    {
      metadata: 'policyReports',
      query: 'tab=policyReports',
    },
    {
      metadata: 'vulnerabilityReports',
      query: 'tab=vulnerabilityReports',
    },
    {
      metadata: 'complianceReports',
      query: 'tab=complianceReports',
    },
    {
      metadata: 'raw',
      query: 'tab=raw',
    },
    {
      metadata: 'metadata',
      query: 'tab=metadata',
    },
    {
      metadata: 'resources',
      query: 'tab=resources',
    },
    {
      metadata: 'delete',
      query: 'tab=delete',
    },
    {
      metadata: 'createx',
      query: 'tab=delete',
    },
    // {
    //   metadata: 'ingress',
    //   query: 'tab=ingress',
    // },
  ];

  ingressResourceQuery: ResourceQuery = {
    // limit: 10,
    // offset: 0,
    versionkind: {
      Version: 'networking.k8s.io/v1',
      Kind: 'Ingress',
      Group: '',
    },
  };

  resourceQuery: ResourceQuery = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private changeDetector: ChangeDetectorRef,
    private clustersService: ClustersService,
    private clusterService: ClusterService,
    private metricsService: MetricsService,
    private oauthService: OAuthService,
    private aclService: AclService,
  ) {
    this.adminOwner$ = this.aclService.check(AclScopes.ROR, AclScopes.Global, AclAccess.Owner).pipe(
      share(),
      tap(() => {
        this.setSelectedTab();
      }),
      catchError((error: any) => {
        this.aclFetchError = error;
        this.changeDetector.detectChanges();
        throw error;
      }),
    );
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params
        .pipe(
          tap((data: any) => {
            this.clusterId = data?.id;
            this.fetch();
          }),
        )
        .subscribe(),
    );
    this.userClaims = this.oauthService.getIdentityClaims();
    this.clusterId = this.route.snapshot.params['id'];
  }

  ngAfterContentInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setSelectedTab(): void {
    const tab = this.route.snapshot.queryParams['tab'];
    for (let index = 0; index < this.tabs.length; index++) {
      const element = this.tabs[index];

      if (tab == element?.metadata) {
        this.selectedTabIndex = index;
        break;
      }
    }
  }

  fetch(): void {
    this.fetchCluster(this.clusterId);
    this.fetchMetrics(this.clusterId);
  }

  fetchCluster(clusterId: string): void {
    this.clusterError = undefined;
    this.cluster$ = this.clustersService.getById(clusterId).pipe(
      share(),
      tap((cluster: any) => {
        this.clusterService.setCluster(cluster);
      }),
      catchError((error) => {
        switch (error?.status) {
          case 401: {
            this.router.navigateByUrl('/error/401');
            break;
          }
          case 403: {
            this.router.navigateByUrl('/error/403');
            break;
          }
          case 404: {
            this.router.navigateByUrl('/error/404');
            break;
          }
        }
        this.clusterError = error;
        return error;
      }),
      finalize(() => {
        this.changeDetector.detectChanges();
      }),
    );
  }

  fetchMetrics(clusterId: string): void {
    this.metricsError = undefined;
    this.metrics$ = this.metricsService.getForClusterId(clusterId).pipe(
      share(),
      tap(() => {
        this.changeDetector.detectChanges();
      }),
      catchError((error) => {
        switch (error?.status) {
          case 401: {
            this.router.navigateByUrl('/error/401');
            break;
          }
          case 404: {
            this.router.navigateByUrl('/error/404');
            break;
          }
        }
        this.metricsError = error;
        return error;
      }),
    );
  }

  editInvalidCountUpdated(invalidCount: number): void {
    this.editInvalidCount = invalidCount?.toString();
    this.changeDetector.detectChanges();
  }

  metadataUpdated(event: any): void {
    if (event) {
      this.activeTabIndex = 0;
      this.fetchCluster(this.clusterId);
    }

    this.changeDetector.detectChanges();
  }

  switchTab(selectedIndex: number): void {
    try {
      const tab = this.tabs[selectedIndex];
      this.location.replaceState(`cluster/${this.clusterId}`, tab?.query);
    } catch {
      //ignoring
    }
  }

  showSelectedResource(resource: any) {
    this.selectedResource = resource;
    if (this.selectedResource?.kind === 'Ingress' && this.selectedResource?.apiVersion === 'networking.k8s.io/v1') {
      this.router.navigate(['ingress', this.selectedResource?.metadata?.name], { relativeTo: this.route });
      this.sidebarVisible = false;
    } else {
      this.sidebarVisible = true;
    }
  }
}
