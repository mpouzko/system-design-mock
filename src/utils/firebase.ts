import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

const isCollab = import.meta.env.VITE_COLLAB === '1';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY as string | undefined;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined;
const appId = import.meta.env.VITE_FIREBASE_APP_ID as string | undefined;

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

export const isCollabMode = isCollab && !!apiKey && !!projectId;

if (isCollabMode) {
  app = initializeApp({
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  });
  db = getFirestore(app);
}

export { db };
