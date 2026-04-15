import { useState, useRef } from 'react';
import { AddChildPopup } from './AddChildPopup';
import { useDiagramStore } from '../store/diagramStore';

type Props = {
  nodeId: string;
};

export function AddChildButton({ nodeId }: Props) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const addNodeChild = useDiagramStore((s) => s.addNodeChild);

  return (
    <>
      <button
        ref={btnRef}
        className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-5 h-5 flex items-center justify-center rounded-full
          bg-white border border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors z-10 text-gray-400 hover:text-blue-500 text-sm leading-none"
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        title="Add child"
      >
        +
      </button>
      {open && (
        <AddChildPopup
          anchorRef={btnRef}
          onAdd={(name, config) => {
            addNodeChild(nodeId, {
              id: `child_${Date.now()}`,
              name,
              config,
            });
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
