import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DecimalPipe } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { Resource } from '@rork8s/ror-resources/models';

@Component({
  selector: 'app-virtualmachine-disks',
  standalone: true,
  imports: [TranslateModule, DecimalPipe, SharedModule, ProgressBarModule],
  templateUrl: './virtualmachine-disks.component.html',
  styleUrl: './virtualmachine-disks.component.scss',
})
export class VirtualmachineDisksComponent {
  @Input() virtualmachine: Resource | undefined;

  getDiskUsagePercentage(disk: any): number {
    if (!disk) {
      return -1;
    }
    const percent = (disk.usageBytes / disk?.sizeBytes) * 100;
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

  convertBytesToGigabytes(bytes: number): number {
    return bytes / 1024 / 1024 / 1024;
  }
}
