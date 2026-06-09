import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cluster-status',
  templateUrl: './cluster-status.component.html',
  styleUrls: ['./cluster-status.component.scss'],
})
export class ClusterStatusComponent {
  @Input() status: number = 0;
}
