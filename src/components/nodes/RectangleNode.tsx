import { Handle, Position, NodeResizer, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { useState, useRef, useEffect } from 'react';

export const config = {
  title: 'Rectangle',
  strokeColor: '#d1d5db',
  selectedStrokeColor: '#6b7280',
  strokeWidth: 2,
  size: { minWidth: 80, minHeight: 50 },
};

export function RectangleNode({ id, data, selected }: NodeProps<DiagramNode>) {
  const updateNodeLabel = useDiagramStore((s) => s.updateNodeLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div
      style={{ borderColor: selected ? config.selectedStrokeColor : config.strokeColor, borderWidth: config.strokeWidth }}
      className={`px-4 py-3 rounded border bg-white w-full h-full flex items-center justify-center
        ${selected ? 'shadow-md' : ''}`}
      onDoubleClick={() => setEditing(true)}
    >
      <NodeResizer minWidth={config.size.minWidth} minHeight={config.size.minHeight} isVisible={!!selected} lineClassName="!border-gray-400" handleClassName="!bg-gray-500 !w-2 !h-2 !border-white" />
      <Handle type="source" id="top" position={Position.Top} className="!bg-gray-500 !w-3 !h-3" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-gray-500 !w-3 !h-3" />

      {editing ? (
        <input
          ref={inputRef}
          className="w-full text-center text-base font-medium bg-transparent outline-none border-b border-gray-400"
          value={data.label}
          onChange={(e) => updateNodeLabel(id, e.target.value)}
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
        />
      ) : (
        <div className="text-base font-medium text-gray-700">{data.label || '\u00A0'}</div>
      )}

      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-gray-500 !w-3 !h-3" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-gray-500 !w-3 !h-3" />
    </div>
  );
}
