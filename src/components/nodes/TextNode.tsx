import { Handle, Position, NodeResizer, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { useState, useRef, useEffect } from 'react';

export const config = {
  title: 'Text',
  strokeColor: '#e5e7eb',
  selectedStrokeColor: '#9ca3af',
  strokeWidth: 1,
  size: { minWidth: 60, minHeight: 30 },
};

export function TextNode({ id, data, selected }: NodeProps<DiagramNode>) {
  const updateNodeLabel = useDiagramStore((s) => s.updateNodeLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div
      style={{ borderColor: selected ? config.selectedStrokeColor : config.strokeColor, borderWidth: config.strokeWidth }}
      className={`px-3 py-2 rounded border bg-white w-full h-full
        ${selected ? 'shadow-sm' : ''}`}
      onDoubleClick={() => setEditing(true)}
    >
      <NodeResizer minWidth={config.size.minWidth} minHeight={config.size.minHeight} isVisible={!!selected} lineClassName="!border-gray-400" handleClassName="!bg-gray-400 !w-2 !h-2 !border-white" />
      <Handle type="source" id="top" position={Position.Top} className="!bg-gray-400 !w-3 !h-3" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-gray-400 !w-3 !h-3" />

      {editing ? (
        <textarea
          ref={inputRef}
          className="w-full h-full text-base text-gray-700 bg-transparent outline-none resize-none"
          value={data.label}
          onChange={(e) => updateNodeLabel(id, e.target.value)}
          onBlur={() => setEditing(false)}
        />
      ) : (
        <div className="text-base text-gray-700 whitespace-pre-wrap">{data.label}</div>
      )}

      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-gray-400 !w-3 !h-3" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-gray-400 !w-3 !h-3" />
    </div>
  );
}
