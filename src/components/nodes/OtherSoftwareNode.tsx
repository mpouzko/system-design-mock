import { Handle, Position, NodeResizer, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { CogButton } from '../CogButton';
import { AddChildButton } from '../AddChildButton';
import { ChildrenList } from '../ChildrenList';
import { useState, useRef, useEffect } from 'react';
import { svgNodeClasses } from './nodeStyles';

export const config = {
  title: 'Other',
  strokeColor: '#9ca3af',        // gray-400
  selectedStrokeColor: '#4b5563', // gray-600
  strokeWidth: 1.5,
  size: { minWidth: 100, minHeight: 80 },
};

export function OtherSoftwareNode({ id, data, selected }: NodeProps<DiagramNode>) {
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
      <NodeResizer minWidth={config.size.minWidth} minHeight={config.size.minHeight} isVisible={!!selected} lineClassName="!border-gray-400" handleClassName="!bg-gray-500 !w-2 !h-2 !border-white" />
      <Handle type="source" id="top" position={Position.Top} className="!bg-gray-500 !w-4 !h-4" />
      <CogButton nodeId={id} data={data} />
      <Handle type="source" id="left" position={Position.Left} className="!bg-gray-500 !w-4 !h-4" />

      <svg viewBox="0 0 120 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="112" height="92" rx="10" fill="white"
          stroke={selected ? config.selectedStrokeColor : config.strokeColor} strokeWidth={config.strokeWidth} />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {editing ? (
          <input
            ref={inputRef}
            className="w-20 text-center text-base font-medium bg-transparent outline-none border-b border-gray-400"
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
      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-gray-500 !w-4 !h-4" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-gray-500 !w-4 !h-4" />
    </div>
  );
}
