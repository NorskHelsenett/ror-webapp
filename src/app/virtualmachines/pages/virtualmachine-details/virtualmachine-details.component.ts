import { AsyncPipe, Location } from '@angular/common';
import { Resourcesv2Service } from './../../../core/services/resourcesv2.service';
import { ChangeDetectionStrategy, Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ResourceSet } from '@rork8s/ror-resources/models';
import { catchError, finalize, Observable } from 'rxjs';
import { TabViewModule } from 'primeng/tabview';
import { VirtualmachinesRawComponent } from '../../components/virtualmachines-raw/virtualmachines-raw.component';

@Component({
  selector: 'app-virtualmachine-details',
  standalone: true,
  imports: [TranslateModule, AsyncPipe, TabViewModule, VirtualmachinesRawComponent],
  templateUrl: './virtualmachine-details.component.html',
  styleUrl: './virtualmachine-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualmachineDetailsComponent implements OnInit {
  resourceId: string | undefined;
  resource$: Observable<ResourceSet> | undefined;
  resourceFetchError: any;

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
  }

  fetchResource() {
    this.resource$ = this.resourcesv2Service.getResourcesById(this.resourceId).pipe(
      catchError((error: any) => {
        this.resourceFetchError = error;
        throw error;
      }),
      finalize(() => {
        // Do something
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
