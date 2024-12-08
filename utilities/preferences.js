import AsyncStorage from "@react-native-async-storage/async-storage";
// import { emitPreferenceChange } from "./EventEMitter";

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
    const user = await AsyncStorage.getItem("user");
    const uid = await AsyncStorage.getItem("uid");

    return { user: user, uid };
  } catch (error) {
    console.log(error);
  }
};

export const checkFirstLaunch = async () => {
  try {
    const alphav1 = await AsyncStorage.getItem("alphav1.1");
    if (alphav1 === null) {
      // This is the first launch
      removePreference("uid");
      removePreference("user");
      await AsyncStorage.setItem("alphav1.1", "false");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking first launch:", error);
    return false;
  }
};
