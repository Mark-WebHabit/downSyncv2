import React, { createContext, useEffect, useState } from "react";
import { getSavedUser } from "../utilities/preferences";
import { createListener } from "../utilities/CreateListener";
import { getData } from "../utilities/LocalStorage";

export const ArtContext = createContext(null);

const ArtContextProvider = ({ children }) => {
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState(null);
  const [colors, setColors] = useState(null);
  const [basicShapes, setBasicShapes] = useState(null);
  const [shapesMatching, setShapesMatching] = useState(null);

  useEffect(() => {
    async function getUser() {
      const savedUser = await getSavedUser();
      setUser(savedUser);

      const colorsData = await getData("colors");

      if (savedUser?.uid) {
        setColors(colorsData);

        const unsubscribeBasicShapes = createListener(
          `arts/shapes/basic`,
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

            setBasicShapes(result);
          }
        );
        const unsubscribeMatchingShapes = createListener(
          `arts/shapes/matching`,
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

            setShapesMatching(result);
          }
        );

        setFetching(false);
        // Add more listeners here as needed
        // const unsubscribeAnother = createListener('another_path', savedUser.uid, (data) => { ... });

        // Cleanup listeners when the component unmounts
        return () => {
          unsubscribeColors();
          unsubscribeBasicShapes();
          unsubscribeMatchingShapes();
          // unsubscribeAnother();
        };
      }
    }
    getUser();
  }, []);

  return (
    <ArtContext.Provider
      value={{ fetching, user, colors, setColors, basicShapes, shapesMatching }}
    >
      {children}
    </ArtContext.Provider>
  );
};

export default ArtContextProvider;
