import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnDestroy, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ResourcesV2QueryService } from '../../../resourcesv2/services/resources-v2-query.service';
import { Resource, ResourceQuery } from '@rork8s/ror-resources/models';
import { SharedModule } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { ResourceV2DetailsComponent } from '../../../resourcesv2/components/resource-v2-details/resource-v2-details.component';
import { ResourcesV2ListComponent } from '../../../resourcesv2/components/resources-v2-list/resources-v2-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AclService } from '../../../core/services/acl.service';
import { catchError, Observable, share } from 'rxjs';
import { AclAccess, AclScopes } from '../../../core/models/acl-scopes';

@Component({
  selector: 'app-virtualmachines',
  standalone: true,
  imports: [CommonModule, TranslateModule, ResourcesV2ListComponent, SidebarModule, ResourceV2DetailsComponent, SharedModule, AsyncPipe],
  templateUrl: './virtualmachines.component.html',
  styleUrl: './virtualmachines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualmachinesComponent implements OnInit, OnDestroy {
  private aclService = inject(AclService);
  private changeDetector = inject(ChangeDetectorRef);

  aclFetchError: any;
  showExportChoises: boolean;
  sidebarVisible = false;
  selectedResource: any;

  isAdmin$: Observable<boolean> | undefined;

  private router = inject(Router);
  private route = inject(ActivatedRoute);

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

    this.isAdmin$ = this.aclService.check(AclScopes.ROR, AclScopes.VirtualMachine, AclAccess.Owner).pipe(
      share(),
      catchError((error: any) => {
        this.aclFetchError = error;
        this.changeDetector.detectChanges();
        throw error;
      }),
    );
  }

  ngOnDestroy(): void {
    return;
  }

  showSelectedResource(resource: Resource) {
    this.selectedResource = resource;
    this.router.navigate(['.', resource?.metadata?.uid], { relativeTo: this.route });
  }
}
