import { isPlatformBrowser, Location } from '@angular/common';
import { Component, EventEmitter, Inject, inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cluster-description',
  imports: [TranslateModule, RouterModule],
  templateUrl: './cluster-description.component.html',
  styleUrl: './cluster-description.component.scss',
  standalone: true,
})
export class ClusterDescriptionComponent {
  @Input() cluster: any;
  @Output() edit = new EventEmitter<string>();

  loc = inject(Location);
  router = inject(Router);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  editRequested(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate([`/cluster/${this.cluster.clusterId}?tab=metadata`]);
    }
  }
}
