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
import type { DiagramNode, DiagramEdge, Diagram, ConfigEntry, NodeChild } from '../types';
import { saveDiagram, loadDiagram, listDiagrams, deleteDiagram as removeDiagram, autoSave, loadAutoSave } from '../utils/storage';
import { decodeShareUrl } from '../utils/shareUrl';

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
  addEdgeDirect: (edge: DiagramEdge) => void;
  updateNodeLabel: (nodeId: string, label: string) => void;
  updateEdgeLabel: (edgeId: string, label: string) => void;
  updateNodeConfig: (nodeId: string, configText: string, configEntries: ConfigEntry[]) => void;
  updateNodeTech: (nodeId: string, techId: string, techCustom?: string) => void;
  addNodeChild: (nodeId: string, child: NodeChild) => void;
  removeNodeChild: (nodeId: string, childId: string) => void;
  addArrowPoint: (afterNodeId: string) => void;
  removeArrowPoint: (nodeId: string) => void;
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

// Shared URL takes priority over auto-save
const shared = decodeShareUrl(window.location.hash);
if (shared) {
  // Clear the hash so refreshing doesn't re-import
  history.replaceState(null, '', window.location.pathname + window.location.search);
}
const restored = shared
  ? { nodes: shared.nodes, edges: shared.edges, diagramId: null, diagramName: shared.name }
  : loadAutoSave();

export const useDiagramStore = create<DiagramState>((set, get) => ({
  nodes: (restored?.nodes as DiagramNode[]) ?? [],
  edges: (restored?.edges as DiagramEdge[]) ?? [],
  diagramId: restored?.diagramId || generateId(),
  diagramName: restored?.diagramName ?? 'Untitled Diagram',
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

  addEdgeDirect: (edge) => {
    set({ edges: [...get().edges, edge] });
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

  addNodeChild: (nodeId, child) => {
    set({
      nodes: get().nodes.map((n) =>
        n.id === nodeId
          ? { ...n, data: { ...n.data, children: [...(n.data.children ?? []), child] } }
          : n
      ),
    });
  },

  removeNodeChild: (nodeId, childId) => {
    set({
      nodes: get().nodes.map((n) =>
        n.id === nodeId
          ? { ...n, data: { ...n.data, children: (n.data.children ?? []).filter((c) => c.id !== childId) } }
          : n
      ),
    });
  },

  addArrowPoint: (afterNodeId) => {
    const { nodes, edges } = get();
    const afterNode = nodes.find((n) => n.id === afterNodeId);
    if (!afterNode || afterNode.type !== 'arrow') return;

    // Find outgoing edge from this node to another arrow node
    const outEdge = edges.find(
      (e) => e.source === afterNodeId && nodes.find((n) => n.id === e.target)?.type === 'arrow'
    );
    if (!outEdge) return;

    const targetNode = nodes.find((n) => n.id === outEdge.target);
    if (!targetNode) return;

    const ts = Date.now();
    const newNode: DiagramNode = {
      id: `node_${ts}_mid`,
      type: 'arrow',
      position: {
        x: (afterNode.position.x + targetNode.position.x) / 2,
        y: (afterNode.position.y + targetNode.position.y) / 2,
      },
      data: { label: '', arrowGroupId: afterNode.data.arrowGroupId },
    };

    const edge1: DiagramEdge = {
      id: `edge_${ts}_a`,
      source: afterNodeId,
      sourceHandle: 'center',
      target: newNode.id,
      targetHandle: 'center-left',
      type: 'custom',
      data: { label: '' },
    };
    const edge2: DiagramEdge = {
      id: `edge_${ts}_b`,
      source: newNode.id,
      sourceHandle: 'center',
      target: outEdge.target,
      targetHandle: outEdge.targetHandle,
      type: 'custom',
      data: { label: '' },
    };

    set({
      nodes: [...nodes, newNode],
      edges: [...edges.filter((e) => e.id !== outEdge.id), edge1, edge2],
    });
  },

  removeArrowPoint: (nodeId) => {
    const { nodes, edges } = get();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node || node.type !== 'arrow') return;

    // Find incoming and outgoing arrow edges
    const inEdge = edges.find(
      (e) => e.target === nodeId && nodes.find((n) => n.id === e.source)?.type === 'arrow'
    );
    const outEdge = edges.find(
      (e) => e.source === nodeId && nodes.find((n) => n.id === e.target)?.type === 'arrow'
    );
    if (!inEdge || !outEdge) return;

    const bridgeEdge: DiagramEdge = {
      id: `edge_${Date.now()}`,
      source: inEdge.source,
      sourceHandle: inEdge.sourceHandle,
      target: outEdge.target,
      targetHandle: outEdge.targetHandle,
      type: 'custom',
      data: { label: '' },
    };

    set({
      nodes: nodes.filter((n) => n.id !== nodeId),
      edges: [...edges.filter((e) => e.id !== inEdge.id && e.id !== outEdge.id), bridgeEdge],
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

// Debounced auto-save: persist current diagram to localStorage on every change
let autoSaveTimer: ReturnType<typeof setTimeout>;
useDiagramStore.subscribe((state) => {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    autoSave({
      nodes: state.nodes,
      edges: state.edges,
      diagramId: state.diagramId,
      diagramName: state.diagramName,
    });
  }, 500);
});
