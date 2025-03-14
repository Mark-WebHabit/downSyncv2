import React, { createContext, useEffect, useState } from "react";
import { getSavedUser } from "../utilities/preferences";
import { getData } from "../utilities/LocalStorage";

export const WordContext = createContext(null);

const WordContextProvider = ({ children }) => {
  const [fetching, setFetching] = useState(true);
  const [dndObjects, setDndObjects] = useState(null);
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    async function getUser() {
      const lettersData = await getData("letters");
      const dnd = await getData("dnd");

      setLetters(lettersData);
      setDndObjects(dnd);

      setFetching(false);
    }
    getUser();
  }, []);

  return (
    <WordContext.Provider
      value={{ fetching, letters, setLetters, dndObjects, setDndObjects }}
    >
      {children}
    </WordContext.Provider>
  );
};

export default WordContextProvider;
