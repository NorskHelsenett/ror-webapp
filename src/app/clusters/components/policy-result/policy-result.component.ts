import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-policy-result',
  templateUrl: './policy-result.component.html',
  styleUrls: ['./policy-result.component.scss'],
  imports: [TranslatePipe, CommonModule],
})
export class PolicyResultComponent {
  @Input() result: string;
}
