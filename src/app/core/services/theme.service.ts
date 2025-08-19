import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID, DOCUMENT } from '@angular/core';
import { HighlightLoader } from 'ngx-highlightjs';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_KEYS } from '../constants/storage-keys';

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
      isDark = localStorage.getItem(STORAGE_KEYS.IS_DARK) == 'true';
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
    if (this.isDark?.getValue() === true) {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }

    this.switchTheme();
  }

  switchTheme() {
    if (isPlatformBrowser(this.platformId)) {
      this.hljsLoader.setTheme(
        this.isDark.getValue() ? 'assets/styles/highlight/tokyo-night-dark.css' : 'assets/styles/highlight/tokyo-night-light.css',
      );
    }
  }

  setLightTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEYS.IS_DARK, false.toString());
      document?.querySelector('html')?.classList.remove('dark');
      document?.querySelector('body')?.classList.remove('dark');
    }
  }

  setDarkTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEYS.IS_DARK, true.toString());
      document?.querySelector('html')?.classList.add('dark');
      document?.querySelector('body')?.classList.add('dark');
    }
  }
}
