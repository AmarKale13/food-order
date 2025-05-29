// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)
      .catch(err => { setError(err.message); throw err; });

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)
      .catch(err => { setError(err.message); throw err; });

  // Wrap Firebase sign-out
  const signOut = () =>
    firebaseSignOut(auth).catch(err => {
      setError(err.message);
      throw err;
    });

  // Subscribe to auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Context value
  const value = { currentUser, loading, error, signUp, signIn, signOut };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
