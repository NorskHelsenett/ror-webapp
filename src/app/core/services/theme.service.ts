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
    let isDark = true;
    if (isPlatformBrowser(this.platformId)) {
      isDark = localStorage.getItem('isDark') == 'true';
    }

    if (isDark === true) {
      this.isDark.next(true);
      this.setDarkTheme();
    } else {
      this.isDark.next(false);
      this.setLightTheme();
    }

    this.switchTheme();
  }

  setDark(setDark: boolean): void {
    this.isDark.next(setDark);
    if (isPlatformBrowser(this.platformId)) {
      localStorage['isDark'] = setDark;
    }

    if (this.isDark?.getValue() === true) {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }

    this.switchTheme();
  }

  switchTheme() {
    if (isPlatformBrowser(this.platformId)) {
      this.hljsLoader.setTheme(this.isDark.value ? 'assets/styles/highlight/tokyo-night-light.css' : 'assets/styles/highlight/tokyo-night-dark.css');
    }
  }

  setLightTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      document?.querySelector('html')?.classList.toggle('dark');
      this.saveTheme();
    }
  }

  setDarkTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      document?.querySelector('html')?.classList.toggle('dark');
      this.saveTheme();
    }
  }

  private saveTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isDark', this.isDark?.getValue().toString());
    }
  }
}
