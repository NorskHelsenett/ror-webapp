import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { VirtualmachineService } from '../../services/virtualmachine.service';

@Component({
  selector: 'app-virtualmachine-cpu',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './virtualmachine-cpu.component.html',
  styleUrl: './virtualmachine-cpu.component.scss',
})
export class VirtualmachineCpuComponent {
  private virtualmachineService = inject(VirtualmachineService);

  getCpuPercentage(): number {
    return this.virtualmachineService.getVirtualMachine()?.virtualmachine?.status?.cpu?.usage / 100;
  }
}
