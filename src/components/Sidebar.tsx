import type { DiagramNodeType } from '../types';
import type { DragEvent } from 'react';

const nodeItems: { type: DiagramNodeType; label: string; icon: string; color: string }[] = [
  { type: 'service', label: 'Service', icon: '[ ]', color: 'border-blue-300 bg-blue-50' },
  { type: 'database', label: 'Database', icon: '||', color: 'border-green-300 bg-green-50' },
  { type: 'queue', label: 'Queue', icon: '>>', color: 'border-orange-300 bg-orange-50' },
  { type: 'loadBalancer', label: 'Load Balancer', icon: '<>', color: 'border-purple-300 bg-purple-50' },
  { type: 'cache', label: 'Cache', icon: '{}', color: 'border-red-300 bg-red-50' },
  { type: 'user', label: 'User / Client', icon: '()', color: 'border-gray-300 bg-gray-50' },
  { type: 'cloud', label: 'Cloud / CDN', icon: '~~', color: 'border-sky-300 bg-sky-50' },
];

function onDragStart(event: DragEvent, nodeType: DiagramNodeType) {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
}

export function Sidebar() {
  return (
    <aside className="w-56 bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Elements</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {nodeItems.map((item) => (
          <div
            key={item.type}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 cursor-grab active:cursor-grabbing
              hover:shadow-sm transition-shadow ${item.color}`}
            draggable
            onDragStart={(e) => onDragStart(e, item.type)}
          >
            <span className="font-mono text-xs text-gray-500 w-5">{item.icon}</span>
            <span className="text-sm font-medium text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 border-t border-gray-200 text-xs text-gray-400">
        Drag elements onto canvas
      </div>
    </aside>
  );
}
