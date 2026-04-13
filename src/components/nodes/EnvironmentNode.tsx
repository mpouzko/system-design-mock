import { Handle, Position, NodeResizer, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { CogButton } from '../CogButton';
import { TechButton } from '../TechButton';
import { useState, useRef, useEffect } from 'react';

export function EnvironmentNode({ id, data, selected }: NodeProps<DiagramNode>) {
  const updateNodeLabel = useDiagramStore((s) => s.updateNodeLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div
      className={`w-full h-full rounded-xl border-2 border-dashed bg-teal-50/40 relative
        ${selected ? 'border-teal-500' : 'border-teal-300'}`}
    >
      <NodeResizer minWidth={150} minHeight={100} isVisible={!!selected} lineClassName="!border-teal-400" handleClassName="!bg-teal-400 !w-2.5 !h-2.5 !border-white" />
      <Handle type="source" id="top" position={Position.Top} className="!bg-teal-400 !w-4 !h-4" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-teal-400 !w-4 !h-4" />
      <CogButton nodeId={id} data={data} />
      <TechButton nodeId={id} data={data} nodeType="environment" />

      <div className="absolute top-2 left-3" onDoubleClick={() => setEditing(true)}>
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

      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-teal-400 !w-4 !h-4" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-teal-400 !w-4 !h-4" />
    </div>
  );
}
