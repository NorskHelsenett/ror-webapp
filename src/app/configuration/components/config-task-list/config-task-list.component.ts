import { Component, inject, Input, OnInit } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';
import { Task } from '../../../core/models/task';
@Component({
  selector: 'app-config-task-list',
  templateUrl: './config-task-list.component.html',
  styleUrls: ['./config-task-list.component.scss'],
  standalone: false,
})
export class ConfigTaskListComponent implements OnInit {
  private configService = inject(ConfigService);
  @Input() tasks: Task[] | undefined;

  rowsPerPage = this.configService.config.rowsPerPage;

  ngOnInit(): void {
    return;
  }
}
