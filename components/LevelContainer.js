import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import useUserPreferences from "../customHooks/useUserPreference";

const LevelContainer = ({ text, imageSource, navigateToGame, isComplete }) => {
  const { fontSize, buttonFontColor, buttonSize } = useUserPreferences();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          transform: [{ scale: buttonSize }],
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
      <ImageBackground style={styles.img} source={imageSource}>
        <Text
          style={[
            styles.text,
            {
              fontSize: fontSize,
              color: buttonFontColor,
            },
          ]}
        >
          {text}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default LevelContainer;

const styles = StyleSheet.create({
  container: {
    width: 120,
    aspectRatio: 1,
    borderRadius: 20,
    margin: 15,
  },
  img: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "700",
  },
  star: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 25,
    width: 25,
    zIndex: 1,
  },
});
