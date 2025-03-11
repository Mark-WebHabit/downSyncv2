import { storeData } from "../utilities/LocalStorage";

// Function to create a new login document
export const createLoginDocument = async (username) => {
  if (username) {
    const logins = [
      {
        login: new Date().toISOString(),
        current: true,
        logout: "",
      },
    ];

    try {
      // Store login time
      await storeData("logins", logins);
    } catch (error) {
      console.error("Error setting login time:", error);
    }
  }
};

export const createGameInstance = async () => {
  try {
    const easyData = require("../assets/db/animals/easy.json");
    const mediumData = require("../assets/db/animals/medium.json");
    const hardData = require("../assets/db/animals/hard.json");
    const objectMatchingData = require("../assets/db/games/matching.json");
    const objectMatchingMedium = require("../assets/db/games/matchingmedium.json");
    const letters = require("../assets/db/words/letters.json");
    const dnd = require("../assets/db/words/dnd.json");
    const colors = require("../assets/db/arts/colors.json");
    const basicShapes = require("../assets/db/arts/basicShapes.json");
    const shapesMatching = require("../assets/db/arts/basicShapes.json");
    const emotionsType = require("../assets/db/emotions/typeEmotions.json");
    const emotionsMatching = require("../assets/db/emotions/emotionMatching.json");

    await storeData("easy", easyData);
    await storeData("medium", mediumData);
    await storeData("hard", hardData);
    await storeData("objectMatching", objectMatchingData);
    await storeData("objectMatchingMedium", objectMatchingMedium);
    await storeData("letters", letters);
    await storeData("dnd", dnd);
    await storeData("colors", colors);
    await storeData("basicShapes", basicShapes);
    await storeData("shapesMatching", shapesMatching);
    await storeData("typeEmotions", emotionsType);
    await storeData("emotionsMatching", emotionsMatching);
  } catch (error) {
    console.error("Error in CreateGameInstance with push:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
