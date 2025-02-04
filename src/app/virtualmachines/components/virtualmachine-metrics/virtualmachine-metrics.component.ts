import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Resource } from '@rork8s/ror-resources/models';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-virtualmachine-metrics',
  standalone: true,
  imports: [TranslateModule, ChartModule],
  templateUrl: './virtualmachine-metrics.component.html',
  styleUrl: './virtualmachine-metrics.component.scss',
})
export class VirtualmachineMetricsComponent implements OnInit {
  @Input() set virtualmachine(value: Resource | undefined) {
    this._vm = value;
    this.setOptions();
    this.setChartData();
  }

  get vm(): Resource | undefined {
    return this._vm;
  }
  options: any;
  data: any;

  private _vm: Resource | undefined;

  ngOnInit(): void {
    return;
  }

  setOptions(): void {
    this.options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      scales: {
        x: {
          grid: {
            drawBorder: false,
          },
          suggestedMax: 100,
        },
        y: {
          grid: {
            drawBorder: false,
          },
        },
      },
    };
  }

  setChartData(): void {
    this.data = {
      labels: ['CPU', 'Memory'],
      datasets: [
        {
          data: [0, this.vm?.virtualmachine?.status?.cpu?.usage / 100],
          backgroundColor: 'blue',
          fill: true,
          label: 'CPU',
        },
        {
          data: [this.vm?.virtualmachine?.status?.memory?.usage / 100, 0],
          backgroundColor: 'green',
          fill: true,
          label: 'Memory',
        },
      ],
    };
  }

  setChartType(type: string): void {
    this.options.type = type;
  }
}
