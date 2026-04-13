import { create } from 'zustand';
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type Connection,
} from '@xyflow/react';
import type { DiagramNode, DiagramEdge, Diagram, ConfigEntry } from '../types';
import { saveDiagram, loadDiagram, listDiagrams, deleteDiagram as removeDiagram } from '../utils/storage';

type DiagramState = {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  diagramId: string;
  diagramName: string;
  savedDiagrams: { id: string; name: string; updatedAt: number }[];

  onNodesChange: OnNodesChange<DiagramNode>;
  onEdgesChange: OnEdgesChange<DiagramEdge>;
  onConnect: OnConnect;

  addNode: (node: DiagramNode) => void;
  updateNodeLabel: (nodeId: string, label: string) => void;
  updateEdgeLabel: (edgeId: string, label: string) => void;
  updateNodeConfig: (nodeId: string, configText: string, configEntries: ConfigEntry[]) => void;
  updateNodeTech: (nodeId: string, techId: string, techCustom?: string) => void;
  deleteSelected: () => void;

  setDiagramName: (name: string) => void;
  save: () => void;
  load: (id: string) => void;
  newDiagram: () => void;
  deleteDiagram: (id: string) => void;
  refreshSavedList: () => void;
};

function generateId() {
  return `diagram_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export const useDiagramStore = create<DiagramState>((set, get) => ({
  nodes: [],
  edges: [],
  diagramId: generateId(),
  diagramName: 'Untitled Diagram',
  savedDiagrams: listDiagrams(),

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection: Connection) => {
    const newEdge: DiagramEdge = {
      ...connection,
      id: `edge_${Date.now()}`,
      type: 'custom',
      data: { label: '' },
    };
    set({ edges: addEdge(newEdge, get().edges) });
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },

  updateNodeLabel: (nodeId, label) => {
    set({
      nodes: get().nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, label } } : n
      ),
    });
  },

  updateEdgeLabel: (edgeId, label) => {
    set({
      edges: get().edges.map((e) =>
        e.id === edgeId ? { ...e, data: { ...e.data, label } } : e
      ),
    });
  },

  updateNodeConfig: (nodeId, configText, configEntries) => {
    set({
      nodes: get().nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, configText, configEntries } } : n
      ),
    });
  },

  updateNodeTech: (nodeId, techId, techCustom) => {
    set({
      nodes: get().nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, techId, techCustom } } : n
      ),
    });
  },

  deleteSelected: () => {
    set({
      nodes: get().nodes.filter((n) => !n.selected),
      edges: get().edges.filter((e) => !e.selected),
    });
  },

  setDiagramName: (name) => {
    set({ diagramName: name });
  },

  save: () => {
    const { nodes, edges, diagramId, diagramName } = get();
    const diagram: Diagram = {
      id: diagramId,
      name: diagramName,
      nodes,
      edges,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    saveDiagram(diagram);
    set({ savedDiagrams: listDiagrams() });
  },

  load: (id) => {
    const diagram = loadDiagram(id);
    if (diagram) {
      set({
        nodes: diagram.nodes,
        edges: diagram.edges,
        diagramId: diagram.id,
        diagramName: diagram.name,
      });
    }
  },

  newDiagram: () => {
    set({
      nodes: [],
      edges: [],
      diagramId: generateId(),
      diagramName: 'Untitled Diagram',
    });
  },

  deleteDiagram: (id) => {
    removeDiagram(id);
    const { diagramId } = get();
    if (diagramId === id) {
      get().newDiagram();
    }
    set({ savedDiagrams: listDiagrams() });
  },

  refreshSavedList: () => {
    set({ savedDiagrams: listDiagrams() });
  },
}));
