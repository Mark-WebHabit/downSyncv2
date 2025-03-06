import { set, push, ref as sref, serverTimestamp } from "firebase/database";
import { onDisconnect } from "firebase/database";
import { db } from "../firebase";
import {
  animals,
  animalsName,
  animalsDescribe,
} from "../assets/animal_flatfiledb";

import { alphabetWords } from "../assets/letters_flatfiledb_local";
import { objects } from "../assets/objects_flatfiledb";
import { emotions } from "../assets/emotions_flatfiledb_local";
import { emotionSample } from "../assets/emotions_sample_flatfiledb_local";
import { colorsObj } from "../assets/colors_flatfiledb_local";
import { shapes } from "../assets/shapes_flatfiledb_local";
import { shapesObj } from "../assets/shapes_sample_flatfiledb_local";
import { getSavedUser } from "./preferences";
import { matching } from "../assets/matching_flatfiledb_local";
import { getCurrentDate } from "../utilities/Date";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeData } from "../utilities/LocalStorage";

// Function to create a new login document
export const createLoginDocument = async (uid) => {
  if (uid) {
    const currentDate = getCurrentDate();
    const userLoginsRef = sref(db, `logins/${uid}/${currentDate}`);

    // Create a new document with a unique ID
    const newLoginRef = await push(userLoginsRef, {
      loginTime: serverTimestamp(),
    });

    // Set up onDisconnect to log the logout time
    onDisconnect(newLoginRef)
      .update({
        logoutTime: serverTimestamp(),
      })
      .catch((error) => {
        console.error("Error setting onDisconnect:", error);
      });
  }
};

export const createGameInstance = async () => {
  try {
    const easyData = require("../assets/db/animals/easy.json");
    const mediumData = require("../assets/db/animals/medium.json");
    const hardData = require("../assets/db/animals/hard.json");

    storeData("easy", easyData);
    storeData("medium", mediumData);
    storeData("hard", hardData);
  } catch (error) {
    console.error("Error in CreateGameInstance with push:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const CreateWrodInstanceLetters = async (key) => {
  try {
    // Base reference for the game instance
    const baseRef = sref(db, `words/letters/${key}`);

    // Create an array of promises for all animal entries
    const promises = alphabetWords.map((_, i) => {
      const newRef = push(baseRef); // Generate a unique key
      return set(newRef, {
        name: i,
        complete: false,
      });
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
    return "All Letters are inserted";
  } catch (error) {
    console.error("Error in CreateWrodInstanceLetters with push:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
export const CreateWrodInstanceDragAndDrop = async (key) => {
  try {
    // Base reference for the game instance
    const baseRef = sref(db, `words/dnd/${key}`);

    // Create an array of promises for all animal entries
    const promises = objects.map((_, i) => {
      const newRef = push(baseRef); // Generate a unique key
      return set(newRef, {
        name: i,
        complete: false,
      });
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
    return "All Objects are inserted";
  } catch (error) {
    console.error("Error in CreateWrodInstanceDragAndDrop with push:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
export const CreateEmotionTypeINstance = async (key) => {
  try {
    // Base reference for the game instance
    const baseRef = sref(db, `emotions/type/${key}`);

    // Create an array of promises for all animal entries
    const promises = emotions.map((_, i) => {
      const newRef = push(baseRef); // Generate a unique key
      return set(newRef, {
        name: i,
        complete: false,
      });
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
    return "All emotions are inserted";
  } catch (error) {
    console.error("Error in CreateEmotionTypeINstance with push:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
export const CreateEmotionMatchingINstance = async (key) => {
  try {
    // Base reference for the game instance
    const baseRef = sref(db, `emotions/matching/${key}`);

    // Create an array of promises for all animal entries
    const promises = emotionSample.map((_, i) => {
      const newRef = push(baseRef); // Generate a unique key
      return set(newRef, {
        name: i,
        complete: false,
      });
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
    return "All emotions are inserted";
  } catch (error) {
    console.error("Error in CreateEmotionMatchingINstance with push:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
export const CreateArtColorsInstance = async (key) => {
  try {
    // Base reference for the game instance
    const baseRef = sref(db, `arts/colors/${key}`);

    // Create an array of promises for all animal entries
    const promises = colorsObj.map((_, i) => {
      const newRef = push(baseRef); // Generate a unique key
      return set(newRef, {
        name: i,
        complete: false,
      });
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
    return "All colors are inserted";
  } catch (error) {
    console.error("Error in CreateArtColorsInstance with push:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
export const CreateArtShapesBasicInstance = async (key) => {
  try {
    // Base reference for the game instance
    const baseRef = sref(db, `arts/shapes/basic/${key}`);

    // Create an array of promises for all animal entries
    const promises = shapes.map((_, i) => {
      const newRef = push(baseRef); // Generate a unique key
      return set(newRef, {
        name: i,
        complete: false,
      });
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
    return "All shapes are inserted";
  } catch (error) {
    console.error("Error in CreateArtShapesBasicInstance with push:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
export const CreateArtShapesBasicMatching = async (key) => {
  try {
    // Base reference for the game instance
    const baseRef = sref(db, `arts/shapes/matching/${key}`);

    // Create an array of promises for all animal entries
    const promises = shapesObj.map((_, i) => {
      const newRef = push(baseRef); // Generate a unique key
      return set(newRef, {
        name: i,
        complete: false,
      });
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
    return "All shapes are inserted";
  } catch (error) {
    console.error("Error in CreateArtShapesBasicMatching with push:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const CreateObjectMatching = async (key) => {
  try {
    // Base reference for the game instance
    const baseRef = sref(db, `games/matching/${key}`);

    // Create an array of promises for all animal entries
    const promises = matching.map((_, i) => {
      const newRef = push(baseRef); // Generate a unique key
      return set(newRef, {
        name: i,
        complete: false,
      });
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
    return "All objects are inserted";
  } catch (error) {
    console.error("Error in create matching objects with push:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
