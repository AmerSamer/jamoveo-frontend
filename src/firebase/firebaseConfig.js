/**
 * Firebase Configuration & Initialization
 *
 * - Initializes the Firebase app using environment variables.
 * - Exports Firebase Auth instance to be used throughout the app.
 * - Uses Vite's `import.meta.env` to securely access environment variables.
 */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// 🔐 Firebase project configuration (stored securely in .env)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// 🔐 Export Firebase Auth instance
export const auth = getAuth(app);