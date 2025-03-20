import { Component, inject, Input } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';
import { Task } from '../../../core/models/task';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ConfigTaskDetailComponent } from '../config-task-detail/config-task-detail.component';
@Component({
  selector: 'app-config-task-list',
  templateUrl: './config-task-list.component.html',
  styleUrls: ['./config-task-list.component.scss'],
  imports: [TranslateModule, CommonModule, TableModule, ButtonModule, RouterModule, ConfigTaskDetailComponent],
})
export class ConfigTaskListComponent {
  private configService = inject(ConfigService);
  @Input() tasks: Task[] | undefined;

  rowsPerPage = this.configService.config.rowsPerPage;
}
