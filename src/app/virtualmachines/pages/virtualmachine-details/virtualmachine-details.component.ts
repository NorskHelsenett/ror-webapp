import { AsyncPipe, Location, NgIf } from '@angular/common';
import { Resourcesv2Service } from './../../../core/services/resourcesv2.service';
import { ChangeDetectionStrategy, Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Resource } from '@rork8s/ror-resources/models';
import { catchError, finalize, Observable, tap } from 'rxjs';
import { TabViewModule } from 'primeng/tabview';
import { VirtualmachinesRawComponent } from '../../components/virtualmachines-raw/virtualmachines-raw.component';
import { VirtualmachineMetadataComponent } from '../../components/virtualmachine-metadata/virtualmachine-metadata.component';
import { VirtualmachineToolsComponent } from '../../components/virtualmachine-tools/virtualmachine-tools.component';
import { VirtualmachineStatusComponent } from '../../components/virtualmachine-status/virtualmachine-status.component';
import { VirtualmachineNetworkComponent } from '../../components/virtualmachine-network/virtualmachine-network.component';
import { ProviderComponent } from '../../../shared/components/provider/provider.component';
import { VirtualmachineOsComponent } from '../../components/virtualmachine-os/virtualmachine-os.component';
import { VirtualmachineDisksComponent } from '../../components/virtualmachine-disks/virtualmachine-disks.component';
import { VirtualmachineSpecsComponent } from '../../components/virtualmachine-specs/virtualmachine-specs.component';
import { VirtualmachineBackupComponent } from '../../components/virtualmachine-backup/virtualmachine-backup.component';
import { VirtualmachineRemoteControlComponent } from '../../components/virtualmachine-remote-control/virtualmachine-remote-control.component';
import { VirtualmachineMetricsComponent } from '../../components/virtualmachine-metrics/virtualmachine-metrics.component';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-virtualmachine-details',
  standalone: true,
  imports: [
    TranslateModule,
    AsyncPipe,
    TabViewModule,
    NgIf,
    VirtualmachinesRawComponent,
    VirtualmachineMetadataComponent,
    VirtualmachineToolsComponent,
    VirtualmachineDisksComponent,
    VirtualmachineStatusComponent,
    VirtualmachineNetworkComponent,
    VirtualmachineSpecsComponent,
    VirtualmachineOsComponent,
    VirtualmachineBackupComponent,
    VirtualmachineRemoteControlComponent,
    ProviderComponent,
    VirtualmachineMetricsComponent,
  ],
  templateUrl: './virtualmachine-details.component.html',
  styleUrl: './virtualmachine-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualmachineDetailsComponent implements OnInit {
  resourceId: string | undefined;
  resource$: Observable<Resource> | undefined;
  resourceFetchError: any;
  virtualMachine: Resource | undefined;
  userClaims: any;
  activeTabIndex = 0;
  selectedTabIndex: number = 0;
  private tabs: any[] = [
    {
      metadata: '',
      query: '',
    },
  ];

  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private changeDetector = inject(ChangeDetectorRef);
  private resourcesv2Service = inject(Resourcesv2Service);
  private oauthService = inject(OAuthService);

  constructor() {}

  ngOnInit() {
    const tab = this.activeRoute.snapshot.queryParams['tab'];
    this.tabs.forEach((value: any, index: number) => {
      if (tab == value?.metadata) {
        this.selectedTabIndex = index;
      }
    });

    this.activeRoute.params.subscribe((params: any) => {
      this.resourceId = params?.id;
      if (this.resourceId) {
        this.fetchResource();
      }
    });

    this.userClaims = this.oauthService.getIdentityClaims();
  }

  fetchResource() {
    this.resource$ = this.resourcesv2Service.getResourcesById(this.resourceId).pipe(
      tap((resource: Resource) => {
        if (!resource || !resource?.virtualmachine) {
          this.resourceFetchError = 'Resource not found';
        }
        this.virtualMachine = resource;
      }),
      catchError((error: any) => {
        this.resourceFetchError = error;
        throw error;
      }),
      finalize(() => {
        this.changeDetector.detectChanges();
      }),
    );
  }

  switchTab(selectedIndex: number): void {
    try {
      const tab = this.tabs[selectedIndex];
      this.location.replaceState(`virtualmachines/${this.resourceId}`, tab?.query);
    } catch {
      //ignoring
    }
  }
}
