import { enableProdMode, inject } from '@angular/core';

import { environment } from './environments/environment';

import { ConfigService } from './app/core/services/config.service';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { isPlatformBrowser } from '@angular/common';

if (environment.production) {
  enableProdMode();
}

(async () => {
  const response = await fetch('/assets/config/config.json');
  if (!response.ok) {
    throw new Error(`Failed to fetch JSON: ${response.statusText}`);
  }
  const config = await response.json();
  const configService = new ConfigService();
  configService.setConfig(config);
  const APP_CONFIG = configService.config;

  if (isPlatformBrowser) {
    let origin = window.location.origin;
    if (environment.production) {
      origin = origin.replace(/:\d+$/, '');
    }

    configService.config.auth.redirectUri = origin + config.auth.redirectUri;
    configService.config.auth.postLogoutRedirectUri = origin;
    configService.config.auth.logoutUrl = origin;
  }

  appConfig.providers.unshift({
    provide: ConfigService,
    useValue: configService,
  });
  appConfig.providers.unshift({
    provide: APP_CONFIG,
    useValue: APP_CONFIG,
  });
  bootstrapApplication(AppComponent, appConfig).catch((err) => console.error('Bootstrap failed:', err));
})();
