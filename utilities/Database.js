import { getDatabase, ref, update } from "firebase/database";
import { getSavedUser } from "./preferences";
import { getCurrentDate } from "./Date";

import { storeData } from "./LocalStorage";

// Initialize the Realtime Database
const db = getDatabase();

export const updateMatching = async (uid, key, setState, state) => {
  if (!state || state?.length <= 0) {
    return;
  }

  try {
    const newState = state.map((lvl) => {
      if (lvl.uid === uid) {
        return { ...lvl, complete: true };
      }
      return lvl;
    });

    storeData(key, newState);

    setState(newState);

    // Reference to the user's data
  } catch (error) {
    console.error("Error updating data: ", error);
  }
};

export const updateUsername = async (name) => {
  // Reference to the user's data
  const user = await getSavedUser();
  const userRef = ref(db, `users/${user.uid}`);

  try {
    // Update the specific field in the node
    await update(userRef, {
      username: name,
    });
  } catch (error) {
    console.error("Error updating data: ", error);
  }
};

export const updateTodaysMathAlgebra = (op) => {
  let operation = "addition";

  switch (op) {
    case "+":
      operation = "addition";
      break;
    case "-":
      operation = "subtraction";
      break;
    case "*":
      operation = "multiplication";
      break;
    default:
      operation = "division";
      break;
  }

  const currentDate = getCurrentDate();
};
