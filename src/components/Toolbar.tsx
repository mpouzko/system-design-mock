import { useState, useRef, useEffect } from 'react';
import { useDiagramStore } from '../store/diagramStore';
import { exportPng, exportSvg } from '../utils/exportDiagram';

export function Toolbar() {
  const {
    diagramName,
    setDiagramName,
    save,
    load,
    newDiagram,
    deleteDiagram,
    savedDiagrams,
    diagramId,
    refreshSavedList,
  } = useDiagramStore();

  const [editingName, setEditingName] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const loadRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editingName) nameRef.current?.focus();
  }, [editingName]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (loadRef.current && !loadRef.current.contains(e.target as Node)) setShowLoad(false);
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) setShowExport(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-3 shrink-0">
      {/* Diagram name */}
      <div className="flex items-center gap-2">
        {editingName ? (
          <input
            ref={nameRef}
            className="text-sm font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded outline-none border border-blue-300"
            value={diagramName}
            onChange={(e) => setDiagramName(e.target.value)}
            onBlur={() => setEditingName(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditingName(false)}
          />
        ) : (
          <button
            className="text-sm font-semibold text-gray-800 hover:bg-gray-100 px-2 py-1 rounded"
            onClick={() => setEditingName(true)}
          >
            {diagramName}
          </button>
        )}
      </div>

      <div className="flex-1" />

      {/* Actions */}
      <button
        className="text-xs px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
        onClick={() => { newDiagram(); }}
      >
        New
      </button>

      <button
        className="text-xs px-3 py-1.5 rounded bg-blue-500 hover:bg-blue-600 text-white font-medium"
        onClick={() => { save(); }}
      >
        Save
      </button>

      {/* Load dropdown */}
      <div ref={loadRef} className="relative">
        <button
          className="text-xs px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
          onClick={() => { refreshSavedList(); setShowLoad(!showLoad); setShowExport(false); }}
        >
          Load
        </button>
        {showLoad && (
          <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            {savedDiagrams.length === 0 ? (
              <div className="px-4 py-3 text-xs text-gray-400">No saved diagrams</div>
            ) : (
              savedDiagrams.map((d) => (
                <div
                  key={d.id}
                  className={`flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm
                    ${d.id === diagramId ? 'bg-blue-50' : ''}`}
                >
                  <span
                    className="text-gray-700 truncate flex-1"
                    onClick={() => { load(d.id); setShowLoad(false); }}
                  >
                    {d.name}
                  </span>
                  <button
                    className="text-xs text-red-400 hover:text-red-600 ml-2"
                    onClick={(e) => { e.stopPropagation(); deleteDiagram(d.id); }}
                  >
                    x
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Export dropdown */}
      <div ref={exportRef} className="relative">
        <button
          className="text-xs px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
          onClick={() => { setShowExport(!showExport); setShowLoad(false); }}
        >
          Export
        </button>
        {showExport && (
          <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => { exportPng(diagramName); setShowExport(false); }}
            >
              Export PNG
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => { exportSvg(diagramName); setShowExport(false); }}
            >
              Export SVG
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
