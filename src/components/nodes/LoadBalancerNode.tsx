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
  title: 'Load Balancer',
  strokeColor: '#c4b5fd',
  selectedStrokeColor: '#a855f7',
  strokeWidth: 1.5,
  size: { minWidth: 160, minHeight: 100 },
};

export function LoadBalancerNode({ id, data, selected }: NodeProps<DiagramNode>) {
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
      <NodeResizer minWidth={config.size.minWidth} minHeight={config.size.minHeight} isVisible={!!selected} lineClassName="!border-purple-400" handleClassName="!bg-purple-500 !w-2 !h-2 !border-white" />
      <Handle type="source" id="top" position={Position.Top} className="!bg-purple-500 !w-4 !h-4" />
      <CogButton nodeId={id} data={data} />
      <TechButton nodeId={id} data={data} nodeType="loadBalancer" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-purple-500 !w-4 !h-4" />

      <svg viewBox="0 0 100 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,2 98,40 50,78 2,40"
          fill="white" stroke={selected ? config.selectedStrokeColor : config.strokeColor} strokeWidth={config.strokeWidth} />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <TechLabel data={data} nodeType="loadBalancer" />
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

      <AddChildButton nodeId={id} />
      <ChildrenList nodeId={id} children={data.children} />
      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-purple-500 !w-4 !h-4" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-purple-500 !w-4 !h-4" />
    </div>
  );
}
