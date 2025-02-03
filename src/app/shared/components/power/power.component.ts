import { Component, Input } from '@angular/core';
import { PowerState } from '../../../core/models/powerstate';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-power',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, TranslateModule],
  templateUrl: './power.component.html',
  styleUrl: './power.component.scss',
})
export class PowerComponent {
  @Input() powerState: PowerState = PowerState.Unknown;
  @Input() showText: boolean = true;
  @Input() showIcon: boolean = true;
  powerstates = PowerState;
}
