import { TranslateModule } from '@ngx-translate/core';
import { ClusterFormService } from '../../services/cluster-form.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  imports: [TranslateModule, CommonModule, RouterModule, TagModule],
})
export class SummaryComponent {
  @Input() value: any;
  @Input() relativeTo: string = '.';

  constructor(private clusterFormService: ClusterFormService) {}

  getNodePoolSum(): number {
    return this.clusterFormService.getNodePoolSum();
  }
}
