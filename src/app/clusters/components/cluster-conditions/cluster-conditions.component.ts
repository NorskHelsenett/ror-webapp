import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cluster-conditions',
  templateUrl: './cluster-conditions.component.html',
  styleUrls: ['./cluster-conditions.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule],
})
export class ClusterConditionsComponent {
  @Input() conditions: any[];
}
