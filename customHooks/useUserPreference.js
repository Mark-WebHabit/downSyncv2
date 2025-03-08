import { useState, useEffect } from "react";
import { getPreference } from "../utilities/preferences";

const useUserPreferences = () => {
  const [fontSize, setFontSize] = useState(40); // Default medium size 40
  const [buttonFontColor, setButtonFontColor] = useState("#FFFFFF");
  const [buttonSize, setButtonSize] = useState(1); // Default medium scale 1
  const [bodyText, setBodyText] = useState(20);

  useEffect(() => {
    const fetchPreferences = async () => {
      const fs = await getPreference("fontSize");
      const bfc = await getPreference("buttonFontColor");
      const bs = await getPreference("buttonSize");
      const bt = await getPreference("bodyText");

      setFontSize(() => {
        if (fs === "large") return 50;
        if (fs === "small") return 25;
        return 35; // Default medium size 40
      });

      setButtonFontColor(bfc || "#FFFFFF");

      setButtonSize(() => {
        if (bs === "large") return 1.2;
        if (bs === "small") return 0.8;
        return 1; // Default medium scale 1
      });

      setBodyText(() => {
        if (bt == "small") return 15;
        if (bt == "large") return 25;
        return 20;
      });
    };

    fetchPreferences();

    // Listen for preference changes
    // preferenceEvents.on("preferenceChanged", fetchPreferences);

    // Clean up the event listener
    // return () => {
    //   preferenceEvents.off("preferenceChanged", fetchPreferences);
    // };
  }, []);

  return { fontSize, buttonFontColor, buttonSize, bodyText };
};

export default useUserPreferences;
