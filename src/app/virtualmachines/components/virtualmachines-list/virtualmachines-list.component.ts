import { Component, inject, OnInit } from '@angular/core';
import { ResourcesV2QueryService } from '../../../resourcesv2/services/resources-v2-query.service';
import { ResourcesV2ListComponent } from '../../../resourcesv2/components/resources-v2-list/resources-v2-list.component';
import { ResourceQuery } from '@rork8s/ror-resources/models';
import { SidebarModule } from 'primeng/sidebar';
import { ResourceV2DetailsComponent } from '../../../resourcesv2/components/resource-v2-details/resource-v2-details.component';
import { CommonModule, JsonPipe } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-virtualmachines-list',
  standalone: true,
  imports: [CommonModule, ResourcesV2ListComponent, SidebarModule, ResourceV2DetailsComponent, JsonPipe, SharedModule],
  templateUrl: './virtualmachines-list.component.html',
  styleUrl: './virtualmachines-list.component.scss',
})
export class VirtualmachinesListComponent implements OnInit {
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

  ngOnInit() {
    this.resourcesV2QueryService.setQuery(this.virtualMachineResourceQuery);
  }

  showSelectedResource(resource: any) {
    this.selectedResource = resource;
    this.sidebarVisible = true;
  }
}
