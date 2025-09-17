
"use client";

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signOut as firebaseSignOut, getRedirectResult } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
         // Check for redirect result if no user is found initially
        getRedirectResult(auth)
          .then((result) => {
            if (result && result.user) {
              setUser(result.user);
              router.push('/dashboard');
            }
          })
          .catch((error) => {
            console.error("Error getting redirect result:", error);
          })
          .finally(() => {
             setLoading(false);
          });
      }
    });

    return () => unsubscribe();
  }, [router]);

  const signOut = async () => {
    try {
      await firebaseSignOut();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return { user, loading, signOut };
}
