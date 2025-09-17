
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut as firebaseSignOut, getRedirectResult } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0EyXBO_P22bvzsAInIO0dok1T3lvBbxw",
  authDomain: "studio-4676698599-82985.firebaseapp.com",
  projectId: "studio-4676698599-82985",
  storageBucket: "studio-4676698599-82985.firebasestorage.app",
  messagingSenderId: "236938280738",
  appId: "1:236938280738:web:d65c4b24a150edb3562f7b"

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
