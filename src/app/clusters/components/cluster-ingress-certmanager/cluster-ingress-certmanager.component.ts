import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { ClusterIngressService } from '../../services/cluster-ingress.service';
import { Resource } from '@rork8s/ror-resources/models';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { TimePipe } from '../../../shared/pipes/time.pipe';

@Component({
  selector: 'app-cluster-ingress-certmanager',
  imports: [TableModule, ButtonModule, TranslateModule, TimePipe],
  templateUrl: './cluster-ingress-certmanager.component.html',
  styleUrl: './cluster-ingress-certmanager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ClusterIngressCertmanagerComponent {
  certificates: Resource[] = [];

  private changeDetectorRef = inject(ChangeDetectorRef);
  private clusterIngressService = inject(ClusterIngressService);

  constructor() {
    effect(() => {
      this.certificates = this.clusterIngressService.getCertificates();
      this.changeDetectorRef.detectChanges();
    });
  }
}
