import { ref, get } from "firebase/database";
import { db } from "../firebase";

export const getUserGameInstanceMatchingEasy = async (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      // get matching game easy
      const matchingEasyRef = ref(db, `games/matching/easy/${key}`);
      const snapshot = await get(matchingEasyRef);

      if (snapshot.exists()) {
        const data = snapshot.val();

        return resolve(data);
      } else {
        return resolve(null);
      }
    } catch (error) {
      reject(error.message);
    }
  });
};
