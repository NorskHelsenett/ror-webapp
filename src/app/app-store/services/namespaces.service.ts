import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Namespace } from '../models/namespace';

@Injectable({
  providedIn: 'root',
})
export class NamespacesService {
  private namespaces: Namespace[] = [
    {
      apiVersion: 'v1',
      kind: 'Namespace',
      metadata: {
        name: 'default',
        namespace: 'default',
        labels: {},
        annotations: {},
        creationTimestamp: '2021-08-03T14:00:00Z',
      },
    },
    {
      apiVersion: 'v1',
      kind: 'Namespace',
      metadata: {
        name: 'app1',
        namespace: 'app1',
        labels: {},
        annotations: {},
        creationTimestamp: '2021-08-03T14:00:00Z',
      },
    },
    {
      apiVersion: 'v1',
      kind: 'Namespace',
      metadata: {
        name: 'app2',
        namespace: 'app2',
        labels: {},
        annotations: {},
        creationTimestamp: '2021-08-03T14:00:00Z',
      },
    },
    {
      apiVersion: 'v1',
      kind: 'Namespace',
      metadata: {
        name: 'app3',
        namespace: 'app3',
        labels: {},
        annotations: {},
        creationTimestamp: '2021-08-03T14:00:00Z',
      },
    },
  ];

  getNamespaces(): Observable<Namespace[]> {
    return of(this.namespaces);
  }

  addNamespace(namespace: Namespace): void {
    this.namespaces.push(namespace);
  }

  deleteNamespace(namespaceName: string): void {
    this.namespaces = this.namespaces.filter((ns: Namespace) => ns?.metadata?.name !== namespaceName);
  }

  getNamespaceByName(namespaceName: string): Observable<Namespace> | undefined {
    return of(this.namespaces.find((ns: Namespace) => ns?.metadata?.name === namespaceName));
  }

  namespaceExists(namespaceName: string): boolean {
    return this.namespaces.some((ns: Namespace) => ns?.metadata?.name === namespaceName);
  }

  getNamespacesContaining(substring: string): Namespace[] {
    return this.namespaces.filter((ns: Namespace) => ns?.metadata?.name?.includes(substring));
  }

  getNamespacesByLabel(label: string): Namespace[] {
    return this.namespaces.filter((ns: Namespace) => ns?.metadata?.labels?.hasOwnProperty(label));
  }

  getNamespacesByAnnotation(annotation: string): Namespace[] {
    return this.namespaces.filter((ns: Namespace) => ns?.metadata?.annotations?.hasOwnProperty(annotation));
  }

  getNamespacesByCreationTimestamp(timestamp: string): Namespace[] {
    return this.namespaces.filter((ns: Namespace) => ns?.metadata?.creationTimestamp === timestamp);
  }

  getNamespacesByLabelValue(label: string, value: string): Namespace[] {
    return this.namespaces.filter((ns: Namespace) => ns?.metadata?.labels?.[label] === value);
  }

  getNamespacesByAnnotationValue(annotation: string, value: string): Namespace[] {
    return this.namespaces.filter((ns: Namespace) => ns?.metadata?.annotations?.[annotation] === value);
  }

  getNamespacesByLabelAndAnnotation(label: string, annotation: string): Namespace[] {
    return this.namespaces.filter(
      (ns: Namespace) => ns?.metadata?.labels?.hasOwnProperty(label) && ns?.metadata?.annotations?.hasOwnProperty(annotation),
    );
  }
}
