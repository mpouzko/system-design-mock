import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';
import { useDiagramStore } from '../../store/diagramStore';

export function ArrowNode({ id, selected }: NodeProps<DiagramNode>) {
  const addArrowPoint = useDiagramStore((s) => s.addArrowPoint);
  const removeArrowPoint = useDiagramStore((s) => s.removeArrowPoint);
  const edges = useDiagramStore((s) => s.edges);
  const nodes = useDiagramStore((s) => s.nodes);

  // Check if this is a middle node (has both incoming and outgoing arrow edges)
  const hasIncoming = edges.some(
    (e) => e.target === id && nodes.find((n) => n.id === e.source)?.type === 'arrow'
  );
  const hasOutgoing = edges.some(
    (e) => e.source === id && nodes.find((n) => n.id === e.target)?.type === 'arrow'
  );
  const isMiddle = hasIncoming && hasOutgoing;

  return (
    <div className="relative">
      <div
        className={`w-3 h-3 rounded-full border-2 ${
          selected ? 'bg-gray-500 border-gray-600' : 'bg-gray-300 border-gray-400'
        }`}
      />
      <Handle type="source" id="center" position={Position.Right} className="!bg-transparent !w-3 !h-3 !border-0 !right-0 !top-1/2 !-translate-y-1/2" />
      <Handle type="source" id="center-left" position={Position.Left} className="!bg-transparent !w-3 !h-3 !border-0 !left-0 !top-1/2 !-translate-y-1/2" />

      {selected && hasOutgoing && (
        <button
          className="absolute -top-5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] leading-none flex items-center justify-center hover:bg-blue-600 shadow-sm"
          onClick={(e) => { e.stopPropagation(); addArrowPoint(id); }}
          title="Add point"
        >
          +
        </button>
      )}
      {selected && isMiddle && (
        <button
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] leading-none flex items-center justify-center hover:bg-red-600 shadow-sm"
          onClick={(e) => { e.stopPropagation(); removeArrowPoint(id); }}
          title="Remove point"
        >
          x
        </button>
      )}
    </div>
  );
}
