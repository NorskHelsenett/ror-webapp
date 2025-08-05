import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Component, Input, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { ProviderComponent } from '../../../shared/components/provider/provider.component';
import { TagModule } from 'primeng/tag';
import { ClusterEnvironmentComponent, ClusterStatusComponent } from '../../../shared/components';
import { ClusterEnvironment } from '../../../core/models/clusterEnvironment';
import { TimePipe } from '../../../shared/pipes/time.pipe';

@Component({
  selector: 'app-cluster-metadata',
  templateUrl: './cluster-metadata.component.html',
  styleUrls: ['./cluster-metadata.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    TooltipModule,
    ProviderComponent,
    TagModule,
    ClusterStatusComponent,
    ClusterEnvironmentComponent,
    TimePipe,
  ],
})
export class ClusterMetadataComponent implements OnInit {
  @Input() cluster: any = undefined;

  tags: any[] = [];

  constructor(
    private clipboardService: ClipboardService,
    private messageService: MessageService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.fillTags();
  }

  copyClusterId(): void {
    this.clipboardService.copy(this.cluster?.clusterId);
    this.messageService.add({ severity: 'success', summary: this.translateService.instant('pages.clusters.details.metadata.clusterIdCopied') });
  }

  copyEgressIp(): void {
    this.clipboardService.copy(this.cluster?.topology?.egressIp);
    this.messageService.add({ severity: 'success', summary: this.translateService.instant('pages.clusters.details.metadata.egressIpCopied') });
  }

  private fillTags(): void {
    this.tags = [];
    let tags: string[] = [];
    if (this.cluster.metadata?.serviceTags) {
      const keys = Object.keys(this.cluster.metadata?.serviceTags);
      keys.forEach((key: string) => {
        tags.push(key);
      });
    }
    this.tags = tags;
  }
}
