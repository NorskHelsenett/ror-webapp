import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { ClusterOrder, ClusterOrderModel } from '../models/clusterOrder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private configService = inject(ConfigService);
  private httpClient = inject(HttpClient);

  orderCluster(clusterOrder: ClusterOrderModel): Observable<boolean> {
    let url = `${this.configService.config.rorApi}/v1/orders/cluster`;
    return this.httpClient.post<boolean>(url, clusterOrder);
  }

  orderClusterDeletion(clusterOrder: ClusterOrderModel): Observable<boolean> {
    let url = `${this.configService.config.rorApi}/v1/orders/cluster`;
    return this.httpClient.post<boolean>(url, clusterOrder);
  }

  getOrders(): Observable<ClusterOrder[]> {
    let url = `${this.configService.config.rorApi}/v1/orders`;
    return this.httpClient.get<ClusterOrder[]>(url);
  }

  getOrder(uid: string): Observable<ClusterOrder> {
    let url = `${this.configService.config.rorApi}/v1/orders/${uid}`;
    return this.httpClient.get<ClusterOrder>(url);
  }

  deleteOrder(uid: string): Observable<boolean> {
    let url = `${this.configService.config.rorApi}/v1/orders/${uid}`;
    return this.httpClient.delete<boolean>(url);
  }
}
