import { Resource, ResourceQuery } from '@rork8s/ror-resources/models';
import { Component, inject, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ResourcesV2QueryService } from '../../../resourcesv2/services/resources-v2-query.service';
import { ResourcesV2ListComponent } from '../../../resourcesv2/components/resources-v2-list/resources-v2-list.component';
import { SidebarModule } from 'primeng/sidebar';
import { ResourceV2DetailsComponent } from '../../../resourcesv2/components/resource-v2-details/resource-v2-details.component';

@Component({
  selector: 'app-virtualmachine-backup',
  standalone: true,
  imports: [TranslateModule, ResourcesV2ListComponent, SidebarModule, ResourceV2DetailsComponent],
  templateUrl: './virtualmachine-backup.component.html',
  styleUrl: './virtualmachine-backup.component.scss',
})
export class VirtualmachineBackupComponent implements OnInit {
  @Input() virtualmachine: Resource | undefined;

  sidebarVisible = false;
  selectedResource: Resource | undefined;

  private ingressResourceQuery: ResourceQuery = {
    versionkind: {
      Version: 'backupjob.ror.internal/v1alpha1',
      Kind: 'BackupJob',
      Group: '',
    },
  };

  private resourcesV2QueryService = inject(ResourcesV2QueryService);

  ngOnInit() {
    this.resourcesV2QueryService.setQuery(this.ingressResourceQuery);
  }

  showSelectedResource(resource: any) {
    if (!resource) {
      return;
    }

    this.selectedResource = resource;
    this.sidebarVisible = true;
  }
}
