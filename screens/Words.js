import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";

import MainContainer from "../components/MainContainer";
import SplashScreen from "./SplashScreen";
import useUserPreferences from "../customHooks/useUserPreference";
import { Context } from "../DataContext";
import { WordContext } from "../GroupContext/WordsContext";

const Words = ({ navigation }) => {
  const [doneFetching, setDoneFetching] = useState(false);
  const { fetching } = useContext(WordContext);
  const { fontSize, buttonFontColor, buttonSize } = useUserPreferences();
  const { sound } = useContext(Context);

  //   if done fetching add another second of dealy
  useEffect(() => {
    if (!fetching) {
      setTimeout(() => {
        setDoneFetching(true);
      }, 1500);
    }
  }, [fetching]); //   if done fetching add another second of dealy

  if (!doneFetching) return <SplashScreen navigation={navigation} />;

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
          navigation.navigate("Letters");
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
            Letters
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
          navigation.navigate("Pronunciation");
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
            Words
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
          navigation.navigate("DandDList");
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
            D & D
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
          navigation.navigate("Colros");
        }}
      >
        <ImageBackground
          style={styles.buttonImage}
          source={require("../assets/images/buttonwhite.png")}
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
            Colors
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </MainContainer>
  );
};

export default Words;

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
