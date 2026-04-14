import LZString from 'lz-string';
import type { DiagramNode, DiagramEdge } from '../types';

type SharePayload = {
  name: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

export function encodeShareUrl(name: string, nodes: DiagramNode[], edges: DiagramEdge[]): string {
  const payload: SharePayload = { name, nodes, edges };
  const json = JSON.stringify(payload);
  const compressed = LZString.compressToEncodedURIComponent(json);
  return `${window.location.origin}${window.location.pathname}#share=${compressed}`;
}

export function decodeShareUrl(hash: string): SharePayload | null {
  if (!hash.startsWith('#share=')) return null;
  try {
    const compressed = hash.slice(7);
    const json = LZString.decompressFromEncodedURIComponent(compressed);
    if (!json) return null;
    return JSON.parse(json);
  } catch {
    return null;
  }
}
