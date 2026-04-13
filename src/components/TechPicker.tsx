import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDiagramStore } from '../store/diagramStore';
import { techOptions } from '../data/techIcons';
import type { DiagramNodeType } from '../types';

type Props = {
  nodeId: string;
  nodeType: DiagramNodeType;
  anchorRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
};

export function TechPicker({ nodeId, nodeType, anchorRef, onClose }: Props) {
  const updateNodeTech = useDiagramStore((s) => s.updateNodeTech);
  const [search, setSearch] = useState('');
  const [customName, setCustomName] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const options = techOptions[nodeType] ?? [];
  const filtered = search
    ? options.filter((o) => o.name.toLowerCase().includes(search.toLowerCase()))
    : options;

  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 6, left: rect.left - 100 });
    }
  }, [anchorRef]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  function select(techId: string, techCustom?: string) {
    updateNodeTech(nodeId, techId, techCustom);
    onClose();
  }

  function clearSelection() {
    updateNodeTech(nodeId, '', undefined);
    onClose();
  }

  return createPortal(
    <div
      ref={popupRef}
      className="fixed z-[9999] w-[220px] bg-white border border-gray-200 rounded-lg shadow-lg nodrag nopan overflow-hidden"
      style={{ top: pos.top, left: Math.max(8, pos.left) }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Search */}
      <div className="p-2 border-b border-gray-100">
        <input
          className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded outline-none focus:border-blue-300"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
      </div>

      {/* Options grid */}
      <div className="p-2 max-h-48 overflow-y-auto">
        <div className="grid grid-cols-3 gap-1.5">
          {filtered.map((opt) => (
            <button
              key={opt.id}
              className="flex flex-col items-center gap-1 p-1.5 rounded hover:bg-blue-50 transition-colors"
              onClick={() => select(opt.id)}
              title={opt.name}
            >
              <div className="w-6 h-6">{opt.icon}</div>
              <span className="text-[9px] text-gray-600 leading-tight text-center truncate w-full">
                {opt.name}
              </span>
            </button>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-xs text-gray-400 text-center py-2">No matches</div>
        )}
      </div>

      {/* Custom + Clear */}
      <div className="p-2 border-t border-gray-100 space-y-1.5">
        <div className="flex gap-1">
          <input
            className="flex-1 min-w-0 px-2 py-1 text-xs bg-gray-50 border border-gray-200 rounded outline-none focus:border-blue-300"
            placeholder="Custom name..."
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && customName.trim()) {
                select('custom', customName.trim());
              }
            }}
          />
          <button
            className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shrink-0"
            onClick={() => { if (customName.trim()) select('custom', customName.trim()); }}
          >
            Set
          </button>
        </div>
        <button
          className="w-full text-xs text-gray-400 hover:text-red-500 py-1"
          onClick={clearSelection}
        >
          Clear selection
        </button>
      </div>
    </div>,
    document.body
  );
}
