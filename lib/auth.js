import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "./firebase";
const authContext = createContext();
import { createUser } from "./db";

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => {
  return useContext(authContext);
};
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleUser = (rawUser, accessTokenUser = null, userSecret = null) => {
    if (rawUser) {
      const user = formatUser(rawUser, accessTokenUser, userSecret);
      createUser(user.uid, user);

      setLoading(false);
      setUser(user);
      return user;
    } else {
      setLoading(false);
      setUser(false);
      return false;
    }
  };
  const signinWithTwitter = () => {
    setLoading(true);
    return (
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.TwitterAuthProvider())
        //   .then((response) => console.log(response.credential.accessToken));
        // .then((response) => console.log(response))
        .then((response) =>
          handleUser(
            response.user,
            response.credential.accessToken,
            response.credential.secret
          )
        )
    );
  };
  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
    return () => unsubscribe();
  }, []);
  return {
    user,
    loading,
    signinWithTwitter,
    signout,
  };
}
const formatUser = (user, token = null, secret = null) => {
  if (token && secret) {
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      provider: user.providerData[0].providerId,
      photoUrl: user.photoURL,
      refreshToken: user.refreshToken,
      accessToken: token,
      accessSecret: secret,
    };
  }
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    refreshToken: user.refreshToken,
  };
};
