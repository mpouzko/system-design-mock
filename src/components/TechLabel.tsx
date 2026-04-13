import { getTechOption } from '../data/techIcons';
import type { DiagramNodeData, DiagramNodeType } from '../types';

export const techLabelConfig = {
  fontSize: 12,
};

type Props = {
  data: DiagramNodeData;
  nodeType: DiagramNodeType;
};

export function TechLabel({ data, nodeType }: Props) {
  if (!data.techId) return null;

  const techOption = data.techId !== 'custom' ? getTechOption(nodeType, data.techId) : null;
  const name = techOption?.name ?? data.techCustom ?? '';

  if (!name) return null;

  return (
    <div style={{ fontSize: techLabelConfig.fontSize }} className="text-blue-500 font-medium mb-0.5 truncate">{name}</div>
  );
}
