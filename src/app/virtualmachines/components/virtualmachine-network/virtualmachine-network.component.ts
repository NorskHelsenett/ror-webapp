import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-virtualmachine-network',
  standalone: true,
  imports: [TranslateModule, BadgeModule],
  templateUrl: './virtualmachine-network.component.html',
  styleUrl: './virtualmachine-network.component.scss',
})
export class VirtualmachineNetworkComponent {
  @Input() virtualmachine: any | undefined;
}
