import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  console.log("storing " + key);

  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Failed to save data", e);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    let response = JSON.parse(jsonValue);

    while (typeof response === "string") {
      console.log("converting data to json");

      response = JSON.parse(response);
    }

    return response;
  } catch (e) {
    console.error("Failed to fetch data", e);
  }
};
