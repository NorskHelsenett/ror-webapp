export interface Namespace {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    namespace: string;
    labels: {
      [key: string]: string;
    };
    annotations: {
      [key: string]: string;
    };
    creationTimestamp: string;
  };
}
