import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormatBytesPipe } from '../../../shared/pipes';

@Component({
  selector: 'app-workspace-table',
  templateUrl: './workspace-table.component.html',
  styleUrls: ['./workspace-table.component.scss'],
  imports: [TranslateModule, CommonModule, RouterModule, FormatBytesPipe],
})
export class WorkspaceTableComponent implements OnInit {
  @Input() workspaces: any[] = [];

  constructor() {}

  ngOnInit(): void {
    return;
  }
}
