import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import writeExcelFile, { CellObject, Row } from 'write-excel-file/browser';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor(
    private messageService: MessageService,
    private translateService: TranslateService,
  ) {}

  exportToCsv(data: any[], filename: string): void {
    if (!data || !data[0] || !filename || filename === '') {
      this.messageService.add({
        severity: 'error',
        summary: this.translateService.instant('shared.export.errorSummary'),
        detail: this.translateService.instant('shared.export.errorDetail'),
      });
      return;
    }
    const replacer = (key: any, value: any) => (value === null ? '' : value);
    const header = Object.keys(data[0]);
    let csv = data.map((row) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    const blob = new Blob([csvArray], { type: 'text/csv' });
    FileSaver.saveAs(blob, filename);
  }

  exportAsExcelFile(data: any[], filename: string): void {
    if (!data || !data[0] || !filename || filename === '') {
      this.messageService.add({
        severity: 'error',
        summary: this.translateService.instant('shared.export.errorSummary'),
        detail: this.translateService.instant('shared.export.errorDetail'),
      });
      return;
    }

    const headers = Object.keys(data[0]);
    const headerRow: Row = headers.map((header) => ({ value: header, fontWeight: 'bold', type: String }));
    const rows: Row[] = data.map((item) => headers.map((header) => this.toCell(item[header])));

    writeExcelFile([headerRow, ...rows], { sheet: 'Sheet 1' })
      .toFile(`${filename}.xlsx`)
      .catch(() => {
        this.messageService.add({
          severity: 'error',
          summary: this.translateService.instant('shared.export.errorSummary'),
          detail: this.translateService.instant('shared.export.errorDetail'),
        });
      });
  }

  private toCell(value: any): CellObject {
    if (value === null || value === undefined) {
      return { value: '', type: String };
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
      return { value, type: Number };
    }
    if (typeof value === 'boolean') {
      return { value, type: Boolean };
    }
    return { value: String(value), type: String };
  }
}
