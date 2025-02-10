import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v7 } from 'uuid';
import { App, AppRegion } from '../models/app';

@Injectable({
  providedIn: 'root',
})
export class AppsService {
  apps: App[] = [
    {
      name: 'Valkey',
      id: v7(),
      iconUrl:
        'https://private-user-images.githubusercontent.com/52016832/335792541-f9c558ae-fc5d-48af-9238-e73599630623.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzkxODk4MzMsIm5iZiI6MTczOTE4OTUzMywicGF0aCI6Ii81MjAxNjgzMi8zMzU3OTI1NDEtZjljNTU4YWUtZmM1ZC00OGFmLTkyMzgtZTczNTk5NjMwNjIzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMTAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjEwVDEyMTIxM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTk0NzQ0ZDBjZDZkN2I0MzA2ZGJhNjdjOTM3MGRiMmY1M2EyNDE3MzMzM2EzNWZjNDUwZWQwNzRjNTQzMjQ1OGQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.0qIA5OXSyAX6gyFU7DGVpgW5JxKVgzVjNgSLmzJKwnk',
      description: 'Valkey is a password manager that stores your passwords securely.',
      currentVersion: '1.0.2',
      versions: ['1.0.0', '1.0.1', '1.0.2'],
      tags: ['security', 'passwords'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
    },
    {
      name: 'MongoDB',
      id: v7(),
      iconUrl: 'https://cdn4.iconfinder.com/data/icons/logos-3/512/mongodb-2-512.png',
      description: 'MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need.',
      currentVersion: '8.1.3',
      versions: ['7.16.0', '8.1.1', '8.1.2', '8.1.3'],
      tags: ['database', 'scalability'],

      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
    },
    {
      name: 'PostGreSQL',
      id: v7(),
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
    },
    {
      name: 'RabbitMQ',
      id: v7(),
      iconUrl: 'https://www.rabbitmq.com/assets/files/rabbitmq-logo-with-name-258baa7f7ef3862e8f0dfa09cb760f68.svg',
      description: 'RabbitMQ is the most widely deployed open source message broker.',
      currentVersion: '12.0.0',
      versions: ['12.0.0', '11.1.0', '11.0.1'],
      tags: ['message broker', 'scalability'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
    },
    {
      name: 'External Secrets Operator',
      id: v7(),
      iconUrl: 'https://github.com/external-secrets/external-secrets/raw/refs/heads/main/assets/eso-round-logo.svg',
      description: 'The External Secrets Operator is a Kubernetes operator that manages the lifecycle of external secrets.',
      currentVersion: '0.5.0',
      versions: ['0.5.0', '0.4.0', '0.3.0'],
      tags: ['kubernetes', 'secrets'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
    },
    {
      name: 'Jaeger',
      id: v7(),
      iconUrl: 'https://raw.githubusercontent.com/jaegertracing/artwork/refs/heads/master/SVG/Jaeger_Logo_Final_PANTONE.svg',
      description: 'Jaeger, a Distributed Tracing System.',
      currentVersion: '2.3.0',
      versions: ['2.3.0', '2.2.0', '2.1.0'],
      tags: ['tracing', 'scalability'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
    },
    {
      name: 'Redis',
      id: v7(),
      iconUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6b/Redis_Logo.svg',
      description: 'Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker.',
      currentVersion: '6.2.1',
      versions: ['6.2.1', '6.2.0', '6.1.0'],
      tags: ['database', 'scalability'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
    },
  ];

  getApps(): Observable<App[]> {
    return of(this.apps);
  }
}
