import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";

initializeApp();

export const db = getFirestore();

export async function getTokens(Segment="ALL"){
  let PushTokens = [];
  
  let querySnapshot;


  if(Segment === "ALL"){
    querySnapshot = db.collection("users");
  }else if(Segment === "STAFF"){
    querySnapshot = db.collection("users").where("staff", "==", true);
  }else if(Segment === "COMITE"){
    querySnapshot = db.collection("users").where("comite", "==", true);
  }else if(Segment === "HACKATHON"){
    querySnapshot = db.collection("users").where("hackathon", "==", true);
  }else{
    console.error("INVALID SEGMENT");
    return;
  }

  const docs = await querySnapshot.get();

  docs.forEach((doc) => {
    if(doc.data()?.notificationToken){
      PushTokens.push(doc.data()?.notificationToken);
      console.log("sending to " + doc.data()?.name);
    }
  })


  return PushTokens;
}