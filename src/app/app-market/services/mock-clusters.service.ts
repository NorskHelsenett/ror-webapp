import { Observable, of, skip, take } from 'rxjs';
import { Cluster } from './../../core/models/cluster';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockClustersService {
  private clusters: Cluster[] = [
    {
      clusterName: 'sdi-ror-dev',
      clusterId: 'sdi-ror-dev-953z',
      workspace: 'trd1-nhn-mgmt',
    },
    {
      clusterName: 'p-ror-001',
      clusterId: 'p-ror-001-234d',
      workspace: 'trd1-nhn-mgmt',
    },
    {
      clusterName: 't-ror-001',
      clusterId: 't-ror-001-dsd7',
      workspace: 'trd2-nhn-mgmt',
    },
    {
      clusterName: 'd-ror-001',
      clusterId: 'd-ror-001-1337',
      workspace: 'trd3-nhn-mgmt',
    },
    {
      clusterName: 't-ror-002',
      clusterId: 't-ror-002-wes2',
      workspace: 'trd1-nhn-mgmt',
    },
  ];

  getClusters(offset: number, limit: number): Observable<Cluster[]> {
    return of(this.clusters).pipe(skip(offset), take(limit));
  }

  getClusterById(clusterId: string): Observable<Cluster> {
    return of(this.clusters.find((c) => c.clusterId === clusterId));
  }

  getClusterByName(clusterName: string): Observable<Cluster[]> {
    return of(this.clusters.filter((c: Cluster) => c.clusterName === clusterName));
  }
}
