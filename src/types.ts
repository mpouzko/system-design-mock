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
  | 'arrow'
  | 'image'
  | 'engine'
  | 'ai'
  | 'bundler'
  | 'uiFramework'
  | 'serverFramework'
  | 'stateManagement'
  | 'uiToolkit'
  | 'css'
  | 'orm'
  | 'otherSoftware';

export type ConfigEntry = { key: string; value: string; children?: ConfigEntry[] };
export type NodeChild = { id: string; name: string; config?: string };

export type DiagramNodeData = {
  label: string;
  configText?: string;
  configEntries?: ConfigEntry[];
  techId?: string;
  techCustom?: string;
  children?: NodeChild[];
  arrowGroupId?: string;
  imageDataUrl?: string;
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
