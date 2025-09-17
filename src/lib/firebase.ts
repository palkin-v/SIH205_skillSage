
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut as firebaseSignOut, getRedirectResult } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0EyXBO_P22bvzsAInIO0dok1T3lvBbxw",
  authDomain: "4676698599.firebaseapp.com",
  projectId: "4676698599",
  storageBucket: "4676698599.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    // Try to sign in with a popup first
    return await signInWithPopup(auth, googleProvider);
  } catch (error: any) {
    // If the popup is blocked, use redirect as a fallback
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
      await signInWithRedirect(auth, googleProvider);
      // The page will redirect, so the promise may not resolve here.
      // The result is handled on page load with getRedirectResult.
      return null;
    }
    // Re-throw other errors
    throw error;
  }
};


export const signOut = () => {
  return firebaseSignOut(auth);
};

export { auth, getRedirectResult };
