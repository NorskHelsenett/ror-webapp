import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormatBytesPipe } from '../../../shared/pipes';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-datacenter-table',
  templateUrl: './datacenter-table.component.html',
  styleUrls: ['./datacenter-table.component.scss'],
  imports: [TranslatePipe, RouterModule, FormatBytesPipe],
})
export class DatacenterTableComponent {
  @Input() datacenters: any[] = [];
}
