import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-workspace-table',
  templateUrl: './workspace-table.component.html',
  styleUrls: ['./workspace-table.component.scss'],
  standalone: false,
})
export class WorkspaceTableComponent implements OnInit {
  @Input() workspaces: any[] = [];

  constructor() {}

  ngOnInit(): void {
    return;
  }
}
