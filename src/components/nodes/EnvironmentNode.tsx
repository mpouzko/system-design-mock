import { Handle, Position, NodeResizer, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { CogButton } from '../CogButton';
import { AddChildButton } from '../AddChildButton';
import { ChildrenList } from '../ChildrenList';
import { TechButton } from '../TechButton';
import { TechLabel } from '../TechLabel';
import { useState, useRef, useEffect } from 'react';
import { boxNodeClasses } from './nodeStyles';

export const config = {
  title: 'Environment',
  strokeColor: '#5eead4',
  selectedStrokeColor: '#14b8a6',
  strokeWidth: 1,
  size: { minWidth: 150, minHeight: 100 },
};

export function EnvironmentNode({ id, data, selected }: NodeProps<DiagramNode>) {
  const updateNodeLabel = useDiagramStore((s) => s.updateNodeLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div
      style={{ borderColor: selected ? config.selectedStrokeColor : config.strokeColor, borderWidth: config.strokeWidth }}
      className={`rounded-xl border border-dashed bg-teal-50/40 relative ${boxNodeClasses(selected)}`}
    >
      <NodeResizer minWidth={config.size.minWidth} minHeight={config.size.minHeight} isVisible={!!selected} lineClassName="!border-teal-400" handleClassName="!bg-teal-400 !w-2.5 !h-2.5 !border-white" />
      <Handle type="source" id="top" position={Position.Top} className="!bg-teal-400 !w-4 !h-4" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-teal-400 !w-4 !h-4" />
      <CogButton nodeId={id} data={data} />
      <TechButton nodeId={id} data={data} nodeType="environment" />

      <div className="absolute top-2 left-3" onDoubleClick={() => setEditing(true)}>
        <TechLabel data={data} nodeType="environment" />
        {editing ? (
          <input
            ref={inputRef}
            className="text-xs font-semibold bg-transparent outline-none border-b border-teal-400 text-teal-700 w-28"
            value={data.label}
            onChange={(e) => updateNodeLabel(id, e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
          />
        ) : (
          <div className="text-xs font-semibold text-teal-700 uppercase tracking-wide">{data.label}</div>
        )}
        </div>

      <AddChildButton nodeId={id} />
      <ChildrenList nodeId={id} children={data.children} />
      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-teal-400 !w-4 !h-4" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-teal-400 !w-4 !h-4" />
    </div>
  );
}
