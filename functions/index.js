const admin = require("firebase-admin");
const functions = require("firebase-functions");
var Twitter = require("twitter");
var serviceAccount = require("./saveairrack-90c31-firebase-adminsdk-9vcw6-2cd9d3adfb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

exports.scheduledFunction = functions.pubsub
  .schedule("every 2 minutes")
  .onRun(async (context) => {
    // const docRef = db.collection("users").doc("alovelace");

    var client = new Twitter({
      consumer_key: "7O0lk3OqhBWS02nY5cdAOxWdx",
      consumer_secret: "X68Hx1AzvWlluBXMUJC8Xvh3CV3Za4IreJBTyuVdLxDXvbzWfY",
      access_token_key: "1276983345679908866-pkGAoirHjr1dvcTtGMP6AWSlaW8BQ3",
      access_token_secret: "ThIXBJohOOxiMdoe1kwA3PZOT52PqClWu7Pq66DrmFRzR",
    });
    const citiesRef = db.collection("users");

    var tweetTemplates = [
      "Lets get @airrack to a million sub before the end of the year click to sub http://bit.ly/SUB2AIRRACK #saveairrack",
      "Yo @airrack is less the 75k away from a million subs on youtube go sub http://bit.ly/SUB2AIRRACK #saveairrack",
      "Click this link -> http://bit.ly/SUB2AIRRACK <- help get @airrack to a million subs before 2021 #saveairrack",
      ".@airrack is stuck on an island until he gets a million subs on youtube go sub NOW! http://bit.ly/SUB2AIRRACK #saveairrack",
      "Hey you! Yes you! Come click on this link and check if you are subbed to @airrack on youtube http://bit.ly/SUB2AIRRACK #saveairrack",
      "For just 0$ a day You could sub to @airrack on youtube and save him from the island he is stuck on http://bit.ly/SUB2AIRRACK #saveairrack",
      "2021 is almost here! @airrack 's goal is to hit a million subs before the ball strikes midnight! Go Sub http://bit.ly/SUB2AIRRACK #saveairrack",
      "Come sign up to help save @airrack from the island he is stuck on. All it takes is a sub to him on youtube! http://bit.ly/SUB2AIRRACK #saveairrack",
      "Ay You! 👆 come and sub to @airrack 's youtube channel and push him to a million subs http://bit.ly/SUB2AIRRACK #saveairrack",
    ];

    const snapshot = await citiesRef.get();
    snapshot.forEach((doc) => {
      var client = new Twitter({
        consumer_key: "7O0lk3OqhBWS02nY5cdAOxWdx",
        consumer_secret: "X68Hx1AzvWlluBXMUJC8Xvh3CV3Za4IreJBTyuVdLxDXvbzWfY",
        access_token_key: doc.data().accessToken,
        access_token_secret: doc.data().accessSecret,
      });
      var whichStatus = Math.floor(Math.random() * Math.floor(9));

      client.post(
        "statuses/update",
        { status: tweetTemplates[whichStatus] },
        function (error, tweet, response) {
          if (error) throw error;
          console.log(tweet); // Tweet body.
          console.log(response); // Raw response object.
        }
      );
    });

    console.log("This will be run every 7 minutes!");
    return null;
  });
