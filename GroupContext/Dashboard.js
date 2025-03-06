import { createContext, useEffect, useState } from "react";
import { getSavedUser } from "../utilities/preferences";
import { createListener } from "../utilities/CreateListener";
import { getData } from "../utilities/LocalStorage";

export const ProgressContext = createContext(null);
const Dashboard = ({ children }) => {
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState(null);

  // data to track
  const [emotionTypes, setEmotionTypes] = useState(null);
  const [emotionMatching, setEmotionMatching] = useState(null);
  const [matchingEasy, setMatchingEasy] = useState(null);
  const [matchingMedium, setMatchingMedium] = useState(null);
  const [matchingHard, setMatchingHard] = useState(null);
  const [letters, setLetters] = useState(null);
  const [dndObjects, setDndObjects] = useState(null);
  const [colors, setColors] = useState(null);
  const [basicShapes, setBasicShapes] = useState(null);
  const [shapesMatching, setShapesMatching] = useState(null);
  const [gameMatching, setGameMatching] = useState(null);
  const [logins, setLogins] = useState(null);

  useEffect(() => {
    async function getUser() {
      const savedUser = await getSavedUser();
      setUser(savedUser);

      const matchingEasyData = await getData("easy");
      const matchingMediumData = await getData("medium");
      const matchingHardData = await getData("hard");
      const objectMatchingData = await getData("objectMatching");
      const lettersData = await getData("letters");
      const dndData = await getData("dnd");
      const colorsData = await getData("colors");
      const basicShapesData = await getData("basicShapes");
      const shapesMatchingData = await getData("shapesMatching");
      const emotionTypesData = await getData("typeEmotions");
      const emotionMatchingData = await getData("emotionsMatching");

      if (savedUser?.username) {
        setMatchingEasy(matchingEasyData);
        setMatchingMedium(matchingMediumData);
        setMatchingHard(matchingHardData);
        setGameMatching(objectMatchingData);
        setLetters(lettersData);
        setDndObjects(dndData);
        setColors(colorsData);
        setBasicShapes(basicShapesData);
        setShapesMatching(shapesMatchingData);
        setEmotionTypes(emotionTypesData);
        setEmotionMatching(emotionMatchingData);

        const unsubscribeLoginDates = createListener(
          `logins`,
          savedUser.uid,
          (data) => {
            const result = [];

            const keys = Object.keys(data);
            keys.forEach((key) => {
              const date = Object.values(data[key]);

              date.forEach((d) => {
                if (d.logoutTime) {
                  const obj = {
                    uid: key,
                    ...d,
                  };

                  result.push(obj);
                }
              });
            });
            const sorted = result.sort((a, b) => b.loginTime - a.loginTime);

            setLogins(sorted);
          }
        );

        setFetching(false);

        // Cleanup listeners when the component unmounts
        return () => {
          unsubscribeLoginDates();
        };
      }
    }
    getUser();
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        fetching,
        user,
        emotionTypes,
        emotionMatching,
        matchingEasy,
        matchingMedium,
        matchingHard,
        dndObjects,
        letters,
        colors,
        basicShapes,
        shapesMatching,
        logins,
        gameMatching,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export default Dashboard;
