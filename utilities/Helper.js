import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUser = async () => {
  const uid = await AsyncStorage.getItem("uid");

  return uid;
};
