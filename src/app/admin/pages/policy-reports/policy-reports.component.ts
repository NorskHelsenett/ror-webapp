import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable, catchError } from 'rxjs';
import { PolicyReportGlobal, PolicyReportGlobalQueryType } from '../../../core/models/policyReport';
import { PolicyReportsService } from '../../../core/services/policy-reports.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PerPolicyTableComponent } from './per-policy-table/per-policy-table.component';
import { ExportComponent } from '../../../shared/components';

@Component({
  selector: 'app-policy-reports',
  templateUrl: './policy-reports.component.html',
  styleUrls: ['./policy-reports.component.scss'],
  imports: [TranslateModule, CommonModule, RouterModule, TableModule, ButtonModule, PerPolicyTableComponent, ExportComponent],
})
export class PolicyReportsComponent implements OnInit {
  policyReportsPerCluster$: Observable<PolicyReportGlobal[]>;
  error: any;
  cols: any[];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private translateService: TranslateService,
    private messageService: MessageService,
    private policyReportsService: PolicyReportsService,
  ) {}

  ngOnInit(): void {
    this.setupColumns();
    this.getPolicyReportsPerCluster();
  }

  getPolicyReportsPerCluster(): void {
    this.policyReportsPerCluster$ = this.policyReportsService
      .getPolicyReportsGlobal(PolicyReportGlobalQueryType.PolicyReportGlobalQueryTypeCluster, '')
      .pipe(
        catchError((error) => {
          this.error = error;
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('pages.admin.policyreports.error'),
          });
          this.changeDetector.detectChanges();
          throw error;
        }),
      );
  }

  setupColumns(): void {
    this.cols = [
      {
        field: 'cluster',
        header: 'cluster',
      },
      {
        field: 'fail',
        header: 'fail',
      },
      {
        field: 'pass',
        header: 'pass',
      },
    ];
  }

  formatExport(policyReports: PolicyReportGlobal[]): any[] {
    const exportObjects: any[] = [];
    policyReports?.forEach((report) => {
      exportObjects.push({
        cluster: report?.cluster,
        policy: report?.policy,
        failed: report?.fail,
        passed: report?.pass,
      });
    });
    return exportObjects;
  }
}
