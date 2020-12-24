import { useAuth } from "../lib/auth";

import React, { useState, useEffect } from "react";
var OAuth = require("oauth");
export default function Index() {
  // var docRef = db.collection("users").doc(auth.user.uid);
  const [userInfo, setUserInfo] = useState(null);

  const auth = useAuth();
  return (
    <>
      {auth?.user ? (
        <>
          <button onClick={(e) => auth.signout()}>Sign Out</button>
        </>
      ) : (
        <button onClick={(e) => auth.signinWithTwitter()}>Sign In</button>
      )}
    </>
  );
}
