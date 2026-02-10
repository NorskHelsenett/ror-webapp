import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ClusterService } from '../../services';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ClusterDetailsEditComponent } from '../cluster-details-edit/cluster-details-edit.component';

@Component({
  selector: 'app-cluster-metadata-page',
  templateUrl: './cluster-metadata-page.component.html',
  styleUrl: './cluster-metadata-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, SharedModule, RouterModule, TagModule, ClusterDetailsEditComponent],
  providers: [ClusterService],
})
export class ClusterMetadataPageComponent implements OnInit {
  private clusterService = inject(ClusterService);

  @Input() cluster: any;
  @Input() startInEdit = false;
  @Output() refreshRequested = new EventEmitter<void>();
  edit = false;

  tags: string[] = [];

  ngOnInit(): void {
    this.edit = this.startInEdit;
    this.tags = this.clusterService.fillTags(this.cluster.metadata?.serviceTags || this.cluster.metadata?.project?.projectMetadata?.serviceTags);
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  onUpdateOk(event: boolean): void {
    this.toggleEdit();
    this.refreshRequested.emit();
  }

  getRoleTranslationKey(roleDefinition: string): string {
    // to lowercase to handle any case variations and ensure matching
    const value = roleDefinition.toLowerCase();
    switch (value) {
      case 'owner':
        return 'owner';
      case 'responsible':
        return 'responsible';
      case 'technicalcontact':
        return 'technicalContact';
      default:
        return 'unknown';
    }
  }
}
