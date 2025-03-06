import React, { createContext, useEffect, useState } from "react";
import { getSavedUser } from "../utilities/preferences";
import { getData } from "../utilities/LocalStorage";

export const WordContext = createContext(null);

const WordContextProvider = ({ children }) => {
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState(null);
  const [dndObjects, setDndObjects] = useState(null);
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    async function getUser() {
      const savedUser = await getSavedUser();
      setUser(savedUser);
      const lettersData = await getData("letters");
      const dnd = await getData("dnd");

      if (savedUser?.username) {
        setLetters(lettersData);
        setDndObjects(dnd);

        setFetching(false);
      }
    }
    getUser();
  }, []);

  return (
    <WordContext.Provider
      value={{ fetching, user, letters, setLetters, dndObjects, setDndObjects }}
    >
      {children}
    </WordContext.Provider>
  );
};

export default WordContextProvider;
