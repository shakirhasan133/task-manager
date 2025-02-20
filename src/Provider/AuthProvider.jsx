import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth, provider } from "../Firebase/firebase.config";
import { useEffect, useState } from "react";

import axios from "axios";
import { AuthContext } from "./AuthContext";

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [Loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  // Sign in with Google
  const signInWithGoogleEmail = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  //   Sign Up With Email
  const signUpWithEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Sign in with Email
  const signInWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   SignOut
  const signOutUser = () => {
    return signOut(auth);
  };

  // Update User Name and profile Photo
  const updateUserData = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Password Reset
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  //   Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser?.email) {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/JWT`,
            { email: currentUser?.email },
            { withCredentials: true }
          );
          setUser(currentUser);
          setLoading(false);
        } else {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/logout`,
            {},
            {
              withCredentials: true,
            }
          );
          setUser(currentUser);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
      // setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    signInWithGoogleEmail,
    signUpWithEmail,
    signInWithEmail,
    Loading,
    setLoading,
    user,
    setUser,
    signOutUser,
    error,
    setError,
    updateUserData,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
