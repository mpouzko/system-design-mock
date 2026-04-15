/** Shared default classes for all node root containers */
export const nodeBaseClasses = 'w-full h-full text-center flex flex-col justify-center items-center';

/** Root classes for SVG-based shape nodes (hexagon, cylinder, etc.) */
export function svgNodeClasses(selected: boolean | undefined): string {
  return `relative ${nodeBaseClasses} ${selected ? 'drop-shadow-md' : 'drop-shadow-sm'}`;
}

/** Root classes for box-style nodes (Service, AI, Cache) */
export function boxNodeClasses(selected: boolean | undefined): string {
  return `px-5 py-3 border bg-white shadow-sm ${nodeBaseClasses} ${selected ? 'shadow-md' : ''}`;
}
