import { Component, Input } from '@angular/core';
import { OperationSystemFamilies } from '../../../core/models/operationsystemfamilies';
import { NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-os',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, NgClass, TranslateModule],
  templateUrl: './os.component.html',
  styleUrl: './os.component.scss',
})
export class OsComponent {
  @Input() osFamily: OperationSystemFamilies = OperationSystemFamilies.Unknown;
  @Input() showText: boolean = true;
  @Input() showIcon: boolean = true;
  @Input() iconSize: number = 6;
  osFamilies = OperationSystemFamilies;
}
