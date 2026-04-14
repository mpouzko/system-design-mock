import type { NodeTypes } from '@xyflow/react';
import { ServiceNode } from './ServiceNode';
import { DatabaseNode } from './DatabaseNode';
import { QueueNode } from './QueueNode';
import { LoadBalancerNode } from './LoadBalancerNode';
import { UserNode } from './UserNode';
import { CloudNode } from './CloudNode';
import { CacheNode } from './CacheNode';
import { EnvironmentNode } from './EnvironmentNode';
import { TextNode } from './TextNode';
import { RectangleNode } from './RectangleNode';
import { ArrowNode } from './ArrowNode';
import { ImageNode } from './ImageNode';
import { EngineNode } from './EngineNode';

export const nodeTypes: NodeTypes = {
  service: ServiceNode,
  database: DatabaseNode,
  queue: QueueNode,
  loadBalancer: LoadBalancerNode,
  user: UserNode,
  cloud: CloudNode,
  cache: CacheNode,
  environment: EnvironmentNode,
  text: TextNode,
  rectangle: RectangleNode,
  arrow: ArrowNode,
  image: ImageNode,
  engine: EngineNode,
};
