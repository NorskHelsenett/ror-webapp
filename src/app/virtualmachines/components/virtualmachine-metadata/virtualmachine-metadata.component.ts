import { Resource } from '@rork8s/ror-resources/models';
import { Component, inject, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProviderComponent } from '../../../shared/components/provider/provider.component';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { ClipboardService } from 'ngx-clipboard';
import { MessageService } from 'primeng/api';
import { TimePipe } from '../../../shared/pipes/time.pipe';

@Component({
  selector: 'app-virtualmachine-metadata',
  standalone: true,
  imports: [TranslateModule, ProviderComponent, BadgeModule, TooltipModule, TimePipe],
  templateUrl: './virtualmachine-metadata.component.html',
  styleUrl: './virtualmachine-metadata.component.scss',
})
export class VirtualmachineMetadataComponent {
  @Input() virtualmachine: Resource | undefined;

  private badgeSeverity: string[] = ['success', 'info', 'warning', 'danger', 'help', 'primary', 'secondary', 'contrast'];

  private clipboardService = inject(ClipboardService);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);

  toAny(event: any): any {
    return event;
  }

  getRandomColor(): "info" | "success" | "warn" | "danger" | "secondary" | "contrast" {
    switch (Math.floor(Math.random() * 8)) {
      case 0:
        return 'success';
      case 1:
        return 'info';
      case 2:
        return 'warn';
      case 3:
        return 'danger';
      case 4:
        return 'secondary';
      case 5:
        return 'contrast';
      default:
        return 'success';
    }
  }

  copy(resource: string): void {
    this.clipboardService.copy(resource);
    this.messageService.add({ severity: 'success', summary: this.translateService.instant('common.copied') });
  }
}
