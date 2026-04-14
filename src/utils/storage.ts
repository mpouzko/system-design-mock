import type { Diagram } from '../types';

const STORAGE_KEY = 'diagram_builder_diagrams';

function getAll(): Record<string, Diagram> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setAll(diagrams: Record<string, Diagram>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(diagrams));
}

export function saveDiagram(diagram: Diagram) {
  const all = getAll();
  const existing = all[diagram.id];
  all[diagram.id] = {
    ...diagram,
    createdAt: existing?.createdAt ?? diagram.createdAt,
    updatedAt: Date.now(),
  };
  setAll(all);
}

export function loadDiagram(id: string): Diagram | null {
  const all = getAll();
  return all[id] ?? null;
}

export function listDiagrams(): { id: string; name: string; updatedAt: number }[] {
  const all = getAll();
  return Object.values(all)
    .map(({ id, name, updatedAt }) => ({ id, name, updatedAt }))
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export function deleteDiagram(id: string) {
  const all = getAll();
  delete all[id];
  setAll(all);
}

const AUTOSAVE_KEY = 'diagram_builder_autosave';

export function autoSave(state: { nodes: unknown[]; edges: unknown[]; diagramId: string; diagramName: string }) {
  try {
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({
      nodes: state.nodes,
      edges: state.edges,
      diagramId: state.diagramId,
      diagramName: state.diagramName,
    }));
  } catch { /* quota exceeded — ignore */ }
}

export function loadAutoSave(): { nodes: unknown[]; edges: unknown[]; diagramId: string; diagramName: string } | null {
  try {
    const raw = localStorage.getItem(AUTOSAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
