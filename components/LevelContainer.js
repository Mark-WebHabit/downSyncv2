import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import useUserPreferences from "../customHooks/useUserPreference";
import ButtonBox1 from "../components/ButtonBox1";
import ButtonBox2 from "./ButtonBox2";
import ButtonBox3 from "./ButtonBox3";
const LevelContainer = ({
  text,
  navigateToGame,
  isComplete,
  height = 120,
  color = "red",
}) => {
  const { fontSize, buttonFontColor, buttonSize } = useUserPreferences();

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
      <ButtonBox3
        color={color}
        textColor={buttonFontColor}
        text={text}
        fontSize={fontSize * 3.5}
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
