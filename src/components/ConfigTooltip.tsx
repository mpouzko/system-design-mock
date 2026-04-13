import { createPortal } from 'react-dom';
import type { ConfigEntry, DiagramNodeData } from '../types';

type Props = {
  data: DiagramNodeData;
  anchorRef: React.RefObject<HTMLElement | null>;
};

function renderEntries(entries: ConfigEntry[], depth: number): React.ReactNode {
  return entries.map((entry, i) => (
    <div key={i}>
      <div style={{ paddingLeft: depth * 10 }}>
        <span className="text-blue-300">{entry.key}</span>
        {entry.value && <>: <span className="text-gray-200">{entry.value}</span></>}
      </div>
      {entry.children && entry.children.length > 0 && renderEntries(entry.children, depth + 1)}
    </div>
  ));
}

export function ConfigTooltip({ data, anchorRef }: Props) {
  const hasText = !!data.configText;
  const hasEntries = !!(data.configEntries && data.configEntries.length > 0);

  if (!hasText && !hasEntries) return null;
  if (!anchorRef.current) return null;

  const rect = anchorRef.current.getBoundingClientRect();

  return createPortal(
    <div
      className="fixed z-[9998] max-w-[250px] bg-gray-800 text-xs text-gray-100 rounded-lg shadow-lg px-3 py-2 pointer-events-none"
      style={{ top: rect.bottom + 6, left: rect.left + rect.width / 2, transform: 'translateX(-50%)' }}
    >
      {hasText && (
        <pre className="whitespace-pre-wrap font-mono text-[10px] text-gray-300 leading-relaxed">
          {data.configText}
        </pre>
      )}
      {hasText && hasEntries && <hr className="border-gray-600 my-1.5" />}
      {hasEntries && (
        <div className="text-[10px] leading-relaxed">
          {renderEntries(data.configEntries!, 0)}
        </div>
      )}
    </div>,
    document.body
  );
}
