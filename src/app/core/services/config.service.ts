import { Injectable } from '@angular/core';
import { AppConfig } from '../../../app-config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config: AppConfig = {
    auth: {
      issuer: 'http://localhost:6556/dex',
      clientId: 'ror.sky.test.nhn.no',
      redirectUri: '/auth/callback',
      scope: 'openid profile email groups offline_access',
      responseType: 'code',
      requireHttps: false,
      strictDiscoveryDocumentValidation: false,
      postLogoutRedirectUri: '/auth/logout',
      logoutUrl: '/auth/logout',
    },
    regex: {
      forms: '^[@()\\/:?\\r\\n.,a-zA-Z æøåÆØÅ0-9_-]+$',
    },
    docsUrl: 'https://norskhelsenett.github.io/ror/',
    externalDocsUrl: 'https://norskhelsenett.github.io/ror/',
    rowsPerPage: [10, 25, 50, 75, 100],
    rows: 25,
    rorApi: 'http://localhost:10000',
    sse: {
      postfixUrl: '/v1/events/listen',
      method: 'GET',
      timeout: 30000,
    },
  };

  setConfig(config: AppConfig): void {
    this.createConfig(config);
  }

  getConfig(): AppConfig {
    return this.config;
  }

  private createConfig(config: AppConfig): void {
    this.config = config;
  }
}
