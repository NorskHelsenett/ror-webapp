import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { catchError, finalize, Observable } from 'rxjs';
import { PriceService } from '../../../core/services/price.service';
import { ConfigService } from '../../../core/services/config.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SpinnerComponent } from '../../../shared/components';
import { TimePipe } from '../../../shared/pipes/time.pipe';

@Component({
  selector: 'app-admin-prices',
  templateUrl: './admin-prices.component.html',
  styleUrls: ['./admin-prices.component.scss'],
  imports: [TranslateModule, CommonModule, RouterModule, TableModule, SpinnerComponent, TimePipe],
})
export class AdminPricesComponent implements OnInit {
  private configService = inject(ConfigService);

  prices$: Observable<any>;
  pricesError: any;
  loading: boolean;

  rows = this.configService.config.rows;
  rowsPerPage = this.configService.config.rowsPerPage;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private pricesService: PriceService,
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.pricesError = undefined;
    this.prices$ = this.pricesService.getAll().pipe(
      catchError((error) => {
        this.pricesError = error;
        return error;
      }),
      finalize(() => {
        this.loading = false;
        this.changeDetector.detectChanges();
      }),
    );
  }
}
