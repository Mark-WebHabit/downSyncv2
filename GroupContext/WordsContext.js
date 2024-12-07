import React, { createContext, useEffect, useState } from "react";
import { getSavedUser } from "../utilities/preferences";
import { createListener } from "../utilities/CreateListener";

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

      if (savedUser?.uid) {
        const unsubscribeLetters = createListener(
          `words/letters`,
          savedUser.uid,
          (data) => {
            const result = [];

            const keys = Object.keys(data);
            keys.forEach((key) => {
              const obj = {
                uid: key,
                ...data[key],
              };

              result.push(obj);
            });

            setLetters(result);
          }
        );
        const unsubscribeDndProgress = createListener(
          `words/dnd`,
          savedUser.uid,
          (data) => {
            const result = [];

            const keys = Object.keys(data);
            keys.forEach((key) => {
              const obj = {
                uid: key,
                ...data[key],
              };

              result.push(obj);
            });

            setDndObjects(result);
          }
        );

        setFetching(false);
        // Add more listeners here as needed
        // const unsubscribeAnother = createListener('another_path', savedUser.uid, (data) => { ... });

        // Cleanup listeners when the component unmounts
        return () => {
          unsubscribeLetters();
          unsubscribeDndProgress();
          // unsubscribeAnother();
        };
      }
    }
    getUser();
  }, []);

  return (
    <WordContext.Provider value={{ fetching, user, letters, dndObjects }}>
      {children}
    </WordContext.Provider>
  );
};

export default WordContextProvider;
