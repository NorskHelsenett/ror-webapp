import { Resource } from '@rork8s/ror-resources/models';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { VirtualmachineNetworkComponent } from '../virtualmachine-network/virtualmachine-network.component';

@Component({
  selector: 'app-virtualmachine-detail',
  standalone: true,
  imports: [TranslateModule, VirtualmachineNetworkComponent],
  templateUrl: './virtualmachine-detail.component.html',
  styleUrl: './virtualmachine-detail.component.scss',
})
export class VirtualmachineDetailComponent {
  @Input() virtualmachine: Resource | undefined;
}
