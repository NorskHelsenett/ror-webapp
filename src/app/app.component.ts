import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, isDevMode, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subscription, filter, tap } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { Title } from '@angular/platform-browser';
import { AuthService } from './core/services/auth.service';
import { HydrationService } from './core/services/hydration.service';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import localeNo from '@angular/common/locales/no';
registerLocaleData(localeNo);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, ToastModule],
  standalone: true,
})
export class AppComponent implements OnInit, OnDestroy {
  isDark = false;

  private subscriptions = new Subscription();

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private changeDetector: ChangeDetectorRef,
    private oauthService: OAuthService,
    private authService: AuthService,
    private titleService: Title,
    private translateService: TranslateService,
    private hydrationService: HydrationService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      let origin = window.location.origin;
      if (!isDevMode()) {
        origin = window.location.origin.replace(/:\d+$/, '');
      }
      console.log('origin', origin);

      this.authService.authConfig.redirectUri = origin + this.authService.authConfig.redirectUri;
      this.authService.authConfig.postLogoutRedirectUri = origin;
      this.authService.authConfig.logoutUrl = origin;

      this.oauthService.configure(this.authService.authConfig);
      this.oauthService.loadDiscoveryDocumentAndLogin();

      // Defer automatic silent refresh until after hydration
      this.hydrationService.afterHydration(() => {
        this.oauthService.setupAutomaticSilentRefresh();
      }, 1000);

      this.oauthService.events.pipe(filter((e) => e?.type === 'token_received')).subscribe((_) => {
        this.oauthService.loadUserProfile();
      });
    }
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.translateService.onLangChange
        .pipe(
          tap((langSettings) => {
            this.changeTitle(langSettings.lang);
          }),
        )
        .subscribe(),
    );

    this.translateService.addLangs(['en', 'no']);
    this.translateService.setDefaultLang('no');

    let lang = 'en';
    let userLang = '';
    if (isPlatformBrowser(this.platformId)) {
      userLang = localStorage.getItem('language');
    }
    if (userLang && userLang.length > 0) {
      lang = userLang;
    } else {
      const browserLang = this.translateService.getBrowserLang();
      lang = browserLang?.match(/en|no/) ? browserLang : 'en';
    }

    this.translateService.use(lang);

    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get userName(): string | null | object {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims;
  }

  get idToken(): string {
    return this.oauthService.getIdToken();
  }

  get accessToken(): string {
    return this.oauthService.getAccessToken();
  }

  private changeTitle(lang: string): void {
    const title = this.translateService.instant('app.title');
    this.titleService.setTitle(title);
  }
}
