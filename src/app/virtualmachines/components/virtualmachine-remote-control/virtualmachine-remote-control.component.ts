import { Location } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ClipboardService } from 'ngx-clipboard';
import { MessageService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { TerminalModule, TerminalService } from 'primeng/terminal';

@Component({
  selector: 'app-virtualmachine-remote-control',
  standalone: true,
  imports: [TranslateModule, TabViewModule, TerminalModule],
  providers: [TerminalService],
  templateUrl: './virtualmachine-remote-control.component.html',
  styleUrl: './virtualmachine-remote-control.component.scss',
})
export class VirtualmachineRemoteControlComponent {
  @Input() virtualmachine: any | undefined;
  @Input() userClaims: any = undefined;
  activeTabIndex = 0;
  selectedTabIndex: number = 0;

  showLogin = false;
  sshCommand = '';
  mstscCommand = '';

  private location = inject(Location);
  private clipboardService = inject(ClipboardService);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);
  private oauthService = inject(OAuthService);

  private tabs: any[] = [
    {
      metadata: '',
      query: '',
    },
  ];

  ngAfterContentChecked(): void {
    this.userClaims = this.oauthService.getIdentityClaims();
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

  switchTab(selectedIndex: number): void {
    try {
      const tab = this.tabs[selectedIndex];
      //this.location.replaceState(`virtualmachines/${this.resourceId}`, tab?.query);
    } catch {
      //ignoring
    }
  }
}
