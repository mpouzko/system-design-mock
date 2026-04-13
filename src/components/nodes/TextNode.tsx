import { Handle, Position, NodeResizer, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';
import { useState, useRef, useEffect } from 'react';

export function TextNode({ id, data, selected }: NodeProps<DiagramNode>) {
  const updateNodeLabel = useDiagramStore((s) => s.updateNodeLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div
      className={`px-3 py-2 rounded border bg-white w-full h-full min-w-[60px] min-h-[30px]
        ${selected ? 'border-gray-400 shadow-sm' : 'border-gray-200'}`}
      onDoubleClick={() => setEditing(true)}
    >
      <NodeResizer minWidth={60} minHeight={30} isVisible={!!selected} lineClassName="!border-gray-400" handleClassName="!bg-gray-400 !w-2 !h-2 !border-white" />
      <Handle type="source" id="top" position={Position.Top} className="!bg-gray-400 !w-3 !h-3" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-gray-400 !w-3 !h-3" />

      {editing ? (
        <textarea
          ref={inputRef}
          className="w-full h-full text-sm text-gray-700 bg-transparent outline-none resize-none"
          value={data.label}
          onChange={(e) => updateNodeLabel(id, e.target.value)}
          onBlur={() => setEditing(false)}
        />
      ) : (
        <div className="text-sm text-gray-700 whitespace-pre-wrap">{data.label}</div>
      )}

      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-gray-400 !w-3 !h-3" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-gray-400 !w-3 !h-3" />
    </div>
  );
}
