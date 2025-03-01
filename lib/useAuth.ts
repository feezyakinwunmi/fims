// lib/useAuth.ts
"use client"

import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          setUser(JSON.parse(userData));
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Initial check
    checkAuth();

    // Listen for storage changes
    const storageListener = () => checkAuth();
    window.addEventListener('storage', storageListener);

    return () => window.removeEventListener('storage', storageListener);
  }, []);

  return { user, loading };
};