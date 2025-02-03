import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DecimalPipe, JsonPipe } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-virtualmachine-disks',
  standalone: true,
  imports: [TranslateModule, DecimalPipe, SharedModule, ProgressBarModule],
  templateUrl: './virtualmachine-disks.component.html',
  styleUrl: './virtualmachine-disks.component.scss',
})
export class VirtualmachineDisksComponent {
  @Input() virtualmachine: any | undefined;

  getDiskUsagePercentage(disk: any): number {
    if (!disk) {
      return -1;
    }
    const percent = (disk.usageBytes / disk?.spec?.sizeBytes) * 100;
    return percent;
  }

  getColorForDiskUsage(disk: any): string {
    const percent = this.getDiskUsagePercentage(disk);
    if (percent < 50) {
      return 'green';
    } else if (percent < 80) {
      return 'orange';
    } else {
      return 'red';
    }
  }
}
