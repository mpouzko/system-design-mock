import { toPng, toSvg } from 'html-to-image';
import type { DiagramNode, DiagramEdge } from '../types';

function getFlowElement(): HTMLElement {
  const el = document.querySelector('.react-flow') as HTMLElement;
  if (!el) throw new Error('Canvas not found');
  return el;
}

function download(dataUrl: string, filename: string) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function exportPng(name: string) {
  const el = getFlowElement();
  el.classList.add('export-mode');
  try {
    const dataUrl = await toPng(el, {
      backgroundColor: '#ffffff',
      quality: 1,
    });
    download(dataUrl, `${name}.png`);
  } finally {
    el.classList.remove('export-mode');
  }
}

export function exportJson(name: string, nodes: DiagramNode[], edges: DiagramEdge[]) {
  const json = JSON.stringify({ name, nodes, edges }, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  download(url, `${name}.json`);
  URL.revokeObjectURL(url);
}

export async function exportSvg(name: string) {
  const el = getFlowElement();
  el.classList.add('export-mode');
  try {
    const dataUrl = await toSvg(el, {
      backgroundColor: '#ffffff',
    });
    download(dataUrl, `${name}.svg`);
  } finally {
    el.classList.remove('export-mode');
  }
}
