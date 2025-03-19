import { isPlatformBrowser, Location } from '@angular/common';
import { Component, EventEmitter, Inject, inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cluster-description',
  imports: [TranslateModule],
  templateUrl: './cluster-description.component.html',
  styleUrl: './cluster-description.component.scss',
  standalone: true,
})
export class ClusterDescriptionComponent {
  @Input() cluster: any;
  @Output() edit = new EventEmitter<string>();

  loc = inject(Location);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  editRequested(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loc.replaceState(`/cluster/${this.cluster.clusterId}?tab=metadata`);
      //window.location.reload();
    }
  }
}
