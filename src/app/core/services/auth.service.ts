import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
import { ConfigService } from './config.service';
import { isPlatformBrowser } from '@angular/common';
import { STORAGE_KEYS } from '../constants/storage-keys';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private oauthService = inject(OAuthService);
  private userService = inject(UserService);

  authenticationEventObservable: Subject<boolean> = new Subject<boolean>();
  authConfig: AuthConfig | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private configService: ConfigService,
  ) {
    this.setConfig();
    if (isPlatformBrowser(this.platformId)) {
      this.oauthService.configure(this.authConfig);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      // Use OAuth service's access token instead of manual storage
      return this.oauthService.getAccessToken() || localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    } else {
      return null;
    }
  }

  logout() {
    this.userService.user.next(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      this.oauthService.logOut();
    }
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const hasValidTokens = this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
      const tokenExists = !!this.getToken();

      if (!hasValidTokens && tokenExists) {
        console.warn('Token exists but OAuth service reports invalid tokens, clearing storage');
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        return false;
      }

      return hasValidTokens;
    } else {
      return false;
    }
  }

  login() {
    if (isPlatformBrowser(this.platformId)) {
      this.oauthService
        .loadDiscoveryDocumentAndLogin()
        .then((result: boolean) => {
          console.log('Login result:', result);
          this.authenticationEventObservable.next(result);
          if (result) {
            this.oauthService.setupAutomaticSilentRefresh();
          }
        })
        .catch((error: any) => {
          console.error('Error logging in', error);
          this.logout();
        });
    }
  }

  refresh() {
    if (isPlatformBrowser(this.platformId)) {
      this.oauthService.refreshToken();
    }
  }

  isTokenExpired(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Let OAuth service handle token expiration
      return !this.oauthService.hasValidAccessToken();
    }
    return true;
  }

  private setConfig() {
    const config = this.configService?.config;
    if (!config) {
      console.error('Config not set');
      return;
    }

    this.authConfig = {
      issuer: config?.auth.issuer,
      redirectUri: config?.auth?.redirectUri,
      clientId: config?.auth?.clientId,
      responseType: config?.auth?.responseType,
      scope: config?.auth?.scope,
      showDebugInformation: false,
      timeoutFactor: 0.75,
      postLogoutRedirectUri: config?.auth?.postLogoutRedirectUri,
      logoutUrl: config?.auth?.logoutUrl,
      requireHttps: config?.auth?.requireHttps,
      strictDiscoveryDocumentValidation: config?.auth?.strictDiscoveryDocumentValidation,
    };
  }
}
