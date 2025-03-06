import { createContext, useEffect, useState } from "react";
import { usePlaySound } from "./customHooks/PlaySound";
import * as Speech from "expo-speech";
import { getSavedUser } from "./utilities/preferences";
import { createLoginDocument } from "./utilities/CreateGameInstance";
import { Dimensions } from "react-native";

export const Context = createContext(null);

const { width, height } = Dimensions.get("window");

const DataContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [area, setArea] = useState(0);
  useEffect(() => {
    setArea(width * height);
  }, [height, width]);

  const sound = usePlaySound();

  useEffect(() => {
    (async function () {
      const user = await getSavedUser();
      setUser(user);
    })();
  }, []);

  useEffect(() => {
    speak("");
    sound();
  }, []);

  useEffect(() => {
    if (user && user?.username) {
      createLoginDocument(user?.username);
    }
  }, [user]);

  const speak = (message, rate = 1) => {
    Speech.stop();

    Speech.speak(message, {
      rate,
      language: "en-US",
    });
  };

  const stop = () => {
    Speech.stop();
  };

  return (
    <Context.Provider
      value={{ user, setUser, sound, speak, stop, width, height, area }}
    >
      {children}
    </Context.Provider>
  );
};

export default DataContext;
