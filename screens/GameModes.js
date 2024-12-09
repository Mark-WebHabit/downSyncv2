import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SplashScreem from "../screens/SplashScreen";
import useUserPreferences from "../customHooks/useUserPreference";

import MainContainer from "../components/MainContainer";
import { GamesContext } from "../GroupContext/GameContext";
import { Context } from "../DataContext";
import { AnimalsContext } from "../GroupContext/AnimalsContext";

const GameModes = ({ navigation }) => {
  const [doneFetching, setDoneFetching] = useState(false);
  const { fontSize, buttonFontColor, buttonSize } = useUserPreferences();
  const { fetching } = useContext(AnimalsContext);
  const { sound } = useContext(Context);

  //   if done fetching add another second of dealy
  useEffect(() => {
    if (!fetching) {
      setTimeout(() => {
        setDoneFetching(true);
      }, 1500);
    }
  }, [fetching]);

  if (!doneFetching) return <SplashScreem navigation={navigation} />;

  return (
    <MainContainer
      navigation={navigation}
      showSetting={false}
      addStyle={styles.container}
    >
      <TouchableOpacity
        style={[
          [
            styles.button,
            {
              transform: [{ scale: buttonSize }],
            },
          ],
        ]}
        onPress={() => {
          sound();
          navigation.navigate("MatchingEasy");
        }}
      >
        <ImageBackground
          source={require("../assets/images/buttonblue.png")}
          style={styles.buttonWrapper}
          resizeMode="stretch"
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
            Sound
          </Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          [
            styles.button,
            {
              transform: [{ scale: buttonSize }],
            },
          ],
        ]}
        onPress={() => {
          sound();
          navigation.navigate("MatchingMedium");
        }}
      >
        <ImageBackground
          source={require("../assets/images/buttongreen.png")}
          style={styles.buttonWrapper}
          resizeMode="stretch"
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
            Name
          </Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          [
            styles.button,
            {
              transform: [{ scale: buttonSize }],
            },
          ],
        ]}
        onPress={() => {
          sound();
          navigation.navigate("MatchingDescription");
        }}
      >
        <ImageBackground
          source={require("../assets/images/buttonmint.png")}
          style={styles.buttonWrapper}
          resizeMode="stretch"
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
            Description
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </MainContainer>
  );
};

export default GameModes;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    width: 300,
    height: 70,
  },
  buttonWrapper: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
