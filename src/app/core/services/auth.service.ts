import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
import { ConfigService } from './config.service';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

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
      return sessionStorage.getItem('access_token');
    } else {
      return null;
    }
  }

  logout() {
    this.userService.user.next(null);
    if (isPlatformBrowser(this.platformId)) {
      this.oauthService.logOut();
    }
    // if (isPlatformBrowser(this.platformId)) {
    //   window.location.reload();
    // }
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
    } else {
      return false;
    }
  }

  login() {
    // this.oauthService
    //   .loadDiscoveryDocumentAndLogin()
    //   .then((result: boolean) => {
    //     this.authenticationEventObservable.next(result);
    //   })
    //   .catch((error: any) => {
    //     console.error('Error logging in', error);
    //     this.logout();
    //   });
    if (isPlatformBrowser(this.platformId)) {
      this.oauthService.loadDiscoveryDocumentAndLogin();
    }

    // Optional
    //this.oauthService.setupAutomaticSilentRefresh();
  }

  refresh() {
    if (isPlatformBrowser(this.platformId)) {
      this.oauthService.refreshToken();
    }
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }
    const decodedToken = jwtDecode(token);
    if (!decodedToken) {
      return true;
    }

    const now = new Date();
    const exp = new Date(0);
    exp.setUTCSeconds(decodedToken.exp);
    return now > exp;
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
