import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import useUserPreferences from "../customHooks/useUserPreference";

import { Context } from "../DataContext";
const GameScreen = ({ navigation }) => {
  const { fontSize, buttonFontColor, buttonSize, bodyText } =
    useUserPreferences();

  const { sound } = useContext(Context);
  return (
    <MainContainer
      navigation={navigation}
      showSetting={false}
      addStyle={styles.container}
    >
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            transform: [{ scale: buttonSize }],
          },
        ]}
        onPress={() => {
          sound();
          navigation.navigate("Mode");
        }}
      >
        <ImageBackground
          style={styles.buttonBg}
          source={require("../assets/images/buttonblue.png")}
        >
          <Text
            style={[
              styles.text,
              {
                fontSize: fontSize,
                color: buttonFontColor,
              },
            ]}
          >
            Matching
          </Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            transform: [{ scale: buttonSize }],
          },
        ]}
        onPress={() => {
          sound();
          navigation.navigate("xox");
        }}
      >
        <ImageBackground
          style={styles.buttonBg}
          source={require("../assets/images/buttonmint.png")}
        >
          <Text
            style={[
              styles.text,
              {
                fontSize: fontSize,
                color: buttonFontColor,
              },
            ]}
          >
            TIC-TAC-TOE
          </Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            transform: [{ scale: buttonSize }],
          },
        ]}
        onPress={() => {
          sound();
          navigation.navigate("Memory");
        }}
      >
        <ImageBackground
          style={styles.buttonBg}
          source={require("../assets/images/buttongreen.png")}
        >
          <Text
            style={[
              styles.text,
              {
                fontSize: fontSize,
                color: buttonFontColor,
              },
            ]}
          >
            Memory
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </MainContainer>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonContainer: {
    width: "45%",
    height: 80,
  },
  buttonBg: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  text: {
    fontWeight: "700",
    textAlign: "center",
  },
});
