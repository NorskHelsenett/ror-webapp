import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { Observable, catchError, finalize, share, tap } from 'rxjs';
import { FilterService } from '../../../core/services/filter.service';
import { Filter } from '../../../core/models/apiFilter';
import { AuditLog } from '../../../core/models/auditlog';
import { PaginationResult } from '../../../core/models/paginatedResult';
import { AuditlogService } from '../../../core/services/auditlog.service';
import { ConfigService } from '../../../core/services/config.service';
import { TableModule } from 'primeng/table';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TimePipe } from '../../../shared/pipes/time.pipe';
import { SharedModule } from '../../../shared/shared.module';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'app-admin-auditlogs',
  templateUrl: './admin-auditlogs.component.html',
  styleUrls: ['./admin-auditlogs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableModule, AsyncPipe, TranslateModule, MultiSelectModule, CommonModule, FormsModule, ButtonModule, SharedModule, FieldsetModule],
  standalone: true,
})
export class AdminAuditlogsComponent implements OnInit {
  private configService = inject(ConfigService);
  auditlogs$: Observable<PaginationResult<AuditLog>> | undefined;
  auditlogsError: any;
  metadata$: Observable<Map<string, string[]>>;

  rowsPerPage = this.configService.config.rowsPerPage;
  totalRecords: number = 0;
  maxRecordedTotal: number = 0;

  loading: boolean;
  lastLazyLoad: any;

  filter: Filter;
  lastFilter: Filter;

  constructor(
    private auditLogsService: AuditlogService,
    private filterService: FilterService,
    private changeDetector: ChangeDetectorRef,
    private primengConfig: PrimeNG,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.primengConfig.ripple.set(true);
  }

  fetchAuditlogs(event: any): void {
    if (event) {
      this.filter = this.filterService.mapFilter(event);
    }
    this.loading = true;
    this.lastFilter = this.filter;
    this.auditlogsError = undefined;
    this.auditlogs$ = this.auditLogsService.getByFilter(this.filter).pipe(
      share(),
      catchError((error: any) => {
        this.auditlogsError = error;
        throw error;
      }),
      finalize(() => {
        this.loading = false;
        this.changeDetector.detectChanges();
      }),
    );
  }

  fetchMetadata(): void {
    this.metadata$ = this.auditLogsService.getMetadata().pipe(
      tap(() => {
        this.changeDetector.detectChanges();
      }),
    );
  }
}
