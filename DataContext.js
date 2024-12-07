import { createContext, useEffect, useState } from "react";
import { usePlaySound } from "./customHooks/PlaySound";
import * as Speech from "expo-speech";

export const Context = createContext(null);

const DataContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const sound = usePlaySound();

  useEffect(() => {
    speak("");
    sound();
  }, []);

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
    <Context.Provider value={{ user, setUser, sound, speak, stop }}>
      {children}
    </Context.Provider>
  );
};

export default DataContext;
