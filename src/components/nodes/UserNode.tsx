import { Handle, Position, NodeResizer, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { CogButton } from '../CogButton';
import { AddChildButton } from '../AddChildButton';
import { ChildrenList } from '../ChildrenList';
import { TechButton } from '../TechButton';
import { TechLabel } from '../TechLabel';
import { useState, useRef, useEffect } from 'react';
import { svgNodeClasses } from './nodeStyles';

export const config = {
  title: 'User / Client',
  strokeColor: '#d1d5db',
  selectedStrokeColor: '#6b7280',
  strokeWidth: 1.5,
  size: { minWidth: 80, minHeight: 100 },
};

export function UserNode({ id, data, selected }: NodeProps<DiagramNode>) {
  const updateNodeLabel = useDiagramStore((s) => s.updateNodeLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div
      className={svgNodeClasses(selected)}
      onDoubleClick={() => setEditing(true)}
    >
      <NodeResizer minWidth={config.size.minWidth} minHeight={config.size.minHeight} isVisible={!!selected} lineClassName="!border-gray-400" handleClassName="!bg-gray-400 !w-2 !h-2 !border-white" />
      <Handle type="source" id="top" position={Position.Top} className="!bg-gray-400 !w-4 !h-4" />
      <CogButton nodeId={id} data={data} />
      <TechButton nodeId={id} data={data} nodeType="user" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-gray-400 !w-4 !h-4" />

      <svg viewBox="0 0 60 70" className="w-14 h-auto" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="18" r="14"
          fill="white" stroke={selected ? config.selectedStrokeColor : config.strokeColor} strokeWidth={config.strokeWidth} />
        <path d="M4 65 C4 45 56 45 56 65"
          fill="white" stroke={selected ? config.selectedStrokeColor : config.strokeColor} strokeWidth={config.strokeWidth} />
      </svg>

      <TechLabel data={data} nodeType="user" />
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

      <AddChildButton nodeId={id} />
      <ChildrenList nodeId={id} children={data.children} />
      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-gray-400 !w-4 !h-4" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-gray-400 !w-4 !h-4" />
    </div>
  );
}
