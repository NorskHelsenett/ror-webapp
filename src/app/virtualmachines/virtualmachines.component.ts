import { CommonModule, JsonPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnDestroy, OnInit, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ResourcesV2QueryService } from '../resourcesv2/services/resources-v2-query.service';
import { ResourceQuery } from '@rork8s/ror-resources/models';
import { SharedModule } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { ResourceV2DetailsComponent } from '../resourcesv2/components/resource-v2-details/resource-v2-details.component';
import { ResourcesV2ListComponent } from '../resourcesv2/components/resources-v2-list/resources-v2-list.component';

@Component({
  selector: 'app-virtualmachines',
  standalone: true,
  imports: [CommonModule, TranslateModule, ResourcesV2ListComponent, SidebarModule, ResourceV2DetailsComponent, JsonPipe, SharedModule],
  templateUrl: './virtualmachines.component.html',
  styleUrl: './virtualmachines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualmachinesComponent implements OnInit, OnDestroy {
  aclFetchError: any;
  showExportChoises: boolean;
  sidebarVisible = false;
  selectedResource: any;

  private resourcesV2QueryService = inject(ResourcesV2QueryService);
  private virtualMachineResourceQuery: ResourceQuery = {
    versionkind: {
      Version: 'general.ror.internal/v1alpha1',
      Kind: 'VirtualMachine',
      Group: '',
    },
  };

  constructor() {}

  ngOnInit() {
    this.resourcesV2QueryService.setQuery(this.virtualMachineResourceQuery);
  }

  ngOnDestroy(): void {
    return;
  }

  showSelectedResource(resource: any) {
    this.selectedResource = resource;
    this.sidebarVisible = true;
  }
}
