import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import useUserPreferences from "../customHooks/useUserPreference";

import { Context } from "../DataContext";
import ButtonSvg from "../components/ButtonSvg";
const GameScreen = ({ navigation }) => {
  const { buttonSize } = useUserPreferences();

  const { height, sound } = useContext(Context);

  const buttons = [
    {
      title: "Matching",
      image: require("../assets/images/gameslist/matching.png"),
      screen: "GameScreenMatchingMode",
      color: "#FF4500",
    },
    {
      title: "TicTacToe",
      image: require("../assets/images/gameslist/tctc.png"),
      screen: "xox",
      color: "#1E90FF",
    },
    {
      title: "Memory",
      image: require("../assets/images/gameslist/memory.png"),
      screen: "Memory",
      color: "#8A2BE2",
    },
  ];

  return (
    <MainContainer
      navigation={navigation}
      showSetting={false}
      addStyle={styles.container}
    >
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            sound();
            navigation.navigate(button.screen);
          }}
        >
          <ButtonSvg
            style={{
              transform: [{ scale: buttonSize }],
              height: height / 4,
              width: (height / 4) * 3,
            }}
            img={button.image}
            bgColor={button.color}
            text={button.title}
          />
        </TouchableOpacity>
      ))}
    </MainContainer>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
