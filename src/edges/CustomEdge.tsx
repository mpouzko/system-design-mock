import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from '@xyflow/react';
import { useDiagramStore } from '../store/diagramStore';
import { useState, useRef, useEffect } from 'react';

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
  data,
}: EdgeProps) {
  const updateEdgeLabel = useDiagramStore((s) => s.updateEdgeLabel);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const label = (data as { label?: string } | undefined)?.label ?? '';

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: selected ? '#3b82f6' : '#94a3b8',
          strokeWidth: selected ? 2.5 : 1.5,
        }}
      />
      <EdgeLabelRenderer>
        <div
          className="absolute pointer-events-auto nodrag nopan"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            setEditing(true);
          }}
        >
          {editing ? (
            <input
              ref={inputRef}
              className="px-2 py-0.5 text-xs bg-white border border-blue-300 rounded shadow-sm outline-none text-center w-24"
              value={label}
              onChange={(e) => updateEdgeLabel(id, e.target.value)}
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
            />
          ) : label ? (
            <div className="px-2 py-0.5 text-xs bg-white border border-gray-200 rounded shadow-sm text-gray-600">
              {label}
            </div>
          ) : selected ? (
            <div className="px-2 py-0.5 text-xs bg-blue-50 border border-blue-200 rounded text-blue-400 cursor-pointer">
              + label
            </div>
          ) : null}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
