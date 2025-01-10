import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cluster-description',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './cluster-description.component.html',
  styleUrl: './cluster-description.component.scss',
})
export class ClusterDescriptionComponent {
  @Input() description: string;
}
