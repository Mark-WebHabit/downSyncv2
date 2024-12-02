import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import { ImageBackground } from "expo-image";
import useUserPreferences from "../customHooks/useUserPreference";
import { Context } from "../DataContext";

const Numbers = ({ navigation }) => {
  const { fontSize, buttonFontColor, buttonSize, bodyText } =
    useUserPreferences();
  const { sound } = useContext(Context);
  return (
    <MainContainer
      addStyle={[styles.container]}
      showSetting={false}
      navigation={navigation}
    >
      <TouchableOpacity
        style={[
          styles.button,
          {
            transform: [{ scale: buttonSize }],
          },
        ]}
        onPress={() => {
          sound();
          navigation.navigate("NumberGif");
        }}
      >
        <ImageBackground
          style={styles.buttonImage}
          source={require("../assets/images/buttonblue.png")}
        >
          <Text
            style={[
              styles.Text,
              {
                color: buttonFontColor,
                fontSize: fontSize,
              },
            ]}
          >
            Numbers
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
        onPress={() => {
          sound();
          navigation.navigate("Count");
        }}
      >
        <ImageBackground
          style={styles.buttonImage}
          source={require("../assets/images/buttonmint.png")}
        >
          <Text
            style={[
              styles.Text,
              {
                color: buttonFontColor,
                fontSize: fontSize,
              },
            ]}
          >
            Count
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
        onPress={() => {
          sound();
          navigation.navigate("Math");
        }}
      >
        <ImageBackground
          style={styles.buttonImage}
          source={require("../assets/images/buttongreen.png")}
        >
          <Text
            style={[
              styles.Text,
              {
                color: buttonFontColor,
                fontSize: fontSize,
              },
            ]}
          >
            Math
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </MainContainer>
  );
};

export default Numbers;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
  },

  button: {
    width: "45%",
    height: 70,
  },
  buttonImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    fontWeight: "600",
    textAlign: "center",
  },
});
