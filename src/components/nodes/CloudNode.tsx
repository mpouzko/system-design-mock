import { Handle, Position, NodeResizer, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { CogButton } from '../CogButton';
import { TechButton } from '../TechButton';
import { TechLabel } from '../TechLabel';
import { useState, useRef, useEffect } from 'react';

export function CloudNode({ id, data, selected }: NodeProps<DiagramNode>) {
  const updateNodeLabel = useDiagramStore((s) => s.updateNodeLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div
      className={`relative w-full h-full min-w-[80px] text-center ${selected ? 'drop-shadow-md' : 'drop-shadow-sm'}`}
      onDoubleClick={() => setEditing(true)}
    >
      <NodeResizer minWidth={80} minHeight={40} isVisible={!!selected} lineClassName="!border-sky-400" handleClassName="!bg-sky-400 !w-2 !h-2 !border-white" />
      <Handle type="source" id="top" position={Position.Top} className="!bg-sky-400 !w-4 !h-4" />
      <CogButton nodeId={id} data={data} />
      <TechButton nodeId={id} data={data} nodeType="cloud" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-sky-400 !w-4 !h-4" />

      <svg viewBox="0 0 140 80" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 65 C10 65 5 50 15 40 C5 25 20 10 40 15 C50 0 80 0 90 15 C110 5 135 15 130 35 C145 45 135 65 115 65 Z"
          fill="white" stroke={selected ? '#38bdf8' : '#7dd3fc'} strokeWidth="1.5" />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
        <TechLabel data={data} nodeType="cloud" />
        {editing ? (
          <input
            ref={inputRef}
            className="w-24 text-center text-base font-medium bg-transparent outline-none border-b border-sky-400"
            value={data.label}
            onChange={(e) => updateNodeLabel(id, e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
          />
        ) : (
          <div className="text-base font-medium text-gray-700">{data.label}</div>
        )}
        </div>

      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-sky-400 !w-4 !h-4" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-sky-400 !w-4 !h-4" />
    </div>
  );
}
