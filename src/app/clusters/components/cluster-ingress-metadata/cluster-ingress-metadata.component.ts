import { Router, RouterModule } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ClusterStatusComponent } from '../../../shared/components';
import { SharedModule } from '../../../shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cluster-ingress-metadata',
  templateUrl: './cluster-ingress-metadata.component.html',
  styleUrls: ['./cluster-ingress-metadata.component.scss'],
  standalone: true,
  imports: [TranslateModule, SharedModule, TooltipModule, RouterModule, CommonModule],
})
export class ClusterIngressMetadataComponent implements OnInit {
  @Input() cluster: any = undefined;
  @Input() ingressName: any = undefined;

  ingresses: any[] = [];
  ingress: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.cluster) {
      return;
    }

    this.ingresses = this.cluster?.ingresses;
    this.ingress = this.ingresses?.find((object) => {
      return object?.name === this.ingressName;
    });

    if (!this.ingress || this.ingress?.length < 1) {
      this.router.navigateByUrl('/error/404');
    }
  }
}
