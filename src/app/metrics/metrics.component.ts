import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable, tap, catchError, interval } from 'rxjs';
import { MetricsCustom, MetricsCustomItem } from '../core/models/metricsCustom';
import { ChartOptions } from 'chart.js';
import { Dialog, DialogModule } from 'primeng/dialog';
import { MetricsService } from '../core/services/metrics.service';
import { ThemeService } from '../core/services/theme.service';
import { TranslateModule } from '@ngx-translate/core';

import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, ChartModule, DialogModule],
})
export class MetricsComponent implements OnInit, OnDestroy {
  chartOptions: ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: false,
    responsive: false,
  };
  chartDataNHNTooling: any | undefined;
  chartDataK8sVersions: any | undefined;
  isDark = false;

  backgroundColors = ['#00467A', '#372770', '#6B1E27', '#E85800'];
  lightbackgroundColors = ['#90DDFA', '#C0A9FF', '#D48282', '#FFC46B'];

  customMetrics$: Observable<any> | undefined;
  data$: Observable<any> | undefined;
  metricsError: any;
  customMetricsDataNHNTooling: MetricsCustom | undefined;
  customMetricsDataK8sVersions: MetricsCustom | undefined;

  display: boolean = false;

  private subscriptions = new Subscription();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private themeService: ThemeService,
    private metricsService: MetricsService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.themeService.isDark.subscribe((value) => {
        this.isDark = value;
        this.changeDetector.detectChanges();
      }),
    );
    this.fetchDataNHNTooling();
    this.fetchDataK8sVersions();
    this.fetchCustomMetrics();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  showDialog(dialog: Dialog) {
    if (dialog) {
      dialog?.maximize();
    }
    this.display = true;
  }

  fetchCustomMetrics(): void {
    this.subscriptions.add(
      interval(2000)
        .pipe(
          tap(() => {
            this.fetchDataNHNTooling();
            this.fetchDataK8sVersions();
          }),
        )
        .subscribe(),
    );
  }

  fetchDataNHNTooling(): void {
    this.subscriptions.add(
      this.metricsService
        .getForClusterByProperty('versions.nhntooling.version')
        .pipe(
          tap((data: MetricsCustom) => {
            this.customMetricsDataNHNTooling = data;
            this.setChartDataNHNTooling();
            this.changeDetector.detectChanges();
          }),
          catchError((error) => {
            this.metricsError = error;
            return error;
          }),
        )
        .subscribe(),
    );
  }

  fetchDataK8sVersions(): void {
    this.subscriptions.add(
      this.metricsService
        .getForClusterByProperty('versions.kubernetes')
        .pipe(
          tap((data: MetricsCustom) => {
            this.customMetricsDataK8sVersions = data;
            this.setChartDataK8sVersions();
            this.changeDetector.detectChanges();
          }),
          catchError((error) => {
            this.metricsError = error;
            return error;
          }),
        )
        .subscribe(),
    );
  }

  setChartDataNHNTooling(): void {
    let labels: string[] = [];
    let data: number[] = [];

    this.customMetricsDataNHNTooling?.data?.forEach((element: MetricsCustomItem) => {
      labels.push(element?.text);
      data.push(element?.value);
    });

    this.chartDataNHNTooling = {
      responsive: true,
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: this.isDark ? this.backgroundColors : this.lightbackgroundColors,
          hoverBackgroundColor: this.isDark ? this.lightbackgroundColors : this.backgroundColors,
        },
      ],
    };
  }

  setChartDataK8sVersions(): void {
    let labels: string[] = [];
    let data: number[] = [];

    this.customMetricsDataK8sVersions?.data?.forEach((element: MetricsCustomItem) => {
      labels.push(element?.text);
      data.push(element?.value);
    });

    this.chartDataK8sVersions = {
      responsive: true,
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: this.isDark ? this.backgroundColors : this.lightbackgroundColors,
          hoverBackgroundColor: this.isDark ? this.lightbackgroundColors : this.backgroundColors,
        },
      ],
    };
  }
}
