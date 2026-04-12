import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { useState, useRef, useEffect } from 'react';

export function QueueNode({ id, data, selected }: NodeProps<DiagramNode>) {
  const updateNodeLabel = useDiagramStore((s) => s.updateNodeLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div
      className={`relative w-[120px] text-center ${selected ? 'drop-shadow-md' : 'drop-shadow-sm'}`}
      onDoubleClick={() => setEditing(true)}
    >
      <Handle type="source" id="top" position={Position.Top} className="!bg-orange-400 !w-4 !h-4" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-orange-400 !w-4 !h-4" />

      <svg viewBox="0 0 140 50" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 2 L125 2 L135 25 L125 48 L15 48 L25 25 Z"
          fill="white" stroke={selected ? '#f97316' : '#fdba74'} strokeWidth="2.5" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        {editing ? (
          <input
            ref={inputRef}
            className="w-20 text-center text-sm font-medium bg-transparent outline-none border-b border-orange-400"
            value={data.label}
            onChange={(e) => updateNodeLabel(id, e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
          />
        ) : (
          <div className="text-sm font-medium text-gray-700">{data.label}</div>
        )}
      </div>

      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-orange-400 !w-4 !h-4" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-orange-400 !w-4 !h-4" />
    </div>
  );
}
