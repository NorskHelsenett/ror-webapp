import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DesiredVersion } from '../models/desiredversion';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class DesiredversionsService {
  private configService = inject(ConfigService);
  private httpClient = inject(HttpClient);

  getAll(): Observable<DesiredVersion[]> {
    let url = `${this.configService.config.rorApi}/v1/desired_versions`;
    return this.httpClient.get<DesiredVersion[]>(url);
  }

  getByKey(key: string): Observable<DesiredVersion> {
    let url = `${this.configService.config.rorApi}/v1/desired_versions/${key}`;
    return this.httpClient.get<DesiredVersion>(url);
  }

  create(desiredVersion: DesiredVersion): Observable<DesiredVersion> {
    let url = `${this.configService.config.rorApi}/v1/desired_versions`;
    return this.httpClient.post<DesiredVersion>(url, desiredVersion);
  }

  update(key: string, desiredVersion: DesiredVersion): Observable<DesiredVersion> {
    let url = `${this.configService.config.rorApi}/v1/desired_versions/${key}`;
    return this.httpClient.put<DesiredVersion>(url, desiredVersion);
  }

  delete(key: string): Observable<DesiredVersion> {
    let url = `${this.configService.config.rorApi}/v1/desired_versions/${key}`;
    return this.httpClient.delete<DesiredVersion>(url);
  }
}
