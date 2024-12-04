import { set, push, ref as sref } from "firebase/database";
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
import { colors } from "../assets/colors_flatfiledb_local";
export const CreateGameInstanceMatchingEasy = async (key) => {
  try {
    // Base reference for the game instance
    const baseRef = sref(db, `games/matching/easy/${key}`);

    // Create an array of promises for all animal entries
    const promises = animals.map((_, i) => {
      const newRef = push(baseRef); // Generate a unique key
      return set(newRef, {
        name: i,
        complete: false,
      });
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
    return "All animals inserted successfully";
  } catch (error) {
    console.error("Error in CreateGameInstanceMatchingEasy with push:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const CreateGameInstanceMatchingMedium = async (key) => {
  try {
    // Base reference for the game instance
    const baseRef = sref(db, `games/matching/medium/${key}`);

    // Create an array of promises for all animal entries
    const promises = animalsName.map((_, i) => {
      const newRef = push(baseRef); // Generate a unique key
      return set(newRef, {
        name: i,
        complete: false,
      });
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
    return "All animals inserted successfully";
  } catch (error) {
    console.error("Error in CreateGameInstanceMatchingEasy with push:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const CreateGameInstanceMatchingHard = async (key) => {
  try {
    // Base reference for the game instance
    const baseRef = sref(db, `games/matching/hard/${key}`);

    // Create an array of promises for all animal entries
    const promises = animalsDescribe.map((_, i) => {
      const newRef = push(baseRef); // Generate a unique key
      return set(newRef, {
        name: i,
        complete: false,
      });
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
    return "All animals inserted successfully";
  } catch (error) {
    console.error("Error in CreateGameInstanceMatchingEasy with push:", error);
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
    console.error("Error in CreateGameInstanceMatchingEasy with push:", error);
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
    console.error("Error in CreateGameInstanceMatchingEasy with push:", error);
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
    console.error("Error in CreateGameInstanceMatchingEasy with push:", error);
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
    console.error("Error in CreateGameInstanceMatchingEasy with push:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
export const CreateArtColorsInstance = async (key) => {
  try {
    // Base reference for the game instance
    const baseRef = sref(db, `arts/colors/${key}`);

    // Create an array of promises for all animal entries
    const promises = colors.map((_, i) => {
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
    console.error("Error in CreateGameInstanceMatchingEasy with push:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
