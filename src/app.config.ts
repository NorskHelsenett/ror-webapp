import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export interface AppConfig {
  auth: Auth;
  regex: Regex;
  rowsPerPage: number[];
  rows: number;
  rorApi: string;
  sse: SSE;
  docsUrl: string;
  externalDocsUrl: string;
}

export interface Auth {
  issuer: string;
  clientId: string;
  redirectUri: string;
  scope: string;
  responseType: string;
  logoutUrl: string;
  postLogoutRedirectUri: string;
  requireHttps: boolean;
  strictDiscoveryDocumentValidation: boolean;
}

export interface Regex {
  forms: string;
}

export interface SSE {
  postfixUrl: string;
  timeout: number;
  method: string;
}
