import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cluster-conditions',
  templateUrl: './cluster-conditions.component.html',
  styleUrls: ['./cluster-conditions.component.scss'],
  standalone: true,
  imports: [TranslatePipe],
})
export class ClusterConditionsComponent {
  @Input() conditions: any[];
}
