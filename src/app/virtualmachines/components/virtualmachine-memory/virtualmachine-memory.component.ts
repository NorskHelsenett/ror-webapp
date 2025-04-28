import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { VirtualmachineService } from '../../services/virtualmachine.service';

@Component({
  selector: 'app-virtualmachine-memory',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './virtualmachine-memory.component.html',
  styleUrl: './virtualmachine-memory.component.scss',
})
export class VirtualmachineMemoryComponent {
  private virtualmachineService = inject(VirtualmachineService);

  getMemorySize(): number {
    return this.virtualmachineService.convertBytesToGigabytes(this.virtualmachineService.getVirtualMachine()?.virtualmachine?.spec?.memory.sizeBytes);
  }
}
