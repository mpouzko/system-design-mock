import type { DiagramNodeType } from '../types';
import type { DragEvent } from 'react';

type NodeItem = { type: DiagramNodeType; label: string; icon: string; color: string };

const commonItems: NodeItem[] = [
  { type: 'text', label: 'Text', icon: 'T', color: 'border-gray-300 bg-gray-50' },
  { type: 'arrow', label: 'Arrow', icon: '->', color: 'border-gray-300 bg-gray-50' },
  { type: 'rectangle', label: 'Rectangle', icon: '[]', color: 'border-gray-300 bg-gray-50' },
];

const appStackItems: NodeItem[] = [
  { type: 'engine', label: 'Engine', icon: '⬡', color: 'border-amber-300 bg-amber-50' },
];

const serviceItems: NodeItem[] = [
  { type: 'service', label: 'Service', icon: '[ ]', color: 'border-blue-300 bg-blue-50' },
  { type: 'database', label: 'Database', icon: '||', color: 'border-green-300 bg-green-50' },
  { type: 'queue', label: 'Queue', icon: '>>', color: 'border-orange-300 bg-orange-50' },
  { type: 'loadBalancer', label: 'Load Balancer', icon: '<>', color: 'border-purple-300 bg-purple-50' },
  { type: 'cache', label: 'Cache', icon: '{}', color: 'border-red-300 bg-red-50' },
  { type: 'user', label: 'User / Client', icon: '()', color: 'border-gray-300 bg-gray-50' },
  { type: 'cloud', label: 'Cloud / CDN', icon: '~~', color: 'border-sky-300 bg-sky-50' },
  { type: 'environment', label: 'Environment', icon: '[ ]', color: 'border-teal-300 bg-teal-50' },
];

function onDragStart(event: DragEvent, nodeType: DiagramNodeType) {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
}

function CategorySection({ title, items }: { title: string; items: NodeItem[] }) {
  return (
    <div>
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{title}</h2>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div
            key={item.type}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 cursor-grab active:cursor-grabbing
              hover:shadow-sm transition-shadow ${item.color}`}
            draggable
            onDragStart={(e) => onDragStart(e, item.type)}
          >
            <span className="font-mono text-xs text-gray-500 w-5">{item.icon}</span>
            <span className="text-sm font-medium text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="w-56 bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        <CategorySection title="Common" items={commonItems} />
        <CategorySection title="Services" items={serviceItems} />
        <CategorySection title="App Stack" items={appStackItems} />
      </div>
      <div className="px-4 py-2 border-t border-gray-200 text-xs text-gray-400">
        Drag elements onto canvas
      </div>
    </aside>
  );
}
