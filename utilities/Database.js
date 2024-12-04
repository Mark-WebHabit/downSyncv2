import { getDatabase, ref, update } from "firebase/database";
import { getSavedUser } from "./preferences";

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

// update matching easy level field
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
