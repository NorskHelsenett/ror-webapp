import { MenuModule } from 'primeng/menu';
import { Component, Input } from '@angular/core';
import { ExportService } from '../../../core/services/export.service';
import { MenuItem } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-export-button',
  templateUrl: './export-button.component.html',
  styleUrl: './export-button.component.scss',
  imports: [TranslateModule, MenuModule, ButtonModule],
})
export class ExportComponent {
  @Input({ required: true }) exportObjects: any[];
  @Input({ required: true }) filename: string;
  menuItems: MenuItem[];

  constructor(private exportService: ExportService) {
    this.setupMenu();
  }

  setupMenu(): void {
    this.menuItems = [
      {
        label: 'CSV',
        command: () => {
          this.exportService.exportToCsv(this.exportObjects, this.filename + '.csv');
        },
      },
      {
        label: 'Excel',
        command: () => {
          this.exportService.exportAsExcelFile(this.exportObjects, this.filename);
        },
      },
    ];
  }
}
