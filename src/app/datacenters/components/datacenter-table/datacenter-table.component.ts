import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormatBytesPipe } from '../../../shared/pipes';

@Component({
  selector: 'app-datacenter-table',
  templateUrl: './datacenter-table.component.html',
  styleUrls: ['./datacenter-table.component.scss'],
  imports: [TranslateModule, RouterModule, FormatBytesPipe],
})
export class DatacenterTableComponent {
  @Input() datacenters: any[] = [];
}
