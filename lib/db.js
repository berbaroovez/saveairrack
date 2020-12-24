import firebase from "firebase";

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}
export function createSite(data) {
  return firestore.collection("sites").add(data);
}

export function getToken(uid) {
  return firestore
    .collection("users")
    .doc(uid)
    .get()
    .then((response) => response.data());
}
export function getUsers() {
  return firestore
    .collection("users")
    .get()
    .then((response) => {
      response.forEach(function (doc) {
        console.log(doc.id, "=>", doc.data());
      });
    });
}
