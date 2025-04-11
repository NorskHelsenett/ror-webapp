import { Component, inject, Input, OnInit } from '@angular/core';
import { OperatorConfig } from '../../../core/models/operatorconfig';
import { ConfigService } from '../../../core/services/config.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-config-operator-config-list',
  templateUrl: './config-operator-config-list.component.html',
  styleUrls: ['./config-operator-config-list.component.scss'],
  imports: [TranslateModule, CommonModule, TableModule, ButtonModule, RouterModule],
})
export class ConfigOperatorConfigListComponent {
  private configService = inject(ConfigService);

  @Input() operatorConfigs: OperatorConfig[] | undefined;

  rowsPerPage = this.configService.config.rowsPerPage;
}
