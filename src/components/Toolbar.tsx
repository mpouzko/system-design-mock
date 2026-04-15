import { useState, useRef, useEffect } from 'react';
import { useDiagramStore } from '../store/diagramStore';
import { exportPng, exportSvg, exportJson } from '../utils/exportDiagram';
import { encodeShareUrl } from '../utils/shareUrl';
import { isCollabMode } from '../utils/firebase';

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
    nodes,
    edges,
    refreshSavedList,
    roomId,
    collabCreateRoom,
    collabJoinRoom,
    collabLeaveRoom,
  } = useDiagramStore();

  const [editingName, setEditingName] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showCollab, setShowCollab] = useState(false);
  const [joinInput, setJoinInput] = useState('');
  const [collabCopied, setCollabCopied] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const loadRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const collabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editingName) nameRef.current?.focus();
  }, [editingName]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (loadRef.current && !loadRef.current.contains(e.target as Node)) setShowLoad(false);
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) setShowExport(false);
      if (collabRef.current && !collabRef.current.contains(e.target as Node)) setShowCollab(false);
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

      <div className="relative">
        <button
          className="text-xs px-3 py-1.5 rounded bg-green-500 hover:bg-green-600 text-white font-medium"
          onClick={() => {
            const url = encodeShareUrl(diagramName, nodes, edges);
            navigator.clipboard.writeText(url);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
          }}
        >
          Share
        </button>
        {showCopied && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 text-xs bg-gray-800 text-white rounded whitespace-nowrap z-50">
            Link copied!
          </div>
        )}
      </div>

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
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => { exportJson(diagramName, nodes, edges); setShowExport(false); }}
            >
              Export JSON
            </button>
          </div>
        )}
      </div>

      {/* Collab (only in collab mode) */}
      {isCollabMode && (
        <div ref={collabRef} className="relative">
          {roomId && (
            <span className="inline-flex items-center gap-1 text-xs text-green-600 mr-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              {roomId}
            </span>
          )}
          <button
            className="text-xs px-3 py-1.5 rounded bg-violet-500 hover:bg-violet-600 text-white font-medium"
            onClick={() => { setShowCollab(!showCollab); setShowLoad(false); setShowExport(false); }}
          >
            Collab
          </button>
          {showCollab && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3 space-y-2">
              {!roomId ? (
                <>
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                    onClick={async () => {
                      const url = await collabCreateRoom();
                      navigator.clipboard.writeText(url);
                      setCollabCopied(true);
                      setTimeout(() => setCollabCopied(false), 2000);
                    }}
                  >
                    Create Room
                  </button>
                  {collabCopied && (
                    <div className="text-xs text-green-600 px-3">Room link copied!</div>
                  )}
                  <div className="border-t border-gray-100 pt-2">
                    <input
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded outline-none focus:border-violet-400"
                      placeholder="Room ID or URL"
                      value={joinInput}
                      onChange={(e) => setJoinInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && joinInput.trim()) {
                          const id = joinInput.includes('#room=')
                            ? joinInput.split('#room=')[1]
                            : joinInput.trim();
                          collabJoinRoom(id);
                          setJoinInput('');
                          setShowCollab(false);
                        }
                      }}
                    />
                    <button
                      className="w-full mt-1 px-3 py-1.5 text-sm bg-violet-500 text-white rounded hover:bg-violet-600 disabled:opacity-40"
                      disabled={!joinInput.trim()}
                      onClick={() => {
                        const id = joinInput.includes('#room=')
                          ? joinInput.split('#room=')[1]
                          : joinInput.trim();
                        collabJoinRoom(id);
                        setJoinInput('');
                        setShowCollab(false);
                      }}
                    >
                      Join Room
                    </button>
                  </div>
                </>
              ) : (
                <button
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                  onClick={() => { collabLeaveRoom(); setShowCollab(false); }}
                >
                  Leave Room
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
