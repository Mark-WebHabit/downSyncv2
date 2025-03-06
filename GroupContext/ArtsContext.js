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
      const basicShapesData = await getData("basicShapes");
      const shapesMatchingData = await getData("shapesMatching");

      if (savedUser?.username) {
        setColors(colorsData);
        setBasicShapes(basicShapesData);
        setShapesMatching(shapesMatchingData);

        setFetching(false);
      }
    }
    getUser();
  }, []);

  return (
    <ArtContext.Provider
      value={{
        fetching,
        user,
        colors,
        setColors,
        basicShapes,
        setBasicShapes,
        shapesMatching,
        setShapesMatching,
      }}
    >
      {children}
    </ArtContext.Provider>
  );
};

export default ArtContextProvider;
