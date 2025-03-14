import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-cluster-ingress-list',
  templateUrl: './cluster-ingress-list.component.html',
  styleUrls: ['./cluster-ingress-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClusterIngressListComponent implements OnInit {
  private configService = inject(ConfigService);
  private changeDetector = inject(ChangeDetectorRef);
  @Input() cluster: any = undefined;

  ingresses: any[] = [];
  rows = this.configService.config.rows;
  rowsPerPage = this.configService.config.rowsPerPage;

  ngOnInit(): void {
    if (!this.cluster) {
      this.changeDetector.detectChanges();
      return;
    }

    this.ingresses = this.cluster?.ingresses;
    this.changeDetector.detectChanges();
  }
}
