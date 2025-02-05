import { ColorService } from './../../services/color.service';
import { Component, inject, Input } from '@angular/core';
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
export class VirtualmachineMetricsComponent {
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
  private colorService = inject(ColorService);

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
    const cpuPercentage = this.vm?.virtualmachine?.status?.cpu?.usage / 100;
    const memoryPercentage = this.vm?.virtualmachine?.status?.memory?.usage / 100;

    this.data = {
      labels: ['CPU', 'Memory'],
      datasets: [
        {
          data: [0, cpuPercentage],
          backgroundColor: this.colorService.getColorForPercentage(cpuPercentage),
          fill: true,
          label: 'CPU',
        },
        {
          data: [memoryPercentage, 0],
          backgroundColor: this.colorService.getColorForPercentage(memoryPercentage),
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
