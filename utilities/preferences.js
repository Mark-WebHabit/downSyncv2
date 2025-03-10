import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "./LocalStorage";

// Function to get a preference
export const getPreference = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // Preference found
      return value;
    }
  } catch (e) {
    console.error("Failed to fetch preference", e);
  }
  // Preference not found
  return null;
};

// Function to save a preference
export const savePreference = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    // emitPreferenceChange();
  } catch (e) {
    console.error("Failed to save preference", e);
  }
};

export const removePreference = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to remove preference", e);
  }
};

export const getSavedUser = async () => {
  try {
    const userInfo = await getData("userInfo");

    if (userInfo?.username) {
      return { username: userInfo.username, createdAt: userInfo.createdAt };
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const checkFirstLaunch = async () => {
  try {
    const userInfo = await getData("userInfo");

    if (userInfo === null) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking first launch:", error);
    return false;
  }
};
