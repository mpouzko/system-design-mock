import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useDiagramStore } from '../store/diagramStore';
import type { ConfigEntry, DiagramNodeData } from '../types';

type Props = {
  nodeId: string;
  data: DiagramNodeData;
  anchorRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
};

function EntryRow({
  entry,
  depth,
  onUpdate,
  onRemove,
  onAddChild,
}: {
  entry: ConfigEntry;
  depth: number;
  onUpdate: (field: 'key' | 'value', val: string) => void;
  onRemove: () => void;
  onAddChild: () => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-1" style={{ paddingLeft: depth * 14 }}>
        <input
          className="min-w-0 flex-1 px-1.5 py-1 text-xs bg-gray-50 border border-gray-200 rounded outline-none focus:border-blue-300"
          placeholder="key"
          value={entry.key}
          onChange={(e) => onUpdate('key', e.target.value)}
        />
        <input
          className="min-w-0 flex-1 px-1.5 py-1 text-xs bg-gray-50 border border-gray-200 rounded outline-none focus:border-blue-300"
          placeholder="value"
          value={entry.value}
          onChange={(e) => onUpdate('value', e.target.value)}
        />
        <button
          className="text-gray-400 hover:text-blue-500 text-[10px] shrink-0"
          onClick={onAddChild}
          title="Add nested"
        >
          +
        </button>
        <button
          className="text-gray-400 hover:text-red-500 text-[10px] shrink-0"
          onClick={onRemove}
          title="Remove"
        >
          x
        </button>
      </div>
    </div>
  );
}

function EntryList({
  entries,
  depth,
  onChange,
}: {
  entries: ConfigEntry[];
  depth: number;
  onChange: (entries: ConfigEntry[]) => void;
}) {
  function updateEntry(index: number, field: 'key' | 'value', val: string) {
    onChange(entries.map((e, i) => (i === index ? { ...e, [field]: val } : e)));
  }

  function removeEntry(index: number) {
    onChange(entries.filter((_, i) => i !== index));
  }

  function addChild(index: number) {
    onChange(
      entries.map((e, i) =>
        i === index ? { ...e, children: [...(e.children ?? []), { key: '', value: '' }] } : e
      )
    );
  }

  function updateChildren(index: number, children: ConfigEntry[]) {
    onChange(entries.map((e, i) => (i === index ? { ...e, children } : e)));
  }

  return (
    <>
      {entries.map((entry, i) => (
        <div key={i}>
          <EntryRow
            entry={entry}
            depth={depth}
            onUpdate={(field, val) => updateEntry(i, field, val)}
            onRemove={() => removeEntry(i)}
            onAddChild={() => addChild(i)}
          />
          {entry.children && entry.children.length > 0 && (
            <EntryList
              entries={entry.children}
              depth={depth + 1}
              onChange={(children) => updateChildren(i, children)}
            />
          )}
        </div>
      ))}
    </>
  );
}

function filterEmptyEntries(entries: ConfigEntry[]): ConfigEntry[] {
  return entries
    .map((e) => ({
      ...e,
      children: e.children ? filterEmptyEntries(e.children) : undefined,
    }))
    .filter((e) => e.key || e.value || (e.children && e.children.length > 0));
}

export function ConfigPopup({ nodeId, data, anchorRef, onClose }: Props) {
  const updateNodeConfig = useDiagramStore((s) => s.updateNodeConfig);
  const [tab, setTab] = useState<'text' | 'kv'>('text');
  const [text, setText] = useState(data.configText ?? '');
  const [entries, setEntries] = useState<ConfigEntry[]>(data.configEntries ?? []);
  const popupRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 6, left: rect.right - 280 });
    }
  }, [anchorRef]);

  const save = useCallback(() => {
    updateNodeConfig(nodeId, text, filterEmptyEntries(entries));
  }, [nodeId, text, entries, updateNodeConfig]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        save();
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [save, onClose]);

  function addEntry() {
    setEntries([...entries, { key: '', value: '' }]);
  }

  return createPortal(
    <div
      ref={popupRef}
      className="fixed z-[9999] w-[280px] bg-white border border-gray-200 rounded-lg shadow-lg nodrag nopan overflow-hidden"
      style={{ top: pos.top, left: Math.max(8, pos.left) }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 px-3 py-2 text-xs font-medium ${
            tab === 'text' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setTab('text')}
        >
          Text
        </button>
        <button
          className={`flex-1 px-3 py-2 text-xs font-medium ${
            tab === 'kv' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setTab('kv')}
        >
          Key-Value
        </button>
      </div>

      <div className="p-3 max-h-60 overflow-y-auto">
        {tab === 'text' ? (
          <textarea
            className="w-full h-28 p-2 text-xs font-mono bg-gray-50 border border-gray-200 rounded resize-none outline-none focus:border-blue-300"
            placeholder="Add notes, config, code..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <div className="space-y-1.5">
            <EntryList entries={entries} depth={0} onChange={setEntries} />
            <button
              className="text-xs text-blue-500 hover:text-blue-700 font-medium"
              onClick={addEntry}
            >
              + Add entry
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end px-3 py-2 border-t border-gray-100">
        <button
          className="text-xs px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium"
          onClick={() => { save(); onClose(); }}
        >
          Done
        </button>
      </div>
    </div>,
    document.body
  );
}
