import { MetricsService } from '../core/services/metrics.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { DatacenterService } from '../core/services/datacenter.service';
import { CommonModule } from '@angular/common';
import { DatacenterTableComponent } from './components';
import { SpinnerComponent } from '../shared/components';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-datacenters',
  templateUrl: './datacenters.component.html',
  styleUrls: ['./datacenters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, CommonModule, DatacenterTableComponent, SpinnerComponent],
})
export class DatacentersComponent implements OnInit {
  datacenters$: Observable<any> | undefined;
  datacentersError: any;

  datacenterMetrics$: Observable<any> | undefined;
  datacenterMetricsError: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private datacenterService: DatacenterService,
    private metricsService: MetricsService,
  ) {}

  ngOnInit(): void {
    this.fetchDatacenters();
    this.fetchMetrics();
  }

  fetchDatacenters(): void {
    this.datacentersError = undefined;
    this.datacenters$ = this.datacenterService.get().pipe(
      catchError((error) => {
        this.datacentersError = error;
        this.changeDetector.detectChanges();
        return error;
      }),
    );
  }

  fetchMetrics(): void {
    this.datacenterMetricsError = undefined;
    this.datacenterMetrics$ = this.metricsService.getForDatacenters().pipe(
      catchError((error) => {
        this.datacentersError = error;
        this.changeDetector.detectChanges();
        return error;
      }),
    );
  }
}
