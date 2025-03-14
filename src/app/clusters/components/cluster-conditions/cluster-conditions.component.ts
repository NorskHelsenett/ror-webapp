import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cluster-conditions',
  templateUrl: './cluster-conditions.component.html',
  styleUrls: ['./cluster-conditions.component.scss'],
  standalone: false,
})
export class ClusterConditionsComponent {
  @Input() conditions: any[];
}
