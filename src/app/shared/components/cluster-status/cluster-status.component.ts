import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cluster-status',
  templateUrl: './cluster-status.component.html',
  styleUrls: ['./cluster-status.component.scss'],
  imports: [TranslateModule, CommonModule],
})
export class ClusterStatusComponent {
  @Input() status: number = 0;
}
