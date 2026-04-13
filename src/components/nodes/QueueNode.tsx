import { Handle, Position, NodeResizer, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { CogButton } from '../CogButton';
import { TechButton } from '../TechButton';
import { TechLabel } from '../TechLabel';
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
      className={`relative w-full h-full min-w-[80px] text-center ${selected ? 'drop-shadow-md' : 'drop-shadow-sm'}`}
      onDoubleClick={() => setEditing(true)}
    >
      <NodeResizer minWidth={80} minHeight={40} isVisible={!!selected} lineClassName="!border-orange-400" handleClassName="!bg-orange-400 !w-2 !h-2 !border-white" />
      <Handle type="source" id="top" position={Position.Top} className="!bg-orange-400 !w-4 !h-4" />
      <CogButton nodeId={id} data={data} />
      <TechButton nodeId={id} data={data} nodeType="queue" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-orange-400 !w-4 !h-4" />

      <svg viewBox="0 0 140 50" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 2 L125 2 L135 25 L125 48 L15 48 L25 25 Z"
          fill="white" stroke={selected ? '#f97316' : '#fdba74'} strokeWidth="1.5" />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <TechLabel data={data} nodeType="queue" />
        {editing ? (
          <input
            ref={inputRef}
            className="w-20 text-center text-base font-medium bg-transparent outline-none border-b border-orange-400"
            value={data.label}
            onChange={(e) => updateNodeLabel(id, e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
          />
        ) : (
          <div className="text-base font-medium text-gray-700">{data.label}</div>
        )}
        </div>

      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-orange-400 !w-4 !h-4" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-orange-400 !w-4 !h-4" />
    </div>
  );
}
