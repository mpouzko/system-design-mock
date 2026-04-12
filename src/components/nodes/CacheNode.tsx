import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { useState, useRef, useEffect } from 'react';

export function CacheNode({ id, data, selected }: NodeProps<DiagramNode>) {
  const updateNodeLabel = useDiagramStore((s) => s.updateNodeLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div
      className={`px-5 py-3 rounded-xl border-2 border-dashed bg-white shadow-sm w-[120px] text-center
        ${selected ? 'border-red-500 shadow-md' : 'border-red-300'}`}
      onDoubleClick={() => setEditing(true)}
    >
      <Handle type="source" id="top" position={Position.Top} className="!bg-red-400 !w-4 !h-4" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-red-400 !w-4 !h-4" />

      {editing ? (
        <input
          ref={inputRef}
          className="w-full text-center text-sm font-medium bg-transparent outline-none border-b border-red-300"
          value={data.label}
          onChange={(e) => updateNodeLabel(id, e.target.value)}
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
        />
      ) : (
        <div className="text-sm font-medium text-gray-700">{data.label}</div>
      )}

      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-red-400 !w-4 !h-4" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-red-400 !w-4 !h-4" />
    </div>
  );
}
