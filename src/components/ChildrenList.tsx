import { useState } from 'react';
import { useDiagramStore } from '../store/diagramStore';
import type { NodeChild } from '../types';

type Props = {
  nodeId: string;
  children?: NodeChild[];
};

function ChildItem({ nodeId, child }: { nodeId: string; child: NodeChild }) {
  const removeNodeChild = useDiagramStore((s) => s.removeNodeChild);
  const [hovered, setHovered] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div
      className="relative flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600 group"
      onMouseEnter={() => { setHovered(true); setShowConfig(true); }}
      onMouseLeave={() => { setHovered(false); setShowConfig(false); }}
    >
      <span className="truncate">{child.name}</span>
      {hovered && (
        <button
          className="ml-auto flex-shrink-0 w-3.5 h-3.5 flex items-center justify-center rounded-full bg-red-100 text-red-500 text-[9px] leading-none hover:bg-red-200"
          onClick={(e) => { e.stopPropagation(); removeNodeChild(nodeId, child.id); }}
        >
          x
        </button>
      )}
      {showConfig && child.config && (
        <div className="absolute left-full ml-2 top-0 z-[9998] max-w-[200px] bg-gray-800 text-[10px] text-gray-100 rounded-lg shadow-lg px-2 py-1.5 pointer-events-none whitespace-pre-wrap font-mono">
          {child.config}
        </div>
      )}
    </div>
  );
}

export function ChildrenList({ nodeId, children }: Props) {
  if (!children || children.length === 0) return null;

  return (
    <div className="mt-4 space-y-1 w-full">
      {children.map((child) => (
        <ChildItem key={child.id} nodeId={nodeId} child={child} />
      ))}
    </div>
  );
}
