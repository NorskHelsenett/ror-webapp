import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ThemeService } from '../core/services/theme.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrl: './release-notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, CommonModule],
})
export class ReleaseNotesComponent implements OnInit {
  isDark = false;

  private subscriptions = new Subscription();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.themeService.isDark.subscribe((value) => {
        this.isDark = value;
        this.changeDetector.detectChanges();
      }),
    );
  }
}
