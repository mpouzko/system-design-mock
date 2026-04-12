import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { useState, useRef, useEffect } from 'react';

export function DatabaseNode({ id, data, selected }: NodeProps<DiagramNode>) {
  const updateNodeLabel = useDiagramStore((s) => s.updateNodeLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div
      className={`relative min-w-[110px] text-center ${selected ? 'drop-shadow-md' : 'drop-shadow-sm'}`}
      onDoubleClick={() => setEditing(true)}
    >
      <Handle type="target" position={Position.Top} className="!bg-green-500 !w-2.5 !h-2.5 !top-1" />
      <Handle type="target" position={Position.Left} className="!bg-green-500 !w-2.5 !h-2.5" />

      <svg viewBox="0 0 120 80" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="16" rx="55" ry="14"
          fill="white" stroke={selected ? '#22c55e' : '#86efac'} strokeWidth="2.5" />
        <path d="M5 16 v48 c0 7.7 24.6 14 55 14 s55-6.3 55-14 V16"
          fill="white" stroke={selected ? '#22c55e' : '#86efac'} strokeWidth="2.5" />
        <ellipse cx="60" cy="64" rx="55" ry="14"
          fill="none" stroke={selected ? '#22c55e' : '#86efac'} strokeWidth="2.5" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center pt-3">
        {editing ? (
          <input
            ref={inputRef}
            className="w-20 text-center text-sm font-medium bg-transparent outline-none border-b border-green-400"
            value={data.label}
            onChange={(e) => updateNodeLabel(id, e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
          />
        ) : (
          <div className="text-sm font-medium text-gray-700">{data.label}</div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-green-500 !w-2.5 !h-2.5 !bottom-1" />
      <Handle type="source" position={Position.Right} className="!bg-green-500 !w-2.5 !h-2.5" />
    </div>
  );
}
