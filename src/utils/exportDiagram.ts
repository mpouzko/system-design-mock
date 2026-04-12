import { toPng, toSvg } from 'html-to-image';

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
  const dataUrl = await toPng(el, {
    backgroundColor: '#ffffff',
    quality: 1,
  });
  download(dataUrl, `${name}.png`);
}

export async function exportSvg(name: string) {
  const el = getFlowElement();
  const dataUrl = await toSvg(el, {
    backgroundColor: '#ffffff',
  });
  download(dataUrl, `${name}.svg`);
}
