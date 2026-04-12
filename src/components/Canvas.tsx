import { useCallback, useRef, type DragEvent } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  type ReactFlowInstance,
} from '@xyflow/react';
import { useDiagramStore } from '../store/diagramStore';
import { nodeTypes } from './nodes/nodeTypes';
import { CustomEdge } from '../edges/CustomEdge';
import type { DiagramNodeType, DiagramNode } from '../types';

const edgeTypes = { custom: CustomEdge };

export function Canvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
  } = useDiagramStore();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<ReactFlowInstance<DiagramNode> | null>(null);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow') as DiagramNodeType;
      if (!type || !reactFlowInstance.current) return;

      const position = reactFlowInstance.current.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const defaultLabels: Record<DiagramNodeType, string> = {
        service: 'Service',
        database: 'Database',
        queue: 'Queue',
        loadBalancer: 'Load Balancer',
        user: 'User',
        cloud: 'Cloud',
        cache: 'Cache',
      };

      const newNode: DiagramNode = {
        id: `node_${Date.now()}`,
        type,
        position,
        data: { label: defaultLabels[type] },
      };

      addNode(newNode);
    },
    [addNode]
  );

  return (
    <div ref={reactFlowWrapper} className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={(instance) => {
          reactFlowInstance.current = instance as ReactFlowInstance<DiagramNode>;
        }}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: 'custom' }}
        snapToGrid
        snapGrid={[15, 15]}
        fitView
        deleteKeyCode="Delete"
        className="bg-white"
      >
        <Background variant={BackgroundVariant.Dots} gap={15} size={1} color="#e2e8f0" />
        <Controls className="!bg-white !border-gray-200 !shadow-sm" />
        <MiniMap
          className="!bg-gray-50 !border-gray-200"
          nodeColor="#94a3b8"
          maskColor="rgba(0,0,0,0.08)"
        />
      </ReactFlow>
    </div>
  );
}
