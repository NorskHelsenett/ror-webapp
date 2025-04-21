import { Component, inject, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DecimalPipe, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { Resource } from '@rork8s/ror-resources/models';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ConfigService } from '../../../core/services/config.service';
import { TooltipModule } from 'primeng/tooltip';
import { TrueFalseComponent } from '../../../shared/components';

@Component({
  selector: 'app-virtualmachine-disks',
  standalone: true,
  imports: [TranslateModule, DecimalPipe, ProgressBarModule, TabViewModule, TableModule, TitleCasePipe, LowerCasePipe, TooltipModule, TrueFalseComponent],
  templateUrl: './virtualmachine-disks.component.html',
  styleUrl: './virtualmachine-disks.component.scss',
})
export class VirtualmachineDisksComponent {
  @Input() virtualmachine: Resource | undefined;

  rows: number;
  rowsPerPage: number[];
  loading: boolean;

  private configService = inject(ConfigService);

  constructor() {
    this.rows = this.configService.config.rows;
    this.rowsPerPage = this.configService.config.rowsPerPage;
  }

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

  getFileName(disk: any): string {
    const nameSplit = disk?.name?.split('/');
    return nameSplit ? nameSplit[nameSplit.length - 1] : '';
  }
}
