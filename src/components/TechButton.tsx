import { useState, useRef } from 'react';
import { TechPicker } from './TechPicker';
import { getTechOption } from '../data/techIcons';
import type { DiagramNodeData, DiagramNodeType } from '../types';

type Props = {
  nodeId: string;
  data: DiagramNodeData;
  nodeType: DiagramNodeType;
};

// Box/parcel icon for when no tech is selected
function BoxIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-gray-400">
      <path d="M3.5 6.5L10 3l6.5 3.5V14L10 17.5 3.5 14V6.5z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 6.5L10 10m0 0l6.5-3.5M10 10v7.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function TechButton({ nodeId, data, nodeType }: Props) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const hasTech = !!data.techId;
  const techOption = data.techId && data.techId !== 'custom'
    ? getTechOption(nodeType, data.techId)
    : null;

  return (
    <>
      <button
        ref={btnRef}
        className={`absolute -top-1 -right-8 w-6 h-6 flex items-center justify-center rounded-full
          bg-white border border-gray-300 hover:border-blue-400 hover:bg-blue-50
          transition-colors z-10 overflow-hidden
          ${hasTech ? 'border-blue-400' : ''}`}
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        title="Technology"
      >
        {techOption ? (
          <div className="w-5 h-5">{techOption.icon}</div>
        ) : data.techId === 'custom' && data.techCustom ? (
          <span className="text-[7px] font-bold text-blue-600 leading-none">
            {data.techCustom.slice(0, 2).toUpperCase()}
          </span>
        ) : (
          <BoxIcon />
        )}
      </button>
      {open && (
        <TechPicker
          nodeId={nodeId}
          nodeType={nodeType}
          anchorRef={btnRef}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
