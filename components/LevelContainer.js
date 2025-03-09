import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import useUserPreferences from "../customHooks/useUserPreference";
import ButtonBox1 from "../components/ButtonBox1";
import ButtonBox2 from "./ButtonBox2";
import ButtonBox3 from "./ButtonBox3";
import ButtonBox4 from "./ButtonBox4";

const LevelContainer = ({
  text,
  navigateToGame,
  isComplete,
  height = 120,
  index, // Pass index when rendering
}) => {
  const { fontSize, buttonSize } = useUserPreferences();

  // Array of ButtonBox components for cycling
  const buttonBoxes = [ButtonBox1, ButtonBox2, ButtonBox3, ButtonBox4];

  // Select ButtonBox based on the index for true alternation
  const ButtonBoxComponent = buttonBoxes[index % buttonBoxes.length];

  const brightColors = useMemo(() => {
    const colors = [
      { color: "#FF3B3B", text: "white" },
      { color: "#FF6347", text: "white" },
      { color: "#FF4500", text: "white" },
      { color: "#FFA500", text: "black" },
      { color: "#FFD700", text: "black" },
      { color: "#FF69B4", text: "white" },
      { color: "#FF1493", text: "white" },
      { color: "#FF00FF", text: "white" },
      { color: "#DA70D6", text: "white" },
      { color: "#9932CC", text: "white" },
      { color: "#8A2BE2", text: "white" },
      { color: "#4B0082", text: "white" },
      { color: "#00BFFF", text: "black" },
      { color: "#1E90FF", text: "white" },
      { color: "#00CED1", text: "black" },
      { color: "#20B2AA", text: "black" },
      { color: "#32CD32", text: "black" },
      { color: "#00FA9A", text: "black" },
      { color: "#ADFF2F", text: "black" },
      { color: "#7FFF00", text: "black" },
      { color: "#FF7F50", text: "white" },
      { color: "#DC143C", text: "white" },
      { color: "#FF8C00", text: "black" },
      { color: "#F08080", text: "black" },
      { color: "#00FF7F", text: "black" },
      { color: "#40E0D0", text: "black" },
    ];

    // Fisher-Yates Shuffle Algorithm
    return colors.sort(() => Math.random() - 0.5);
  }, []);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          transform: [{ scale: buttonSize }],
          maxHeight: height,
        },
      ]}
      onPress={navigateToGame}
    >
      {isComplete && (
        <Image
          source={require("../assets/images/star.png")}
          style={styles.star}
          resizeMode="stretch"
        />
      )}
      <ButtonBoxComponent
        color={brightColors[index].color}
        textColor={brightColors[index].text}
        text={text}
        fontSize={fontSize * 4}
      />
    </TouchableOpacity>
  );
};

export default LevelContainer;

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    height: "100%",
    flex: 1,
    position: "relative",
  },
  star: {
    position: "absolute",
    bottom: -10,
    left: "50%",
    transform: [{ translateX: -20 }],
    height: 40,
    width: 40,
    zIndex: 1,
  },
});
