import type { ConfigEntry, DiagramNodeData } from '../types';

function renderEntries(entries: ConfigEntry[], depth: number): React.ReactNode {
  return entries.map((entry, i) => (
    <div key={i}>
      <div style={{ paddingLeft: depth * 8 }}>
        <span className="text-blue-600 font-semibold">{entry.key}</span>
        {entry.value && <>: <span className="text-gray-700">{entry.value}</span></>}
      </div>
      {entry.children && entry.children.length > 0 && renderEntries(entry.children, depth + 1)}
    </div>
  ));
}

type Props = {
  data: DiagramNodeData;
};

export function ConfigAnnotation({ data }: Props) {
  const hasText = !!data.configText;
  const hasEntries = !!(data.configEntries && data.configEntries.length > 0);

  if (!hasText && !hasEntries) return null;

  return (
    <div className="config-annotation hidden absolute top-full left-1/2 -translate-x-1/2 mt-1 z-20 min-w-[120px] max-w-[220px] bg-white border border-gray-300 rounded-md shadow-sm px-2 py-1.5 text-left pointer-events-none">
      {hasText && (
        <pre className="whitespace-pre-wrap font-mono text-[9px] text-gray-600 leading-snug">
          {data.configText}
        </pre>
      )}
      {hasText && hasEntries && <hr className="border-gray-200 my-1" />}
      {hasEntries && (
        <div className="text-[9px] leading-snug">
          {renderEntries(data.configEntries!, 0)}
        </div>
      )}
    </div>
  );
}
