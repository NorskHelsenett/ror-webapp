import { PolicyBarComponent } from './../policy-bar/policy-bar.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Table, TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../../core/services/config.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PolicyResultComponent } from '../policy-result/policy-result.component';

@Component({
  selector: 'app-policy-policy',
  templateUrl: './policy-policy.component.html',
  styleUrls: ['./policy-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, PolicyBarComponent, TableModule, MultiSelectModule, FormsModule, ButtonModule, TagModule, PolicyResultComponent],
})
export class PolicyPolicyComponent implements OnInit {
  private configService = inject(ConfigService);
  @ViewChildren('policyTable')
  tables: QueryList<Table>;

  @Input() set policy(value: any | undefined) {
    if (value?.reports && value?.reports?.length > 0) {
      let count: number = 0;
      value?.reports?.forEach((element: any) => {
        element.key = count;
        count++;
      });
    }
    this._policy = value;
  }

  get policy(): any | undefined {
    return this._policy;
  }

  rowsPerPage = this.configService.config.rowsPerPage;

  resultFilter: any[] = [];
  resultFilterValue: any[];

  private subscriptions = new Subscription();
  private _policy: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.resultFilterValue = [{ name: this.translateService.instant('pages.clusters.details.policyreports.fail'), value: 'fail' }];
    this.setupFilterOptions();
    this.subscriptions.add(
      this.translateService.onLangChange.subscribe(() => {
        this.setupFilterOptions();
        this.changeDetector.detectChanges();
      }),
    );
    this.triggerFilter();
    this.changeDetector.detectChanges();
  }

  triggerFilter(event?: any): void {
    if (!this.tables && this.tables?.length === 0) {
      return;
    }

    let filterValues: string[] = [];
    this.resultFilterValue.forEach((element: any) => {
      if (element?.value) {
        filterValues.push(element.value);
      }
    });

    this.tables?.forEach((table: Table) => {
      if (filterValues.length === 0) {
        table.reset();
      } else {
        table.filter(filterValues, 'result', 'in');
      }
    });
  }

  private setupFilterOptions(): void {
    this.resultFilter = [
      { name: this.translateService.instant('pages.clusters.details.policyreports.fail'), value: 'fail' },
      { name: this.translateService.instant('pages.clusters.details.policyreports.pass'), value: 'pass' },
      { name: this.translateService.instant('pages.clusters.details.policyreports.error'), value: 'error' },
      { name: this.translateService.instant('pages.clusters.details.policyreports.warn'), value: 'warn' },
      { name: this.translateService.instant('pages.clusters.details.policyreports.skip'), value: 'skip' },
    ];
    let filterValue = [];
    this.resultFilterValue.forEach((element) => {
      filterValue.push({ ...element, name: this.translateService.instant(`pages.clusters.details.policyreports.${element.value}`) });
    });
    this.resultFilterValue = filterValue;
    this.changeDetector.detectChanges();
  }
}
