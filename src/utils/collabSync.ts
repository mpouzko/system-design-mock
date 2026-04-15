import { doc, setDoc, onSnapshot, type Unsubscribe } from 'firebase/firestore';
import { db, isCollabMode } from './firebase';
import type { DiagramNode, DiagramEdge } from '../types';

type RoomState = {
  name: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  updatedAt: number;
};

let unsubscribe: Unsubscribe | null = null;
let pushTimer: ReturnType<typeof setTimeout>;

export function createRoomId(): string {
  return Math.random().toString(36).slice(2, 8);
}

export function getRoomUrl(roomId: string): string {
  return `${window.location.origin}${window.location.pathname}#room=${roomId}`;
}

export function parseRoomFromHash(hash: string): string | null {
  if (!hash.startsWith('#room=')) return null;
  return hash.slice(6) || null;
}

export async function createRoom(
  roomId: string,
  name: string,
  nodes: DiagramNode[],
  edges: DiagramEdge[]
): Promise<void> {
  if (!db || !isCollabMode) return;
  const ref = doc(db, 'rooms', roomId);
  await setDoc(ref, {
    name,
    nodes: JSON.parse(JSON.stringify(nodes)),
    edges: JSON.parse(JSON.stringify(edges)),
    updatedAt: Date.now(),
  } satisfies RoomState);
}

export function joinRoom(
  roomId: string,
  onRemote: (state: { name: string; nodes: DiagramNode[]; edges: DiagramEdge[] }) => void
): void {
  if (!db || !isCollabMode) return;
  leaveRoom();
  const ref = doc(db, 'rooms', roomId);
  unsubscribe = onSnapshot(ref, (snap) => {
    const data = snap.data() as RoomState | undefined;
    if (data) {
      onRemote({ name: data.name, nodes: data.nodes, edges: data.edges });
    }
  });
}

export function pushState(
  roomId: string,
  name: string,
  nodes: DiagramNode[],
  edges: DiagramEdge[]
): void {
  if (!db || !isCollabMode) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(async () => {
    const ref = doc(db, 'rooms', roomId);
    await setDoc(ref, {
      name,
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges)),
      updatedAt: Date.now(),
    } satisfies RoomState);
  }, 600);
}

export function leaveRoom(): void {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
  clearTimeout(pushTimer);
}
