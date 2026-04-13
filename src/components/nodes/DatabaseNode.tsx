import { Handle, Position, NodeResizer, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { CogButton } from '../CogButton';
import { TechButton } from '../TechButton';
import { TechLabel } from '../TechLabel';
import { useState, useRef, useEffect } from 'react';

export const config = {
  title: 'Database',
  strokeColor: '#86efac',
  selectedStrokeColor: '#22c55e',
  strokeWidth: 1.5,
  size: { minWidth: 100, minHeight: 60 },
};

export function DatabaseNode({ id, data, selected }: NodeProps<DiagramNode>) {
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
      <NodeResizer minWidth={config.size.minWidth} minHeight={config.size.minHeight} isVisible={!!selected} lineClassName="!border-green-400" handleClassName="!bg-green-500 !w-2 !h-2 !border-white" />
      <Handle type="source" id="top" position={Position.Top} className="!bg-green-500 !w-4 !h-4 !top-1" />
      <CogButton nodeId={id} data={data} />
      <TechButton nodeId={id} data={data} nodeType="database" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-green-500 !w-4 !h-4" />

      <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="16" rx="55" ry="14"
          fill="white" stroke={selected ? config.selectedStrokeColor : config.strokeColor} strokeWidth={config.strokeWidth} />
        <path d="M5 16 v48 c0 7.7 24.6 14 55 14 s55-6.3 55-14 V16"
          fill="white" stroke={selected ? config.selectedStrokeColor : config.strokeColor} strokeWidth={config.strokeWidth} />
        <ellipse cx="60" cy="64" rx="55" ry="14"
          fill="none" stroke={selected ? config.selectedStrokeColor : config.strokeColor} strokeWidth={config.strokeWidth} />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pt-3">
        <TechLabel data={data} nodeType="database" />
        {editing ? (
          <input
            ref={inputRef}
            className="w-20 text-center text-base font-medium bg-transparent outline-none border-b border-green-400"
            value={data.label}
            onChange={(e) => updateNodeLabel(id, e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
          />
        ) : (
          <div className="text-base font-medium text-gray-700">{data.label}</div>
        )}
        </div>

      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-green-500 !w-4 !h-4 !bottom-1" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-green-500 !w-4 !h-4" />
    </div>
  );
}
