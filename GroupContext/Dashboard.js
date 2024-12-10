import { createContext, useEffect, useState } from "react";
import { getSavedUser } from "../utilities/preferences";
import { createListener } from "../utilities/CreateListener";

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

      if (savedUser?.uid) {
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

        const unsubscribeEmotionTypes = createListener(
          `emotions/type`,
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

            setEmotionTypes(result);
          }
        );
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

        const unsubscribeMatchingEasy = createListener(
          `animals/matching/easy`,
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

            setMatchingEasy(result);
          }
        );

        const unsubscribeMatchingMedium = createListener(
          `animals/matching/medium`,
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

            setMatchingMedium(result);
          }
        );

        const unsubscribeMatchingHard = createListener(
          `animals/matching/hard`,
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

            setMatchingHard(result);
          }
        );

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

        const unsubscribeColors = createListener(
          `arts/colors`,
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

            setColors(result);
          }
        );

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
        const unsubscribeGameMatching = createListener(
          `games/matching`,
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

            setGameMatching(result);
          }
        );

        setFetching(false);

        // Cleanup listeners when the component unmounts
        return () => {
          unsubscribeEmotionTypes();
          unsubscribeEmotionMatching();
          unsubscribeMatchingEasy();
          unsubscribeMatchingMedium();
          unsubscribeMatchingHard();
          unsubscribeLetters();
          unsubscribeDndProgress();
          unsubscribeColors();
          unsubscribeBasicShapes();
          unsubscribeMatchingShapes();
          unsubscribeLoginDates();
          unsubscribeGameMatching();
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
