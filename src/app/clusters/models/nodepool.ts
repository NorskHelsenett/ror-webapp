import { NodePool } from '@rork8s/ror-resources/models';

export enum NodePoolAction {
  Unknown = 0,
  Create = 1,
  Update = 2,
  Delete = 3,
}

export interface NodePoolChange {
  action: NodePoolAction;
  nodePool: NodePool;
  previousNodePool?: NodePool;
}
