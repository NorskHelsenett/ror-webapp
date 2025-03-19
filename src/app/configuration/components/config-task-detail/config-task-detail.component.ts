import { Component, Input, ViewEncapsulation } from '@angular/core';
import { HighlightResult } from 'highlight.js';
import { Task } from '../../../core/models/task';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-config-task-detail',
  templateUrl: './config-task-detail.component.html',
  styleUrls: ['./config-task-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  imports: [TranslateModule, CommonModule, HighlightModule],
})
export class ConfigTaskDetailComponent {
  @Input()
  task: Task;

  response!: HighlightResult;

  onHighlight(e: HighlightResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      _emitter: e._emitter,
      illegal: e.illegal,
      secondBest: e.secondBest,
      value: '{...}',
    };
  }
}
