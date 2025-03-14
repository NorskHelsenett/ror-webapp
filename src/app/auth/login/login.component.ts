import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '../../core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private oauthService = inject(OAuthService);
  private authService = inject(AuthService);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.oauthService.loadDiscoveryDocumentAndLogin();
    }
  }
}
