import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { App, AppRegion } from '../models/app';

@Injectable({
  providedIn: 'root',
})
export class AppsService {
  private apps: App[] = [
    {
      name: 'Valkey',
      id: '0194f3c0-d77c-7bf8-a620-89bbad87c2c3',
      iconUrl: 'https://valkey.io/img/Valkey-logo.svg',
      description: 'Valkey is a password manager that stores your passwords securely.',
      currentVersion: '8.0.2',
      versions: ['8.0.2', '7.2.7'],
      tags: ['database'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://valkey.io/docs/',
      config: {
        containers: [
          {
            command: ['tail', '-f', '/dev/null'],
            image: 'bitnami/os-shell',
            name: 'mycontainer',
            volumeMounts: [
              {
                mountPath: '/mnt',
                name: 'valkeydata',
              },
            ],
          },
        ],
        restartPolicy: 'Never',
        volumes: [
          {
            name: 'valkeydata',
            persistentVolumeClaim: {
              claimName: 'valkey-data-new-valkey-primary-0',
            },
          },
        ],
      },
    },
    {
      name: 'MongoDB',
      id: '0194f3c0-d77c-7f56-bd59-e05689312e5d',
      iconUrl: 'https://cdn4.iconfinder.com/data/icons/logos-3/512/mongodb-2-512.png',
      description: 'MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need.',
      currentVersion: '8.0.3',
      versions: ['8.0.3', '7.0.15', '6.0.12'],
      tags: ['database'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://docs.mongodb.com/',
      config: {
        architecture: 'replication',
        auth: {
          usernames: ['user1', 'user2'],
          rootPassword: 'newRootPassword123',
          passwords: ['newUserPassword123', 'newUserPassword144'],
          databases: ['userdatabase', 'userdatabase2'],
        },
        metrics: {
          username: 'metricsuser',
          password: 'newMetricsPassword',
        },
        passwordUpdateJob: {
          enabled: true,
        },
      },
    },
    {
      name: 'PostGreSQL',
      id: '0194f3c0-d77c-77c4-b3e7-97b2d1efe10c',
      iconUrl: 'https://wiki.postgresql.org/images/a/a4/PostgreSQL_logo.3colors.svg',
      description:
        'PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.',
      currentVersion: '17.0',
      versions: ['17.0', '16.0', '15.1', '14.2'],
      tags: ['database'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: false,
      docUrl: 'https://www.postgresql.org/docs/',
      config: {
        architecture: 'replication',
        auth: {
          user: 'user',
          postgresPassword: 'newPostgresPassword123',
          password: 'newUserPassword123',
          replicationPassword: 'newReplicationPassword123',
        },
        passwordUpdateJob: {
          enabled: true,
        },
      },
    },
    {
      name: 'RabbitMQ',
      id: '0194f3c0-d77c-75bc-9865-b14ae93275a3',
      iconUrl: 'https://www.rabbitmq.com/assets/files/rabbitmq-logo-with-name-258baa7f7ef3862e8f0dfa09cb760f68.svg',
      description: 'RabbitMQ is the most widely deployed open source message broker.',
      currentVersion: '4.0.5',
      versions: ['4.0.5', '3.13.7', '3.12.14'],
      tags: ['message broker'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://www.rabbitmq.com/documentation.html',
      config: {
        auth: {
          password: 'CHANGEME',
        },
        extraSecrets: {
          'load-definition': {
            'load_definition.json':
              '{\n  "users": [\n    {\n      "name": "{{ .Values.auth.username }}",\n      "password": "{{ .Values.auth.password }}",\n      "tags": "administrator"\n    }\n  ],\n  "vhosts": [\n    {\n      "name": "/"\n    }\n  ]\n}\n',
          },
        },
        loadDefinition: {
          enabled: true,
          existingSecret: 'load-definition',
        },
        extraConfiguration: 'load_definitions = /app/load_definition.json\n',
      },
    },
    {
      name: 'External Secrets Operator',
      id: '0194f3c0-d77c-7b46-a172-01e6ec039d10',
      iconUrl: 'https://github.com/external-secrets/external-secrets/raw/refs/heads/main/assets/eso-round-logo.svg',
      description: 'The External Secrets Operator is a Kubernetes operator that manages the lifecycle of external secrets.',
      currentVersion: '0.14.1',
      versions: ['0.14.1', '0.3.0', '0.12.0'],
      tags: ['operator', 'secrets'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://external-secrets.io/',
      config: {
        prometheus: {
          enabled: true,
          service: {
            port: 8080,
          },
        },
        resources: {
          requests: {
            cpu: '10m',
            memory: '96Mi',
          },
          limits: {
            cpu: '100m',
            memory: '256Mi',
          },
        },
      },
    },
    {
      name: 'Jaeger',
      id: '0194f3c0-d77c-71f0-a181-4b5929c4a9ef',
      iconUrl: 'https://raw.githubusercontent.com/jaegertracing/artwork/refs/heads/master/SVG/Jaeger_Logo_Final_PANTONE.svg',
      description: 'Jaeger, a Distributed Tracing System.',
      currentVersion: '1.66.0',
      versions: ['1.66.0', '1.65.0', '1.64.0'],
      tags: ['tracing'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://www.jaegertracing.io/docs/',
      config: {
        storage: {
          type: 'elasticsearch',
          elasticsearch: {
            host: '<HOST>',
            port: '<PORT>',
            scheme: 'https',
            user: '<USER>',
            password: '<PASSWORD>',
          },
        },
        provisionDataStore: {
          cassandra: false,
          elasticsearch: false,
        },
        query: {
          cmdlineParams: {
            'es.tls.ca': '/tls/es.pem',
          },
          extraConfigmapMounts: [
            {
              name: 'jaeger-tls',
              mountPath: '/tls',
              subPath: '',
              configMap: 'jaeger-tls',
              readOnly: true,
            },
          ],
        },
        collector: {
          cmdlineParams: {
            'es.tls.ca': '/tls/es.pem',
          },
          extraConfigmapMounts: [
            {
              name: 'jaeger-tls',
              mountPath: '/tls',
              subPath: '',
              configMap: 'jaeger-tls',
              readOnly: true,
            },
          ],
        },
        spark: {
          enabled: true,
          cmdlineParams: {
            'java.opts': '-Djavax.net.ssl.trustStore=/tls/trust.store -Djavax.net.ssl.trustStorePassword=changeit',
          },
          extraConfigmapMounts: [
            {
              name: 'jaeger-tls',
              mountPath: '/tls',
              subPath: '',
              configMap: 'jaeger-tls',
              readOnly: true,
            },
          ],
        },
      },
    },
    {
      name: 'Redis',
      id: '0194f3c0-d77c-7815-9087-3ed85fe40486',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6b/Redis_Logo.svg',
      description: 'Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker.',
      currentVersion: '7.4.0',
      versions: ['7.4.0.2.1', '6.2.0', '6.1.0'],
      tags: ['database'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://redis.io/documentation',
      config: {
        containers: [
          {
            command: ['tail', '-f', '/dev/null'],
            image: 'bitnami/minideb',
            name: 'mycontainer',
            volumeMounts: [
              {
                mountPath: '/mnt',
                name: 'redisdata',
              },
            ],
          },
        ],
        restartPolicy: 'Never',
        volumes: [
          {
            name: 'redisdata',
            persistentVolumeClaim: {
              claimName: 'redis-data-new-redis-master-0',
            },
          },
        ],
      },
    },
    {
      name: 'Trident',
      id: '0194f5d3-aea0-7d23-b2b2-afa3148d5e64',
      iconUrl: 'https://raw.githubusercontent.com/NetApp/trident/master/logo/trident.png',
      description: 'Trident is a dynamic storage provisioner with a fully automated storage orchestration engine.',
      currentVersion: '21.07',
      versions: ['21.07', '21.04', '20.10'],
      tags: ['storage'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://netapp-trident.readthedocs.io/en/latest/',
      config: {
        nodeSelector: {},
        podAnnotations: {},
        deploymentAnnotations: {},
        tolerations: [],
        affinity: {
          nodeAffinity: {
            requiredDuringSchedulingIgnoredDuringExecution: {
              nodeSelectorTerms: [
                {
                  matchExpressions: [
                    {
                      key: 'kubernetes.io/arch',
                      operator: 'In',
                      values: ['arm64', 'amd64'],
                    },
                    {
                      key: 'kubernetes.io/os',
                      operator: 'In',
                      values: ['linux'],
                    },
                  ],
                },
              ],
            },
          },
        },
        imageRegistry: '',
        imagePullPolicy: 'IfNotPresent',
        imagePullSecrets: [],
        kubeletDir: '',
        operatorDebug: true,
        operatorImage: '',
        operatorImageTag: '',
        tridentIPv6: false,
        tridentK8sTimeout: 0,
        tridentHttpRequestTimeout: '90s',
        tridentSilenceAutosupport: false,
        tridentAutosupportImage: '',
        tridentAutosupportImageTag: '24.06',
        tridentAutosupportProxy: '',
        tridentAutosupportInsecure: false,
        tridentLogFormat: 'text',
        tridentDisableAuditLog: true,
        tridentDebug: false,
        tridentLogWorkflows: '',
        tridentLogLayers: '',
        tridentImage: '',
        tridentImageTag: '',
        tridentEnableNodePrep: false,
        tridentSkipK8sVersionCheck: false,
        tridentProbePort: '',
        windows: false,
        enableForceDetach: false,
        cloudProvider: '',
        cloudIdentity: '',
        enableACP: false,
        acpImage: '',
        iscsiSelfHealingInterval: '5m0s',
        iscsiSelfHealingWaitTime: '7m0s',
        configuratorReconcileInterval: '30m0s',
        forceInstallRancherClusterRoles: false,
        anfConfigurator: {
          enabled: false,
          virtualNetwork: '',
          subnet: '',
          subscriptionID: '',
          tenantID: '',
          location: '',
          clientCredentials: '',
          capacityPools: [],
          netappAccounts: [],
          resourceGroups: [],
          customerEncryptionKeys: {},
        },
        ontapConfigurator: {
          enabled: false,
          svms: [
            {
              fsxnID: '',
              svmName: '',
              protocols: [],
              authType: '',
            },
          ],
        },
      },
    },
    {
      name: 'Ceph',
      id: '0194f5d3-aea0-74b6-918f-ebceec495e2e',
      iconUrl: 'https://ceph.io/assets/bitmaps/Ceph_Logo_Stacked_RGB_120411_fa.png',
      description: 'Ceph is a distributed object store and file system designed to provide excellent performance, reliability and scalability.',
      currentVersion: '16.2.6',
      versions: ['16.2.6', '16.2.5', '16.2.4'],
      tags: ['storage'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://docs.ceph.com/en/latest/',
      config: {
        encryptionKMSConfig: {
          encryptionKMSType: 'metadata',
          secretName: 'cephfs-encryption-passphrase',
          secretNamespace: 'my-namespace',
        },
        storageClass: {
          encrypted: true,
          encryptionKMSID: 'kubernetes',
        },
      },
    },
    {
      name: 'HashiCorp Vault',
      id: '0194f5d3-aea0-7346-a5ef-1d6614bba0bc',
      iconUrl: 'https://images.seeklogo.com/logo-png/48/1/hashicorp-vault-logo-png_seeklogo-487532.png',
      description:
        'HashiCorp Vault secures, stores, and tightly controls access to tokens, passwords, certificates, API keys, and other secrets in modern computing.',
      currentVersion: '1.8.4',
      versions: ['1.8.4', '1.8.3', '1.8.2'],
      tags: ['security'],
      price: 0,
      regions: [AppRegion.Trondheim, AppRegion.Oslo],
      status: 'ready',
      resposible: 'NDL',
      support: true,
      docUrl: 'https://learn.hashicorp.com/tutorials/vault/getting-started-install',
      config: {
        vault: {
          config: {
            storage: {
              s3: {
                access_key: 'AWS-ACCESS-KEY',
                secret_key: 'AWS-SECRET-KEY',
                bucket: 'AWS-BUCKET',
                region: 'AWS-REGION',
              },
            },
          },
        },
      },
    },
  ];

  getApps(): Observable<App[]> {
    return of(this.apps);
  }

  getAppById(id: string): Observable<App | undefined> {
    return of(this.apps?.find((app: App) => app?.id?.toString() === id));
  }

  getAppByName(name: string): Observable<App[] | undefined> {
    return of(this.apps?.filter((app: App) => app?.name === name));
  }
}
