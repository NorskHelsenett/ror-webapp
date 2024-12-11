import { Component, inject, OnInit } from '@angular/core';
import { ResourcesV2QueryService } from '../../../resourcesv2/services/resources-v2-query.service';
import { ResourcesV2ListComponent } from '../../../resourcesv2/components/resources-v2-list/resources-v2-list.component';
import { ResourceQuery } from '@rork8s/ror-resources/models';

@Component({
  selector: 'app-virtualmachines-list',
  standalone: true,
  imports: [ResourcesV2ListComponent],
  templateUrl: './virtualmachines-list.component.html',
  styleUrl: './virtualmachines-list.component.scss',
})
export class VirtualmachinesListComponent implements OnInit {
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
    if (!resource) {
      return;
    }

    //this.router.navigate(['ingress', resource?.metadata?.name], { relativeTo: this.route });
  }
}
