import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ThemeService } from '../core/services/theme.service';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-release-notes',
  imports: [TranslatePipe],
  templateUrl: './release-notes.component.html',
  styleUrl: './release-notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
