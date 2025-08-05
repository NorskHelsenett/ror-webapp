import { KubernetesClusterNodePool } from '@rork8s/ror-resources/models';
import { NodePool } from '../../core/models/clusterOrder';

export enum NodePoolAction {
  Unknown = 0,
  Create = 1,
  Update = 2,
  Delete = 3,
}

export interface NodePoolChange {
  action: NodePoolAction;
  nodePool: KubernetesClusterNodePool;
  previousNodePool?: KubernetesClusterNodePool;
}
