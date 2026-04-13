import { Handle, Position, NodeResizer, type NodeProps } from '@xyflow/react';
import type { DiagramNode } from '../../types';

export const config = {
  title: 'Image',
  strokeColor: '#e5e7eb',
  selectedStrokeColor: '#9ca3af',
  strokeWidth: 1,
  size: { minWidth: 100, minHeight: 80 },
};

export function ImageNode({ data, selected }: NodeProps<DiagramNode>) {
  return (
    <div
      style={{ borderColor: selected ? config.selectedStrokeColor : config.strokeColor, borderWidth: config.strokeWidth }}
      className={`w-full h-full border rounded bg-white overflow-hidden ${selected ? 'shadow-md' : ''}`}
    >
      <NodeResizer minWidth={config.size.minWidth} minHeight={config.size.minHeight} isVisible={!!selected} lineClassName="!border-gray-400" handleClassName="!bg-gray-400 !w-2 !h-2 !border-white" />
      <Handle type="source" id="top" position={Position.Top} className="!bg-gray-400 !w-3 !h-3" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-gray-400 !w-3 !h-3" />

      {data.imageDataUrl ? (
        <img src={data.imageDataUrl} alt="" className="w-full h-full object-contain" draggable={false} />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
      )}

      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-gray-400 !w-3 !h-3" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-gray-400 !w-3 !h-3" />
    </div>
  );
}
