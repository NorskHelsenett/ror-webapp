import { Component, inject, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Resource } from '@rork8s/ror-resources/models';
import { ClipboardService } from 'ngx-clipboard';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-virtualmachine-network',
  standalone: true,
  imports: [TranslateModule, BadgeModule],
  templateUrl: './virtualmachine-network.component.html',
  styleUrl: './virtualmachine-network.component.scss',
})
export class VirtualmachineNetworkComponent {
  @Input() virtualmachine: Resource | undefined;

  private clipboardService = inject(ClipboardService);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);

  copy(resource: string): void {
    this.clipboardService.copy(resource);
    this.messageService.add({ severity: 'success', summary: this.translateService.instant('common.copied') });
  }
}
