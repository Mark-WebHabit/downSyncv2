// realtimeDatabase.js
import { ref, onValue, off } from "firebase/database";
import { db } from "../firebase";

const createListener = (path, uid, callback) => {
  const dbRef = ref(db, `${path}/${uid}`);

  const listener = onValue(
    dbRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      } else {
        console.log("No data found for the given UID");
      }
    },
    (error) => {
      console.error("Failed to listen to the data", error);
    }
  );

  // Return the function to remove the listener
  return () => {
    off(dbRef, "value", listener);
  };
};

export { createListener };
