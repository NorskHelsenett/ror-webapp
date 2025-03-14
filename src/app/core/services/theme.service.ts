import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HighlightLoader } from 'ngx-highlightjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document: Document = inject(DOCUMENT);
  isDark = new BehaviorSubject<boolean>(true);

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private hljsLoader: HighlightLoader,
  ) {
    let isDark = false;
    if (isPlatformBrowser(this.platformId)) {
      isDark = localStorage.getItem('isDark') == 'true';
    }

    if (isDark === true) {
      this.isDark.next(true);
      this.switchTheme('dark');
    } else {
      this.isDark.next(false);
      this.switchTheme('light');
    }
  }

  setDark(setDark: boolean): void {
    this.isDark.next(setDark);
    if (isPlatformBrowser(this.platformId)) {
      localStorage['isDark'] = setDark;
    }

    if (this.isDark?.getValue() === true) {
      this.switchTheme('dark');
    } else {
      this.switchTheme('light');
    }
  }

  switchTheme(theme: string) {
    if (isPlatformBrowser(this.platformId)) {
      let themeLink = this.document?.getElementById('app-theme') as HTMLLinkElement;
      if (themeLink) {
        themeLink.href = `${theme}.css`;
      }
      this.hljsLoader.setTheme(theme === 'dark' ? 'assets/styles/highlight/tokyo-night-dark.css' : 'assets/styles/highlight/tokyo-night-light.css');
    }
  }
}
