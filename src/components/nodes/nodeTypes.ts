import type { NodeTypes } from '@xyflow/react';
import { ServiceNode } from './ServiceNode';
import { DatabaseNode } from './DatabaseNode';
import { QueueNode } from './QueueNode';
import { LoadBalancerNode } from './LoadBalancerNode';
import { UserNode } from './UserNode';
import { CloudNode } from './CloudNode';
import { CacheNode } from './CacheNode';
import { EnvironmentNode } from './EnvironmentNode';

export const nodeTypes: NodeTypes = {
  service: ServiceNode,
  database: DatabaseNode,
  queue: QueueNode,
  loadBalancer: LoadBalancerNode,
  user: UserNode,
  cloud: CloudNode,
  cache: CacheNode,
  environment: EnvironmentNode,
};
