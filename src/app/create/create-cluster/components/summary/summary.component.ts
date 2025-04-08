import { TranslateModule } from '@ngx-translate/core';
import { ClusterFormService } from '../../services/cluster-form.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  imports: [TranslateModule, CommonModule, TagModule],
})
export class SummaryComponent {
  @Input() value: any;
  @Input() relativeTo: string = '.';
  @Output() gotoStep = new EventEmitter<number | string>();

  constructor(private clusterFormService: ClusterFormService) {}

  getNodePoolSum(): number {
    return this.clusterFormService.getNodePoolSum();
  }

  linkToStep(step: number | string): void {
    this.gotoStep.emit(step);
  }
}
