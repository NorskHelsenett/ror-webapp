import { DatacenterService } from '../../../core/services/datacenter.service';
import { catchError, finalize, Observable, share } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, inject } from '@angular/core';
import { AclScopes, AclAccess } from '../../../core/models/acl-scopes';
import { AclService } from '../../../core/services/acl.service';
import { ConfigService } from '../../../core/services/config.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { SpinnerComponent } from '../../../shared/components';
import { TimePipe } from '../../../shared/pipes/time.pipe';

@Component({
  selector: 'app-admin-datacenters',
  templateUrl: './admin-datacenters.component.html',
  styleUrls: ['./admin-datacenters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, CommonModule, RouterModule, TableModule],
})
export class AdminDatacentersComponent implements OnInit {
  private configService = inject(ConfigService);

  datacenters$: Observable<any>;
  datacentersError: any;
  adminRead$: Observable<boolean> | undefined;
  adminReadFetchError: any;

  rows = this.configService.config.rows;
  rowsPerPage = this.configService.config.rowsPerPage;
  loading: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private datacentersService: DatacenterService,
    private aclService: AclService,
  ) {}

  ngOnInit(): void {
    this.fetch();
    this.adminReadFetchError = undefined;
    this.adminRead$ = this.aclService.check(AclScopes.ROR, AclScopes.Global, AclAccess.Read).pipe(
      share(),
      catchError((error: any) => {
        this.adminReadFetchError = error;
        this.changeDetector.detectChanges();
        throw error;
      }),
    );
  }

  fetch(): void {
    this.loading = true;
    this.datacentersError = undefined;
    this.datacenters$ = this.datacentersService.get().pipe(
      share(),
      catchError((error) => {
        this.datacentersError = error;
        return error;
      }),
      finalize(() => {
        this.loading = false;
        this.changeDetector.detectChanges();
      }),
    );
  }
}
