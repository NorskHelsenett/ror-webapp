import { AfterContentChecked, Component, inject, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ClipboardModule, ClipboardService } from 'ngx-clipboard';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-virtualmachine-tools',
  standalone: true,
  imports: [TranslateModule, ClipboardModule],
  templateUrl: './virtualmachine-tools.component.html',
  styleUrl: './virtualmachine-tools.component.scss',
})
export class VirtualmachineToolsComponent implements AfterContentChecked {
  @Input() virtualmachine: any | undefined;
  @Input() userClaims: any = undefined;

  showLogin = false;
  sshCommand = '';
  mstscCommand = '';

  private clipboardService = inject(ClipboardService);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);

  ngAfterContentChecked(): void {
    this.sshCommand = `ssh ${this.getUsername()}@${this.virtualmachine?.virtualmachine?.spec?.name}`;
    this.mstscCommand = `mstsc /v:${this.virtualmachine?.ip}`;
  }

  toggleShowLogin(): void {
    this.showLogin = !this.showLogin;
  }

  getUsername(): string {
    const user = this.userClaims?.email?.split('@')[0];
    return user;
  }

  copySSHCommand(): void {
    this.clipboardService.copy(this.sshCommand);
    this.messageService.add({ severity: 'success', summary: this.translateService.instant('pages.virtualmachines.details.tools.sshcommandcopied') });
  }

  copyMstscCommand(): void {
    this.clipboardService.copy(this.mstscCommand);
    this.messageService.add({
      severity: 'success',
      summary: this.translateService.instant('pages.virtualmachines.details.tools.mstsccommandcopied'),
    });
  }
}
