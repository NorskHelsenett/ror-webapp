import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { App, AppRegion } from '../models/app';

@Injectable({
  providedIn: 'root',
})
export class AppsService {
  apps: App[] = [
    {
      name: 'Valkey',
      id: '0194f3c0-d77c-7bf8-a620-89bbad87c2c3',
      iconUrl: 'https://valkey.io/img/Valkey-logo.svg',
      description: 'Valkey is a password manager that stores your passwords securely.',
      currentVersion: '8.0.2',
      versions: ['8.0.2', '7.2.7'],
      tags: ['security', 'passwords'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://valkey.io/docs/',
    },
    {
      name: 'MongoDB',
      id: '0194f3c0-d77c-7f56-bd59-e05689312e5d',
      iconUrl: 'https://cdn4.iconfinder.com/data/icons/logos-3/512/mongodb-2-512.png',
      description: 'MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need.',
      currentVersion: '8.0.3',
      versions: ['8.0.3', '7.0.15', '6.0.12'],
      tags: ['database', 'scalability'],

      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://docs.mongodb.com/',
    },
    {
      name: 'PostGreSQL',
      id: '0194f3c0-d77c-77c4-b3e7-97b2d1efe10c',
      iconUrl: 'https://wiki.postgresql.org/images/a/a4/PostgreSQL_logo.3colors.svg',
      description:
        'PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.',
      currentVersion: '17.0',
      versions: ['17.0', '16.0', '15.1', '14.2'],
      tags: ['database', 'scalability'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: false,
      docUrl: 'https://www.postgresql.org/docs/',
    },
    {
      name: 'RabbitMQ',
      id: '0194f3c0-d77c-75bc-9865-b14ae93275a3',
      iconUrl: 'https://www.rabbitmq.com/assets/files/rabbitmq-logo-with-name-258baa7f7ef3862e8f0dfa09cb760f68.svg',
      description: 'RabbitMQ is the most widely deployed open source message broker.',
      currentVersion: '4.0.5',
      versions: ['4.0.5', '3.13.7', '3.12.14'],
      tags: ['message broker', 'scalability'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://www.rabbitmq.com/documentation.html',
    },
    {
      name: 'External Secrets Operator',
      id: '0194f3c0-d77c-7b46-a172-01e6ec039d10',
      iconUrl: 'https://github.com/external-secrets/external-secrets/raw/refs/heads/main/assets/eso-round-logo.svg',
      description: 'The External Secrets Operator is a Kubernetes operator that manages the lifecycle of external secrets.',
      currentVersion: '0.14.1',
      versions: ['0.14.1', '0.3.0', '0.12.0'],
      tags: ['kubernetes', 'secrets'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://external-secrets.io/',
    },
    {
      name: 'Jaeger',
      id: '0194f3c0-d77c-71f0-a181-4b5929c4a9ef',
      iconUrl: 'https://raw.githubusercontent.com/jaegertracing/artwork/refs/heads/master/SVG/Jaeger_Logo_Final_PANTONE.svg',
      description: 'Jaeger, a Distributed Tracing System.',
      currentVersion: '1.66.0',
      versions: ['1.66.0', '1.65.0', '1.64.0'],
      tags: ['tracing', 'scalability'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://www.jaegertracing.io/docs/',
    },
    {
      name: 'Redis',
      id: '0194f3c0-d77c-7815-9087-3ed85fe40486',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6b/Redis_Logo.svg',
      description: 'Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker.',
      currentVersion: '7.4.0',
      versions: ['7.4.0.2.1', '6.2.0', '6.1.0'],
      tags: ['database', 'scalability'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://redis.io/documentation',
    },
    {
      name: 'Trident',
      id: '0194f3c0-d77c-7d9d-bb3b-0f9d8c1d1c1e',
      iconUrl: 'https://raw.githubusercontent.com/NetApp/trident/master/logo/trident.png',
      description: 'Trident is a dynamic storage provisioner with a fully automated storage orchestration engine.',
      currentVersion: '21.07',
      versions: ['21.07', '21.04', '20.10'],
      tags: ['storage', 'scalability'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://netapp-trident.readthedocs.io/en/latest/',
    },
    {
      name: 'Ceph',
      id: '0194f3c0-d77c-7d9d-bb3b-0f9d8c1d1c1e',
      iconUrl: 'https://ceph.io/assets/bitmaps/Ceph_Logo_Stacked_RGB_120411_fa.png',
      description: 'Ceph is a distributed object store and file system designed to provide excellent performance, reliability and scalability.',
      currentVersion: '16.2.6',
      versions: ['16.2.6', '16.2.5', '16.2.4'],
      tags: ['storage', 'scalability'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://docs.ceph.com/en/latest/',
    },
  ];

  getApps(): Observable<App[]> {
    return of(this.apps);
  }

  getAppById(id: string): Observable<App | undefined> {
    return of(this.apps.find((app: App) => app?.id?.toString() === id));
  }

  getAppByName(name: string): Observable<App[] | undefined> {
    return of(this.apps.filter((app: App) => app?.name === name));
  }
}
