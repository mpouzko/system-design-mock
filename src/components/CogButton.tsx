import { useState, useRef } from 'react';
import { ConfigPopup } from './ConfigPopup';
import { ConfigTooltip } from './ConfigTooltip';
import { ConfigAnnotation } from './ConfigAnnotation';
import type { DiagramNodeData } from '../types';

export const cogButtonConfig = {
  size: 30,
  iconSize: 20,
};

type Props = {
  nodeId: string;
  data: DiagramNodeData;
};

export function CogButton({ nodeId, data }: Props) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const hasConfig = !!(data.configText || (data.configEntries && data.configEntries.length > 0));

  return (
    <>
      <button
        ref={btnRef}
        style={{ width: cogButtonConfig.size, height: cogButtonConfig.size }}
        className={`absolute -top-1 -right-1 flex items-center justify-center rounded-full
          bg-white border border-gray-300 hover:border-blue-400 hover:bg-blue-50
          transition-colors z-10 ${hasConfig ? 'border-blue-400 bg-blue-50' : ''}`}
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          style={{ width: cogButtonConfig.iconSize, height: cogButtonConfig.iconSize }}
          className={hasConfig ? 'text-blue-500' : 'text-gray-400'}
        >
          <path
            fillRule="evenodd"
            d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.195.964.44 1.394.73l1.42-.47a1 1 0 011.12.37l.68 1.178a1 1 0 01-.142 1.174l-1.126 1.003a7.07 7.07 0 010 1.476l1.126 1.003a1 1 0 01.142 1.174l-.68 1.178a1 1 0 01-1.12.37l-1.42-.47c-.43.29-.897.535-1.394.73l-.295 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a7.045 7.045 0 01-1.394-.73l-1.42.47a1 1 0 01-1.12-.37l-.68-1.178a1 1 0 01.142-1.174l1.126-1.003a7.07 7.07 0 010-1.476L3.573 6.79a1 1 0 01-.142-1.174l.68-1.178a1 1 0 011.12-.37l1.42.47c.43-.29.897-.535 1.394-.73L8.34 1.804zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {hovered && !open && hasConfig && (
        <ConfigTooltip data={data} anchorRef={btnRef} />
      )}
      {open && (
        <ConfigPopup
          nodeId={nodeId}
          data={data}
          anchorRef={btnRef}
          onClose={() => setOpen(false)}
        />
      )}
      <ConfigAnnotation data={data} />
    </>
  );
}
