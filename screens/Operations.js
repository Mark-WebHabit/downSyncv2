import { StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useContext } from "react";
import ButtonSvg from "../components/ButtonSvg";

import MainContainer from "../components/MainContainer";
import { ImageBackground } from "expo-image";
import useUserPreferences from "../customHooks/useUserPreference";
import { Context } from "../DataContext";

const buttons = [
  {
    title: "Additioon",
    image: require("../assets/images/math/plus.png"),
    color: "#FFA500",
    op: "plus",
  },
  {
    title: "Subtraction",
    image: require("../assets/images/math/minus.png"),
    color: "#8A2BE2",
    op: "minus",
  },
  {
    title: "Multiplication",
    image: require("../assets/images/math/times.png"),
    color: "#FF00FF",
    op: "times",
  },
  {
    title: "Division",
    image: require("../assets/images/math/divide.png"),
    color: "#0000FF",
    op: "divide",
  },
];
const screen = "MathQuestions";

const Operations = ({ navigation }) => {
  const { buttonSize } = useUserPreferences();
  const { height, sound } = useContext(Context);
  return (
    <MainContainer
      navigation={navigation}
      showSetting={false}
      addStyle={styles.container}
    >
      <FlatList
        data={buttons}
        keyExtractor={(item) => item.title}
        numColumns={1}
        contentContainerStyle={styles.flatListContainer}
        style={{ width: "80%" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              transform: [
                {
                  scale: buttonSize * 1,
                },
                {
                  scaleX: index % 2 == 1 ? -1 : 1,
                },
              ],
            }}
            onPress={() => {
              sound();
              navigation.navigate(screen, { op: item.op });
            }}
          >
            <ButtonSvg
              style={{
                height: height / 4,
                width: (height / 5) * 3,
              }}
              img={item.image}
              bgColor={item.color}
              text={item.title}
              index={index}
              fontSize={item.title === "Mood Match" ? 50 : 60}
            />
          </TouchableOpacity>
        )}
      />
    </MainContainer>
  );
};

export default Operations;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
    paddin: 0,
    margin: 0,
  },
  flatListContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
