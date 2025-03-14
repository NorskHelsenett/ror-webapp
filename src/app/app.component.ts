import { ConfigService } from './core/services/config.service';
import { config } from './app.config.server';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subscription, filter, tap } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { ThemeService } from './core/services/theme.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from './core/services/auth.service';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, ToastModule, NgClass],
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
    private themeService: ThemeService,
    private titleService: Title,
    private translateService: TranslateService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      let origin = '';
      if (isPlatformBrowser(this.platformId)) {
        let origin = window.location.origin;
        if (environment.production) {
          origin = origin.replace(/:\d+$/, '');
        }
      }

      this.authService.authConfig.redirectUri = origin + this.authService.authConfig.redirectUri;
      this.authService.authConfig.postLogoutRedirectUri = origin;
      this.authService.authConfig.logoutUrl = origin;

      this.oauthService.configure(this.authService.authConfig);
      this.oauthService.loadDiscoveryDocumentAndLogin();
      this.oauthService.setupAutomaticSilentRefresh();
      this.oauthService.events.pipe(filter((e) => e?.type === 'token_received')).subscribe((_) => {
        this.oauthService.loadUserProfile();
      });
      //this.oauthService.setupAutomaticSilentRefresh();
    }
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.themeService?.isDark?.subscribe((value) => {
        this.isDark = value;
        this.changeDetector.detectChanges();
      }),
    );

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
