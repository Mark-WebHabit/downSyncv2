import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import MainContainer from "../components/MainContainer";
import { ImageBackground } from "expo-image";
import useUserPreferences from "../customHooks/useUserPreference";

const Operations = ({ navigation }) => {
  const { fontSize, buttonFontColor, buttonSize, bodyText } =
    useUserPreferences();
  return (
    <MainContainer
      navigation={navigation}
      showSetting={false}
      addStyle={styles.container}
    >
      <TouchableOpacity
        style={[
          styles.button,
          {
            transform: [{ scale: buttonSize }],
          },
        ]}
        onPress={() => navigation.navigate("MathQuestions", { op: "plus" })}
      >
        <ImageBackground
          source={require("../assets/images/buttonblue.png")}
          style={styles.bg}
        >
          <Text
            style={[
              styles.op,
              {
                fontSize: fontSize,
                color: buttonFontColor,
              },
            ]}
          >
            Addition
          </Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            transform: [{ scale: buttonSize }],
          },
        ]}
        onPress={() => navigation.navigate("MathQuestions", { op: "minus" })}
      >
        <ImageBackground
          source={require("../assets/images/buttonwhite.png")}
          style={styles.bg}
        >
          <Text
            style={[
              styles.op,
              {
                fontSize: fontSize,
                color: buttonFontColor,
              },
            ]}
          >
            Subtraction
          </Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            transform: [{ scale: buttonSize }],
          },
        ]}
        onPress={() => navigation.navigate("MathQuestions", { op: "times" })}
      >
        <ImageBackground
          source={require("../assets/images/buttongreen.png")}
          style={styles.bg}
        >
          <Text
            style={[
              styles.op,
              {
                fontSize: fontSize,
                color: buttonFontColor,
              },
            ]}
          >
            Multiplication
          </Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            transform: [{ scale: buttonSize }],
          },
        ]}
        onPress={() => navigation.navigate("MathQuestions", { op: "divide" })}
      >
        <ImageBackground
          source={require("../assets/images/buttonmint.png")}
          style={styles.bg}
        >
          <Text
            style={[
              styles.op,
              {
                fontSize: fontSize,
                color: buttonFontColor,
              },
            ]}
          >
            Division
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </MainContainer>
  );
};

export default Operations;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    width: "50%",
    height: "20%",
  },
  bg: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  op: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
