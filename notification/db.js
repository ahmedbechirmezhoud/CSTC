import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBQH0riI5e09XX-pEcjvhCMAQEz2gvhDMY",
    authDomain: "cstc-2a071.firebaseapp.com",
    projectId: "cstc-2a071",
    storageBucket: "cstc-2a071.appspot.com",
    messagingSenderId: "669579499696",
    appId: "1:669579499696:web:dab2291f0cc2886d0b8375",
    measurementId: "G-LYQL9V1W9K"
  };

initializeApp(firebaseConfig);

const db = getFirestore();


export async function getTokens(Segment="ALL"){
  let PushTokens = [];
  
  let querySnapshot;

  if(Segment === "ALL"){
    querySnapshot = await getDocs(collection(db, "users/"));
  }else if(Segment === "STAFF"){
    querySnapshot = await getDocs(collection(db, "users/"), where("staff", "==", true));
  }else if(Segment === "COMITE"){
    querySnapshot = await getDocs(collection(db, "users/"), where("comite", "==", true));
  }else if(Segment === "HACKATHON"){
    querySnapshot = await getDocs(collection(db, "users/"), where("hackathon", "==", true));
  }


  querySnapshot.forEach((doc) => {
    if(doc.data()?.notificationToken){
      PushTokens.push(doc.data()?.notificationToken);
      console.log("sending to " + doc.data()?.name);
    }
  });

  return PushTokens;
}