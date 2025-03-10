import { getCurrentDate } from "./Date";

import { getData, storeData } from "./LocalStorage";

// Initialize the Realtime Database

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
  const userInfo = await getData("userInfo");

  const newUserData = { ...userInfo, username: name };

  await storeData("userInfo", newUserData);
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
