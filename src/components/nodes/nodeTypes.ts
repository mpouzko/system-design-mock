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
import { AINode } from './AINode';
import { BundlerNode } from './BundlerNode';
import { UIFrameworkNode } from './UIFrameworkNode';
import { ServerFrameworkNode } from './ServerFrameworkNode';
import { StateManagementNode } from './StateManagementNode';
import { UIToolkitNode } from './UIToolkitNode';
import { CSSNode } from './CSSNode';
import { ORMNode } from './ORMNode';
import { OtherSoftwareNode } from './OtherSoftwareNode';
import { TestingNode } from './TestingNode';

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
  ai: AINode,
  bundler: BundlerNode,
  uiFramework: UIFrameworkNode,
  serverFramework: ServerFrameworkNode,
  stateManagement: StateManagementNode,
  uiToolkit: UIToolkitNode,
  css: CSSNode,
  orm: ORMNode,
  otherSoftware: OtherSoftwareNode,
  testing: TestingNode,
};
