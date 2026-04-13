import { Handle, Position, NodeResizer, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { useState, useRef, useEffect } from 'react';

export function RectangleNode({ id, data, selected }: NodeProps<DiagramNode>) {
  const updateNodeLabel = useDiagramStore((s) => s.updateNodeLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div
      className={`px-4 py-3 rounded border-2 bg-white w-full h-full min-w-[80px] min-h-[50px] flex items-center justify-center
        ${selected ? 'border-gray-500 shadow-md' : 'border-gray-300'}`}
      onDoubleClick={() => setEditing(true)}
    >
      <NodeResizer minWidth={80} minHeight={50} isVisible={!!selected} lineClassName="!border-gray-400" handleClassName="!bg-gray-500 !w-2 !h-2 !border-white" />
      <Handle type="source" id="top" position={Position.Top} className="!bg-gray-500 !w-3 !h-3" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-gray-500 !w-3 !h-3" />

      {editing ? (
        <input
          ref={inputRef}
          className="w-full text-center text-sm font-medium bg-transparent outline-none border-b border-gray-400"
          value={data.label}
          onChange={(e) => updateNodeLabel(id, e.target.value)}
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
        />
      ) : (
        <div className="text-sm font-medium text-gray-700">{data.label || '\u00A0'}</div>
      )}

      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-gray-500 !w-3 !h-3" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-gray-500 !w-3 !h-3" />
    </div>
  );
}
