import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService,
    private oauthService: OAuthService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // On server-side, we cannot authenticate - let the client handle it
    if (!isPlatformBrowser(this.platformId)) {
      return of(false);
    }

    if (this.authService.isAuthenticated()) {
      return of(true);
    } else {
      this.oauthService.loadDiscoveryDocumentAndLogin();
      this.authService.login();
      return this.authService.authenticationEventObservable;
    }
  }
}
