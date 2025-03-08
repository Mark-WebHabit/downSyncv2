import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import { ImageBackground } from "expo-image";
import useUserPreferences from "../customHooks/useUserPreference";
import { Context } from "../DataContext";

import ButtonSvg from "../components/ButtonSvg";

const Numbers = ({ navigation }) => {
  const { fontSize, buttonFontColor, buttonSize, bodyText } =
    useUserPreferences();
  const { sound, height } = useContext(Context);

  const buttons = [
    {
      title: "Numbers",
      image: require("../assets/images/numbers/numbers.png"),
      screen: "NumberGif",
      color: "#FF6EC7",
    },
    {
      title: "Count",
      image: require("../assets/images/numbers/count.png"),
      screen: "Count",
      color: "#00CED1",
    },
    {
      title: "Operations",
      image: require("../assets/images/numbers/math.png"),
      screen: "Math",
      color: "#E6E6FA",
    },
  ];

  return (
    <MainContainer
      addStyle={[styles.container]}
      showSetting={false}
      navigation={navigation}
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
            isBlack={button.title === "Operations"}
          />
        </TouchableOpacity>
      ))}
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
