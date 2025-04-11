import { catchError, finalize, Observable, share } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { PriceService } from '../core/services/price.service';
import { ConfigService } from '../core/services/config.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SpinnerComponent } from '../shared/components';
import { TimePipe } from '../shared/pipes/time.pipe';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, CommonModule, RouterModule, TableModule, SpinnerComponent, TimePipe],
})
export class PricesComponent implements OnInit {
  private configService = inject(ConfigService);
  private changeDetector = inject(ChangeDetectorRef);
  private priceService = inject(PriceService);
  prices$: Observable<any>;
  pricesError: any;

  rows = this.configService.config.rows;
  rowsPerPage = this.configService.config.rowsPerPage;
  loading: boolean;

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.pricesError = undefined;
    this.prices$ = this.priceService.getAll().pipe(
      share(),
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
