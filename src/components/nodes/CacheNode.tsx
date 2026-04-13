import { Handle, Position, NodeResizer, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { CogButton } from '../CogButton';
import { TechButton } from '../TechButton';
import { TechLabel } from '../TechLabel';
import { useState, useRef, useEffect } from 'react';

export const config = {
  title: 'Cache',
  strokeColor: '#fca5a5',
  selectedStrokeColor: '#ef4444',
  strokeWidth: 1,
  size: { minWidth: 120, minHeight: 50 },
};

export function CacheNode({ id, data, selected }: NodeProps<DiagramNode>) {
  const updateNodeLabel = useDiagramStore((s) => s.updateNodeLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div
      style={{ borderColor: selected ? config.selectedStrokeColor : config.strokeColor, borderWidth: config.strokeWidth }}
      className={`px-5 py-3 rounded-xl border border-dashed bg-white shadow-sm w-full h-full text-center
        ${selected ? 'shadow-md' : ''}`}
      onDoubleClick={() => setEditing(true)}
    >
      <NodeResizer minWidth={config.size.minWidth} minHeight={config.size.minHeight} isVisible={!!selected} lineClassName="!border-red-400" handleClassName="!bg-red-400 !w-2 !h-2 !border-white" />
      <Handle type="source" id="top" position={Position.Top} className="!bg-red-400 !w-4 !h-4" />
      <CogButton nodeId={id} data={data} />
      <TechButton nodeId={id} data={data} nodeType="cache" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-red-400 !w-4 !h-4" />

      <TechLabel data={data} nodeType="cache" />
      {editing ? (
        <input
          ref={inputRef}
          className="w-full text-center text-base font-medium bg-transparent outline-none border-b border-red-300"
          value={data.label}
          onChange={(e) => updateNodeLabel(id, e.target.value)}
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
        />
      ) : (
        <div className="text-base font-medium text-gray-700">{data.label}</div>
      )}

      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-red-400 !w-4 !h-4" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-red-400 !w-4 !h-4" />
    </div>
  );
}
