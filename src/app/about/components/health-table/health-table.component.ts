import { Component, Input, OnInit } from '@angular/core';
import { HealthCheckService } from '../../../core/models/healthcheckservice';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-health-table',
  templateUrl: './health-table.component.html',
  styleUrls: ['./health-table.component.scss'],
  imports: [TranslateModule, CommonModule],
})
export class HealthTableComponent implements OnInit {
  @Input() health: any[] = [];

  constructor() {}

  ngOnInit(): void {
    return;
  }

  getServices(): Array<HealthCheckService> {
    return Object.values(this.health['services']);
  }
}
