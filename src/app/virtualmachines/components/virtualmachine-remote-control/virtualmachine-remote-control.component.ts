import { NgClass } from '@angular/common';
import { Component, inject, Input, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Resource } from '@rork8s/ror-resources/models';
import { OAuthService } from 'angular-oauth2-oidc';
import { ClipboardService } from 'ngx-clipboard';
import { MessageService } from 'primeng/api';
import { Tabs, TabsModule } from 'primeng/tabs';
import { TerminalModule, TerminalService } from 'primeng/terminal';
import { VirtualmachineService } from '../../services/virtualmachine.service';

@Component({
  selector: 'app-virtualmachine-remote-control',
  standalone: true,
  imports: [TranslateModule, TabsModule, TerminalModule, NgClass],
  providers: [TerminalService],
  templateUrl: './virtualmachine-remote-control.component.html',
  styleUrl: './virtualmachine-remote-control.component.scss',
})
export class VirtualmachineRemoteControlComponent {
  @Input() virtualmachine: Resource | undefined;
  @Input() userClaims: any = undefined;
  activeTabIndex = 0;
  selectedTabIndex: number = 0;

  showLogin = false;
  sshCommand = '';
  mstscCommand = '';

  @ViewChild('tabs') tabsComponent: Tabs | undefined;

  private clipboardService = inject(ClipboardService);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);
  private oauthService = inject(OAuthService);
  private virtualmachineService = inject(VirtualmachineService);

  private tabs: any[] = [
    {
      metadata: '',
      query: '',
    },
  ];

  ngAfterContentChecked(): void {
    this.userClaims = this.oauthService.getIdentityClaims();
    this.sshCommand = `ssh ${this.getUsername()}@${this.virtualmachine?.virtualmachine?.spec?.name}`;
    this.mstscCommand = `mstsc /v:${this.virtualmachine?.metadata?.name}`;
  }

  toggleShowLogin(): void {
    this.showLogin = !this.showLogin;
  }

  copySSHCommand(): void {
    this.clipboardService.copy(this.virtualmachineService.getSSHCommand(this.getUsername()));
    this.messageService.add({ severity: 'success', summary: this.translateService.instant('pages.virtualmachines.details.tools.sshcommandcopied') });
  }

  copyMstscCommand(): void {
    this.clipboardService.copy(this.virtualmachineService.getMstscCommand());
    this.messageService.add({
      severity: 'success',
      summary: this.translateService.instant('pages.virtualmachines.details.tools.mstsccommandcopied'),
    });
  }

  switchTab(): void {
    try {
      const tab = this.tabs[this.activeTabIndex];
      //this.location.replaceState(`virtualmachines/${this.resourceId}`, tab?.query);
    } catch {
      //ignoring
    }
  }

  private getUsername(): string {
    const user = this.userClaims?.email?.split('@')[0];
    return user;
  }
}
