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
  index,
}) => {
  const { fontSize, buttonSize } = useUserPreferences();

  // Array of ButtonBox components for cycling
  const buttonBoxes = [ButtonBox1, ButtonBox2, ButtonBox3, ButtonBox4];

  // Select ButtonBox based on the index for true alternation
  const ButtonBoxComponent = buttonBoxes[index % buttonBoxes.length];

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
        color={"#7F00FF"}
        textColor={"#ffffff"}
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
