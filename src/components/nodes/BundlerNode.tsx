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
  title: 'Bundler',
  strokeColor: '#f472b6',        // pink-400
  selectedStrokeColor: '#db2777', // pink-600
  strokeWidth: 1.5,
  size: { minWidth: 100, minHeight: 80 },
};

export function BundlerNode({ id, data, selected }: NodeProps<DiagramNode>) {
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
      <NodeResizer minWidth={config.size.minWidth} minHeight={config.size.minHeight} isVisible={!!selected} lineClassName="!border-pink-400" handleClassName="!bg-pink-500 !w-2 !h-2 !border-white" />
      <Handle type="source" id="top" position={Position.Top} className="!bg-pink-500 !w-4 !h-4" />
      <CogButton nodeId={id} data={data} />
      <TechButton nodeId={id} data={data} nodeType="bundler" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-pink-500 !w-4 !h-4" />

      <svg viewBox="0 0 120 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,20 L60,2 L110,20 L110,80 L60,98 L10,80 Z"
          fill="white" stroke={selected ? config.selectedStrokeColor : config.strokeColor} strokeWidth={config.strokeWidth} strokeLinejoin="round" />
        <line x1="60" y1="2" x2="60" y2="98" stroke={selected ? config.selectedStrokeColor : config.strokeColor} strokeWidth={config.strokeWidth * 0.6} opacity="0.3" />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <TechLabel data={data} nodeType="bundler" />
        {editing ? (
          <input
            ref={inputRef}
            className="w-20 text-center text-base font-medium bg-transparent outline-none border-b border-pink-400"
            value={data.label}
            onChange={(e) => updateNodeLabel(id, e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
          />
        ) : (
          <div className="text-base font-medium text-gray-700">{data.label}</div>
        )}
      </div>

      <AddChildButton nodeId={id} />
      <ChildrenList nodeId={id} children={data.children} />
      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-pink-500 !w-4 !h-4" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-pink-500 !w-4 !h-4" />
    </div>
  );
}
