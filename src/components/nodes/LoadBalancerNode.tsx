import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { useState, useRef, useEffect } from 'react';

export function LoadBalancerNode({ id, data, selected }: NodeProps<DiagramNode>) {
  const updateNodeLabel = useDiagramStore((s) => s.updateNodeLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div
      className={`relative min-w-[100px] text-center ${selected ? 'drop-shadow-md' : 'drop-shadow-sm'}`}
      onDoubleClick={() => setEditing(true)}
    >
      <Handle type="target" position={Position.Top} className="!bg-purple-500 !w-2.5 !h-2.5" />
      <Handle type="target" position={Position.Left} className="!bg-purple-500 !w-2.5 !h-2.5" />

      <svg viewBox="0 0 100 80" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,2 98,40 50,78 2,40"
          fill="white" stroke={selected ? '#a855f7' : '#c4b5fd'} strokeWidth="2.5" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        {editing ? (
          <input
            ref={inputRef}
            className="w-16 text-center text-xs font-medium bg-transparent outline-none border-b border-purple-400"
            value={data.label}
            onChange={(e) => updateNodeLabel(id, e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
          />
        ) : (
          <div className="text-xs font-medium text-gray-700">{data.label}</div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-purple-500 !w-2.5 !h-2.5" />
      <Handle type="source" position={Position.Right} className="!bg-purple-500 !w-2.5 !h-2.5" />
    </div>
  );
}
