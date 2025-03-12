import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import useUserPreferences from "../customHooks/useUserPreference";

import { Context } from "../DataContext";
import ButtonSvg from "../components/ButtonSvg";
const GameScreenMemoryMode = ({ navigation }) => {
  const { buttonSize } = useUserPreferences();

  const { height, sound } = useContext(Context);

  const buttons = [
    {
      title: "Easy",
      image: require("../assets/images/difficulty/easy.png"),
      size: 2,
      color: "#32CD32",
    },
    {
      title: "Fair",
      image: require("../assets/images/difficulty/fair.png"),
      screen: "MatchingObjectsMedium",
      size: 4,
      color: "#40E0D0",
    },
    {
      title: "Hard",
      image: require("../assets/images/difficulty/hard.png"),
      screen: "MatchingObjectsHard",
      size: 6,
      color: "#FF7F50",
    },
  ];

  const screen = "Memory";

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
            navigation.navigate(screen, { size: button.size });
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

export default GameScreenMemoryMode;

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
