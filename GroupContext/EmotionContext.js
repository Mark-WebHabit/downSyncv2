import React, { createContext, useEffect, useState } from "react";
import { getSavedUser } from "../utilities/preferences";
import { createListener } from "../utilities/CreateListener";
import { getData } from "../utilities/LocalStorage";

export const EmotionContext = createContext(null);

const EmotionContextProvider = ({ children }) => {
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState(null);
  const [emotionTypes, setEmotionTypes] = useState(null);
  const [emotionMatching, setEmotionMatching] = useState(null);
  useEffect(() => {
    async function getUser() {
      const savedUser = await getSavedUser();
      setUser(savedUser);

      const typeEmotions = await getData("typeEmotions");

      if (savedUser?.uid) {
        setEmotionTypes(typeEmotions);

        const unsubscribeEmotionMatching = createListener(
          `emotions/matching`,
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

            setEmotionMatching(result);
          }
        );
        setFetching(false);
        // Add more listeners here as needed
        // const unsubscribeAnother = createListener('another_path', savedUser.uid, (data) => { ... });

        // Cleanup listeners when the component unmounts
        return () => {
          unsubscribeEmotionTypes();
          unsubscribeEmotionMatching();

          // unsubscribeAnother();
        };
      }
    }
    getUser();
  }, []);

  return (
    <EmotionContext.Provider
      value={{
        fetching,
        user,
        emotionTypes,
        setEmotionTypes,
        emotionMatching,
        setEmotionMatching,
      }}
    >
      {children}
    </EmotionContext.Provider>
  );
};

export default EmotionContextProvider;
