import { Resource } from '@rork8s/ror-resources/models';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProviderComponent } from '../../../shared/components/provider/provider.component';
import { SharedModule } from '../../../shared/shared.module';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-virtualmachine-metadata',
  standalone: true,
  imports: [TranslateModule, ProviderComponent, SharedModule, BadgeModule, TooltipModule],
  templateUrl: './virtualmachine-metadata.component.html',
  styleUrl: './virtualmachine-metadata.component.scss',
})
export class VirtualmachineMetadataComponent {
  @Input() virtualmachine: Resource | undefined;

  private badgeSeverity: string[] = ['success', 'info', 'warning', 'danger', 'help', 'primary', 'secondary', 'contrast'];

  toAny(event: any): any {
    return event;
  }

  getRandomColor(): 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' {
    switch (Math.floor(Math.random() * 8)) {
      case 0:
        return 'success';
      case 1:
        return 'info';
      case 2:
        return 'warning';
      case 3:
        return 'danger';
      case 4:
        return 'help';
      case 5:
        return 'primary';
      case 6:
        return 'secondary';
      case 7:
        return 'contrast';
      default:
        return 'success';
    }
  }
}
