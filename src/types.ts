import type { Node, Edge } from '@xyflow/react';

export type DiagramNodeType =
  | 'service'
  | 'database'
  | 'queue'
  | 'loadBalancer'
  | 'user'
  | 'cloud'
  | 'cache'
  | 'environment'
  | 'text'
  | 'rectangle'
  | 'arrow';

export type ConfigEntry = { key: string; value: string; children?: ConfigEntry[] };

export type DiagramNodeData = {
  label: string;
  configText?: string;
  configEntries?: ConfigEntry[];
  techId?: string;
  techCustom?: string;
  arrowGroupId?: string;
};

export type DiagramNode = Node<DiagramNodeData, DiagramNodeType>;
export type DiagramEdge = Edge & { data?: { label?: string } };

export type Diagram = {
  id: string;
  name: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  createdAt: number;
  updatedAt: number;
};
