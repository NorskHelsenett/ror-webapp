import { UserprofileDetailsComponent } from './pages/userprofile-details/userprofile-details.component';
import { isPlatformBrowser, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AclService } from '../core/services/acl.service';
import { Subscription } from 'rxjs';
import { TabViewModule } from 'primeng/tabview';
import { TranslateModule } from '@ngx-translate/core';
import { UserprofileApikeysComponent } from './pages';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, TabViewModule, UserprofileDetailsComponent, UserprofileApikeysComponent],
})
export class UserprofileComponent implements OnInit, OnDestroy {
  idToken: string | undefined;
  accessToken: string | undefined;
  claims: any;
  authHeaders: any;
  expDate: Date = new Date(1970);
  iatDate: Date = new Date(1970);
  rawIsHidden = true;

  selectedTabIndex: number = 0;
  tabs: any[] = [
    {
      metadata: '',
      query: '',
    },
    {
      metadata: 'apikeys',
      query: 'tab=apikeys',
    },
  ];

  private subscriptions = new Subscription();

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private location: Location,
    private oauthService: OAuthService,
    private aclService: AclService,
  ) {}

  ngOnInit(): void {
    const tab = this.route.snapshot.queryParams['tab'];
    this.tabs.forEach((value: any, index: number) => {
      if (tab == value?.metadata) {
        this.selectedTabIndex = index;
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.idToken = this.oauthService.getIdToken();
      this.accessToken = this.oauthService.getAccessToken();
      this.claims = this.oauthService.getIdentityClaims();
      if (this.claims != undefined) {
        this.expDate = new Date(this.claims?.exp * 1000);
        this.iatDate = new Date(this.claims?.iat * 1000);
        this.changeDetector.detectChanges();
      }
      this.authHeaders = this.oauthService.authorizationHeader();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  switchTab(selectedIndex: number): void {
    try {
      const tab = this.tabs[selectedIndex];
      if (isPlatformBrowser(this.platformId)) {
        this.location.replaceState('userprofile', tab?.query);
      }
    } catch {
      //ignoring
    }
  }
}
