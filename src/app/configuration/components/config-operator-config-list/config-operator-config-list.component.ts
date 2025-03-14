import { Component, inject, Input, OnInit } from '@angular/core';
import { OperatorConfig } from '../../../core/models/operatorconfig';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-config-operator-config-list',
  templateUrl: './config-operator-config-list.component.html',
  styleUrls: ['./config-operator-config-list.component.scss'],
  standalone: false,
})
export class ConfigOperatorConfigListComponent implements OnInit {
  private configService = inject(ConfigService);
  @Input() operatorConfigs: OperatorConfig[] | undefined;

  rowsPerPage = this.configService.config.rowsPerPage;

  ngOnInit(): void {
    return;
  }
}
