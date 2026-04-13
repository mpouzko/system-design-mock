import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  anchorRef: React.RefObject<HTMLElement | null>;
  onAdd: (name: string, config?: string) => void;
  onClose: () => void;
};

export function AddChildPopup({ anchorRef, onAdd, onClose }: Props) {
  const [name, setName] = useState('');
  const [config, setConfig] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    // Delay listener so the opening click doesn't immediately close
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick);
    }, 0);
    document.addEventListener('keydown', handleKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!anchorRef.current) return null;
  const rect = anchorRef.current.getBoundingClientRect();

  const handleSubmit = () => {
    if (!name.trim()) return;
    onAdd(name.trim(), config.trim() || undefined);
    onClose();
  };

  return createPortal(
    <div
      ref={popupRef}
      className="fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-56"
      style={{ top: rect.bottom + 6, left: rect.left + rect.width / 2, transform: 'translateX(-50%)' }}
    >
      <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Add Child</div>
      <input
        ref={inputRef}
        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded mb-2 outline-none focus:border-blue-400"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <textarea
        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded mb-2 outline-none focus:border-blue-400 resize-none font-mono text-xs"
        placeholder="Config (optional)"
        rows={3}
        value={config}
        onChange={(e) => setConfig(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          className="flex-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="flex-1 px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-40"
          disabled={!name.trim()}
          onClick={handleSubmit}
        >
          Ok
        </button>
      </div>
    </div>,
    document.body
  );
}
