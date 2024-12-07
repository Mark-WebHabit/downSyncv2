import { getDatabase, ref, update } from "firebase/database";
import { getSavedUser } from "./preferences";
import { getCurrentDate } from "./Date";
// Initialize the Realtime Database
const db = getDatabase();

export const updateMatchingEasyComplete = async (uid) => {
  // Reference to the user's data
  const user = await getSavedUser();
  const userRef = ref(db, `games/matching/easy/${user.uid}/${uid}`);

  try {
    // Update the specific field in the node
    await update(userRef, {
      complete: true,
    });
  } catch (error) {
    console.error("Error updating data: ", error);
  }
};

export const updateMatchingMediumComplete = async (uid) => {
  // Reference to the user's data
  const user = await getSavedUser();
  const userRef = ref(db, `games/matching/medium/${user.uid}/${uid}`);

  try {
    // Update the specific field in the node
    await update(userRef, {
      complete: true,
    });
  } catch (error) {
    console.error("Error updating data: ", error);
  }
};

export const updateMatchingHardComplete = async (uid) => {
  // Reference to the user's data
  const user = await getSavedUser();
  const userRef = ref(db, `games/matching/hard/${user.uid}/${uid}`);

  try {
    // Update the specific field in the node
    await update(userRef, {
      complete: true,
    });
  } catch (error) {
    console.error("Error updating data: ", error);
  }
};

export const udapteLettersComplete = async (uid) => {
  // Reference to the user's data
  const user = await getSavedUser();
  const userRef = ref(db, `words/letters/${user.uid}/${uid}`);

  try {
    // Update the specific field in the node
    await update(userRef, {
      complete: true,
    });
  } catch (error) {
    console.error("Error updating data: ", error);
  }
};

export const updateDandDComplete = async (uid) => {
  // Reference to the user's data
  const user = await getSavedUser();
  const userRef = ref(db, `words/dnd/${user.uid}/${uid}`);

  try {
    // Update the specific field in the node
    await update(userRef, {
      complete: true,
    });
  } catch (error) {
    console.error("Error updating data: ", error);
  }
};

export const updateEmotionTypeComplete = async (uid) => {
  // Reference to the user's data
  const user = await getSavedUser();
  const userRef = ref(db, `emotions/type/${user.uid}/${uid}`);

  try {
    // Update the specific field in the node
    await update(userRef, {
      complete: true,
    });
  } catch (error) {
    console.error("Error updating data: ", error);
  }
};

export const updateEmotionTypeMatching = async (uid) => {
  // Reference to the user's data
  const user = await getSavedUser();
  const userRef = ref(db, `emotions/matching/${user.uid}/${uid}`);

  try {
    // Update the specific field in the node
    await update(userRef, {
      complete: true,
    });
  } catch (error) {
    console.error("Error updating data: ", error);
  }
};

export const updateBasicColors = async (uid) => {
  // Reference to the user's data
  const user = await getSavedUser();
  const userRef = ref(db, `arts/colors/${user.uid}/${uid}`);

  try {
    // Update the specific field in the node
    await update(userRef, {
      complete: true,
    });
  } catch (error) {
    console.error("Error updating data: ", error);
  }
};

export const updateBasicShapes = async (uid) => {
  // Reference to the user's data
  const user = await getSavedUser();
  const userRef = ref(db, `arts/shapes/basic/${user.uid}/${uid}`);

  try {
    // Update the specific field in the node
    await update(userRef, {
      complete: true,
    });
  } catch (error) {
    console.error("Error updating data: ", error);
  }
};

export const updateMatchingShapes = async (uid) => {
  // Reference to the user's data
  const user = await getSavedUser();
  const userRef = ref(db, `arts/shapes/matching/${user.uid}/${uid}`);

  try {
    // Update the specific field in the node
    await update(userRef, {
      complete: true,
    });
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

  console.log(currentDate);
};
