import { Resource } from '@rork8s/ror-resources/models';
import { Component, inject, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PowerComponent } from '../../../shared/components/power/power.component';
import { PowerState } from '../../../core/models/powerstate';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-virtualmachine-status',
  standalone: true,
  imports: [TranslateModule, PowerComponent, ToastModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './virtualmachine-status.component.html',
  styleUrl: './virtualmachine-status.component.scss',
})
export class VirtualmachineStatusComponent {
  @Input() virtualmachine: Resource | undefined;

  powerstates = PowerState;
  confirmDialogPosition = 'right';

  private confirmationService = inject(ConfirmationService);
  private translateService = inject(TranslateService);

  getPowerState(): PowerState {
    if (!this.virtualmachine) {
      return PowerState.Unknown;
    }
    switch (this.virtualmachine?.virtualmachine?.status?.operatingSystem?.powerState) {
      case 'poweredOn':
        return PowerState.On;
      case 'poweredOff':
        return PowerState.Off;
      case 'suspended':
        return PowerState.Off;
      default:
        return PowerState.Unknown;
    }
  }

  turnOff() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to turn off this virtual machine?',
      header: 'Turn off?',
      accept: () => {
        // Turn off the virtual machine
      },
    });
  }

  turnOn() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to turn on this virtual machine?',
      header: 'Turn on?',
      accept: () => {
        // Turn on the virtual machine
      },
    });
  }

  restart() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to restart this virtual machine?',
      header: 'Restart?',
      accept: () => {
        // Restart the virtual machine
      },
    });
  }

  suspend() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to restart this virtual machine?',
      header: 'Restart?',
      accept: () => {
        // Suspend the virtual machine
      },
    });
  }

  delete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to restart this virtual machine?',
      header: 'Restart?',
      accept: () => {
        // Delete the virtual machine
      },
    });
  }
}
