import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormatBytesPipe } from '../../../shared/pipes';

@Component({
  selector: 'app-cluster-metrics',
  templateUrl: './cluster-metrics.component.html',
  styleUrls: ['./cluster-metrics.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule, FormatBytesPipe],
})
export class ClusterMetricsComponent implements OnInit {
  @Input() metrics: any = undefined;

  constructor() {}

  ngOnInit(): void {
    return;
  }
}
