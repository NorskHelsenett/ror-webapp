import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ClusterService } from '../../services';
import { CommonModule } from '@angular/common';
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
  imports: [TranslateModule, CommonModule, SharedModule, RouterModule, TagModule, ClusterDetailsEditComponent],
  providers: [ClusterService],
})
export class ClusterMetadataPageComponent implements OnInit {
  private clusterService = inject(ClusterService);
  private changeDetector = inject(ChangeDetectorRef);

  @Input() cluster: any;
  @Output() refreshRequested = new EventEmitter<void>();
  edit = false;

  tags: string[] = [];

  ngOnInit(): void {
    this.tags = this.clusterService.fillTags(this.cluster.metadata?.serviceTags || this.cluster.metadata?.project?.projectMetadata?.serviceTags);
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  onUpdateOk(event: boolean): void {
    if (event) {
      this.toggleEdit();
      this.refreshRequested.emit();
    }
  }
}
