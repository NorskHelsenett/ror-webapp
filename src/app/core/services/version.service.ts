import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  private configService = inject(ConfigService);
  private httpClient = inject(HttpClient);

  getVersion(): Observable<any> {
    const url = `${this.configService.config.rorApi}/v1/info/version`;
    return this.httpClient.get<any>(url);
  }
}
