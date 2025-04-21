import { OAuthService } from 'angular-oauth2-oidc';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-callback',
  imports: [TranslateModule],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss',
})
export class CallbackComponent implements OnInit {
  private relativePath = '../../';
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private changeDetector: ChangeDetectorRef,
    private oauthService: OAuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.oauthService.loadDiscoveryDocumentAndLogin();
      this.oauthService.setupAutomaticSilentRefresh();

      // Automatically load user profile
      this.oauthService.events.pipe(filter((e) => e?.type === 'token_received')).subscribe((_) => {
        this.oauthService.loadUserProfile();
        this.changeDetector.detectChanges();
        this.redirect();
        return;
      });

      this.changeDetector.detectChanges();
      this.redirect();
    }
  }

  redirect(): void {
    setTimeout(() => {
      this.router.navigate([this.relativePath]);
      this.changeDetector.detectChanges();
    }, 0);
  }
}
