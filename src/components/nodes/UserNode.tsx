import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { useState, useRef, useEffect } from 'react';

export function UserNode({ id, data, selected }: NodeProps<DiagramNode>) {
  const updateNodeLabel = useDiagramStore((s) => s.updateNodeLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div
      className={`flex flex-col items-center w-[120px] text-center ${selected ? 'drop-shadow-md' : 'drop-shadow-sm'}`}
      onDoubleClick={() => setEditing(true)}
    >
      <Handle type="source" id="top" position={Position.Top} className="!bg-gray-400 !w-4 !h-4" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-gray-400 !w-4 !h-4" />

      <svg viewBox="0 0 60 70" className="w-14 h-auto" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="18" r="14"
          fill="white" stroke={selected ? '#6b7280' : '#d1d5db'} strokeWidth="2.5" />
        <path d="M4 65 C4 45 56 45 56 65"
          fill="white" stroke={selected ? '#6b7280' : '#d1d5db'} strokeWidth="2.5" />
      </svg>

      {editing ? (
        <input
          ref={inputRef}
          className="w-20 text-center text-xs font-medium bg-transparent outline-none border-b border-gray-400 mt-1"
          value={data.label}
          onChange={(e) => updateNodeLabel(id, e.target.value)}
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
        />
      ) : (
        <div className="text-xs font-medium text-gray-600 mt-1">{data.label}</div>
      )}

      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-gray-400 !w-4 !h-4" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-gray-400 !w-4 !h-4" />
    </div>
  );
}
