import { Location } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cluster-description',
  standalone: true,
  imports: [TranslateModule],
  providers: [Location],
  templateUrl: './cluster-description.component.html',
  styleUrl: './cluster-description.component.scss',
})
export class ClusterDescriptionComponent {
  @Input() cluster: any;
  @Output() edit = new EventEmitter<string>();
  loc = inject(Location);

  editRequested(): void {
    this.loc.replaceState(`/cluster/${this.cluster.clusterId}?tab=metadata`);
    window.location.reload();
  }
}
