
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// A mock user type
export interface SimpleUser {
  displayName: string | null;
  email: string | null;
  photoURL?: string | null; // Keep photoURL for compatibility with UI
}

export function useAuth() {
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // On component mount, check if user data exists in localStorage
    try {
      const storedUser = localStorage.getItem('skillSageUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('skillSageUser');
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = (userData: { displayName: string, email: string }) => {
    const newUser: SimpleUser = {
      displayName: userData.displayName,
      email: userData.email,
      photoURL: `https://api.dicebear.com/8.x/initials/svg?seed=${userData.displayName}`
    };
    localStorage.setItem('skillSageUser', JSON.stringify(newUser));
    setUser(newUser);
  };

  const signOut = () => {
    localStorage.removeItem('skillSageUser');
    setUser(null);
    router.push('/');
  };

  return { user, loading, signIn, signOut };
}
