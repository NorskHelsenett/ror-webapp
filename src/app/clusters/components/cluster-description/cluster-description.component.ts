import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cluster-description',
  imports: [TranslatePipe, RouterModule],
  templateUrl: './cluster-description.component.html',
  styleUrl: './cluster-description.component.scss',
  standalone: true,
})
export class ClusterDescriptionComponent {
  @Input() cluster: any;
  @Output() edit = new EventEmitter<void>();

  editRequested(): void {
    this.edit.emit();
  }
}
