import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { VirtualmachineService } from '../../services/virtualmachine.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-virtualmachine-price',
  standalone: true,
  imports: [TranslateModule, CurrencyPipe],
  templateUrl: './virtualmachine-price.component.html',
  styleUrl: './virtualmachine-price.component.scss',
})
export class VirtualmachinePriceComponent {
  private virtualmachineService = inject(VirtualmachineService);

  getPricePerMonth(): number {
    return (
      this.virtualmachineService.convertBytesToGigabytes(this.virtualmachineService.getVirtualMachine()?.virtualmachine?.spec?.memory.sizeBytes) * 30
    );
  }

  getPricePerYear(): number {
    return (
      this.virtualmachineService.convertBytesToGigabytes(this.virtualmachineService.getVirtualMachine()?.virtualmachine?.spec?.memory.sizeBytes) *
      30 *
      12
    );
  }
}
