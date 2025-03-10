import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import ButtonSvg from "../components/ButtonSvg";

import MainContainer from "../components/MainContainer";
import SplashScreen from "./SplashScreen";
import useUserPreferences from "../customHooks/useUserPreference";
import { Context } from "../DataContext";
import { WordContext } from "../GroupContext/WordsContext";

const buttons = [
  {
    title: "Letters",
    image: require("../assets/images/words/letters.png"),
    screen: "Letters",
    color: "#FFA500",
  },
  {
    title: "Words",
    image: require("../assets/images/words/words.png"),
    screen: "Pronunciation",
    color: "#8A2BE2",
  },
  {
    title: "D & D",
    image: require("../assets/images/words/dnd.png"),
    screen: "DandDList",
    color: "#FF00FF",
  },
];

const Words = ({ navigation }) => {
  const [doneFetching, setDoneFetching] = useState(false);
  const { fetching } = useContext(WordContext);
  const { fontSize, buttonFontColor, buttonSize } = useUserPreferences();
  const { sound, height } = useContext(Context);

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
      <FlatList
        data={buttons}
        keyExtractor={(item) => item.screen}
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
              navigation.navigate(item.screen);
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

export default Words;

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
