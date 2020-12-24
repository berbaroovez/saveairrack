import { useAuth } from "../lib/auth";
import { getUsers } from "../lib/db";
import React, { useState, useEffect } from "react";
var OAuth = require("oauth");
export default function Index() {
  // var docRef = db.collection("users").doc(auth.user.uid);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    console.log("USER", getUsers());
  });

  function onButton() {
    var twitter_application_consumer_key = process.env.NEXT_PUBLIC_API_KEY; // API Key
    var twitter_application_secret = process.env.NEXT_PUBLIC_API_SECRET; // API Secret
    var twitter_user_access_token = userInfo.accessToken; // Access Token
    var twitter_user_secret = userInfo.secret; // Access Token Secret

    var oauth = new OAuth.OAuth(
      "https://api.twitter.com/oauth/request_token",
      "https://api.twitter.com/oauth/access_token",
      twitter_application_consumer_key,
      twitter_application_secret,
      "1.0A",
      null,
      "HMAC-SHA1"
    );

    var status = "TYthis is a test of the api";
    var postBody = {
      status: status,
    };

    oauth.post(
      "https://api.twitter.com/1.1/statuses/update.json",
      twitter_user_access_token, // oauth_token (user access token)
      twitter_user_secret, // oauth_secret (user secret)
      postBody, // post body
      "", // post content type ?
      function (err, data, res) {
        if (err) {
          console.log(err);
        } else {
          console.log("FUCK", data);
        }
      }
    );

    console.log("NADE IT");
  }
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
