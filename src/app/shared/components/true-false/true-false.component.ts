import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-true-false',
  templateUrl: './true-false.component.html',
  styleUrls: ['./true-false.component.scss'],
  imports: [TranslatePipe, TagModule, TooltipModule],
})
export class TrueFalseComponent {
  @Input()
  trueOrFalse: boolean;

  @Input()
  labelTrue: string;

  @Input()
  labelFalse: string;
}
