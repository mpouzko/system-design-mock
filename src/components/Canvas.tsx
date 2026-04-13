import { useCallback, useRef, type DragEvent } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  ConnectionMode,
  type ReactFlowInstance,
} from '@xyflow/react';
import { useDiagramStore } from '../store/diagramStore';
import { nodeTypes } from './nodes/nodeTypes';
import { CustomEdge } from '../edges/CustomEdge';
import type { DiagramNodeType, DiagramNode, DiagramEdge } from '../types';

const edgeTypes = { custom: CustomEdge };

export function Canvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    addEdgeDirect,
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
        environment: 'Environment',
        text: 'Text',
        rectangle: '',
        arrow: '',
      };

      if (type === 'arrow') {
        const ts = Date.now();
        const groupId = `arrow_${ts}`;
        const startNode: DiagramNode = {
          id: `node_${ts}_start`,
          type: 'arrow',
          position,
          data: { label: '', arrowGroupId: groupId },
        };
        const endNode: DiagramNode = {
          id: `node_${ts}_end`,
          type: 'arrow',
          position: { x: position.x + 150, y: position.y },
          data: { label: '', arrowGroupId: groupId },
        };
        const edge: DiagramEdge = {
          id: `edge_${ts}`,
          source: startNode.id,
          sourceHandle: 'center',
          target: endNode.id,
          targetHandle: 'center-left',
          type: 'custom',
          data: { label: '' },
        };
        addNode(startNode);
        addNode(endNode);
        addEdgeDirect(edge);
        return;
      }

      const isEnv = type === 'environment';

      const newNode: DiagramNode = {
        id: `node_${Date.now()}`,
        type,
        position,
        data: { label: defaultLabels[type] },
        ...(isEnv && {
          style: { width: 300, height: 200, zIndex: -1 },
          width: 300,
          height: 200,
          zIndex: -1,
        }),
      };

      addNode(newNode);
    },
    [addNode, addEdgeDirect]
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
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{ type: 'custom' }}
        snapToGrid
        snapGrid={[15, 15]}
        defaultViewport={{ x: 0, y: 0, zoom: 0.75 }}
        deleteKeyCode="Delete"
        className="bg-white"
      >
        <Background variant={BackgroundVariant.Lines} gap={20} size={0.5} color="rgba(0,0,0,0.06)" />
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
