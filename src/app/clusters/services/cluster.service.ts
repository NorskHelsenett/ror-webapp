import { Injectable } from '@angular/core';

@Injectable()
export class ClusterService {
  private cluster: any;

  getCluster(): any {
    return this.cluster;
  }

  setCluster(cluster: any): void {
    this.cluster = cluster;
  }

  fillTags(serviceTags: any[]): string[] {
    let tags: string[] = [];
    if (serviceTags) {
      const keys = Object.keys(serviceTags);
      keys.forEach((key: string) => {
        tags.push(key);
      });
    }
    return tags;
  }
}
