import { ClusterDescriptionComponent } from './../../components/cluster-description/cluster-description.component';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';
import { MetricsService } from '../../../core/services/metrics.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterContentInit,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  ViewChild,
  effect,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, Subscription, tap, catchError, share, finalize } from 'rxjs';
import { AclScopes, AclAccess } from '../../../core/models/acl-scopes';
import { AclService } from '../../../core/services/acl.service';
import { ClustersService } from '../../../core/services/clusters.service';
import { ResourceType } from '../../../core/models/resources/resourceType';
import { ResourceQuery } from '@rork8s/ror-resources/models';
import { ClusterService } from '../../services';
import { TranslateModule } from '@ngx-translate/core';

import {
  ClusterACLComponent,
  ClusterComplianceReportComponent,
  ClusterConditionsComponent,
  ClusterDeleteComponent,
  ClusterIngressListComponent,
  ClusterMetadataComponent,
  ClusterMetricsComponent,
  ClusterNotificationsComponent,
  ClusterPolicyReportComponent,
  ClusterRawComponent,
  ClusterToolsComponent,
  ClusterVulnerabilityReportComponent,
} from '../../components';
import { ClusterNodepoolsComponent } from '../cluster-nodepools/cluster-nodepools.component';
import { BadgeModule } from 'primeng/badge';
import { ClusterMetadataPageComponent } from '../cluster-metadata-page/cluster-metadata-page.component';
import { ClusterResourceTableComponent } from '../../components/cluster-resource-table/cluster-resource-table.component';
import { SidebarModule } from 'primeng/sidebar';
import { ResourceV2DetailsComponent } from '../../../resourcesv2/components/resource-v2-details/resource-v2-details.component';
import { SpinnerComponent } from '../../../shared/components';
import { Tabs, TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-cluster-details',
  templateUrl: './cluster-details.component.html',
  styleUrls: ['./cluster-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateModule,
    CommonModule,
    RouterModule,
    ClusterConditionsComponent,
    TabsModule,
    ClusterMetricsComponent,
    ClusterDescriptionComponent,
    ClusterACLComponent,
    ClusterMetadataComponent,
    ClusterToolsComponent,
    ClusterIngressListComponent,
    ClusterNodepoolsComponent,
    ClusterPolicyReportComponent,
    ClusterVulnerabilityReportComponent,
    ClusterComplianceReportComponent,
    ClusterRawComponent,
    BadgeModule,
    ClusterMetadataPageComponent,
    ClusterResourceTableComponent,
    ClusterNotificationsComponent,
    ClusterDeleteComponent,
    SpinnerComponent,
    SidebarModule,
    ResourceV2DetailsComponent,
  ],
  providers: [ClusterService],
})
export class ClusterDetailsComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {
  clusterId: string | undefined;

  cluster$: Observable<any> | undefined;
  clusterError: any;

  metrics$: Observable<any> | undefined;
  metricsError: any;
  userClaims: any;

  editInvalidCount: string;

  activeTabIndex: string | number = 0;

  selectedTabIndex: number = 0;
  adminOwner$: Observable<boolean> | undefined;
  aclFetchError: any;

  resourceTypes: ResourceType[];
  selectedResource: any | undefined;
  sidebarVisible = false;

  @ViewChild('tabs') tabsComponent: Tabs | undefined;

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
    @Inject(PLATFORM_ID) private platformId: object,
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

    effect(() => {
      this.tabsComponent?.value?.subscribe((value) => {
        this.activeTabIndex = value;
        this.switchTab();
        this.changeDetector.detectChanges();
      });
    });
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

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.activeTabIndex = 0;
      this.route.queryParams.subscribe((params) => {
        const tab = params['tab'];
        if (params['tab']) {
          this.tabs.forEach((value: any, index: number) => {
            if (tab == value?.metadata) {
              this.activeTabIndex = index;
              this.switchTab();
            }
          });
        }
      });
    }
    this.changeDetector.detectChanges();
  }

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

  switchTab(): void {
    try {
      const tab = this.tabs[this.activeTabIndex];
      this.location.replaceState(`cluster/${this.clusterId}`, tab?.query);

      // Explicitly trigger change detection when a tab is activated
      // This ensures the components in the selected tab are initialized
      setTimeout(() => {
        this.changeDetector.detectChanges();
      }, 0);
    } catch {
      //ignoring
    }
  }

  setTab(index: number): void {
    if (isPlatformBrowser(this.platformId)) {
      this.activeTabIndex = index;
      this.switchTab();
      // Use setTimeout to ensure the components in the tab are initialized after the tab change
      setTimeout(() => {
        this.changeDetector.detectChanges();
      }, 0);
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
