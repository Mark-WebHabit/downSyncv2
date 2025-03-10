import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import ButtonSvg from "../components/ButtonSvg";

import useUserPreferences from "../customHooks/useUserPreference";
import { Context } from "../DataContext";
import { EmotionContext } from "../GroupContext/EmotionContext";
import SplashScreen from "./SplashScreen";

const buttons = [
  {
    title: "Mood",
    image: require("../assets/images/emotion/mood.png"),
    screen: "EmotionType",
    color: "#FF69B4",
  },
  {
    title: "Mood Match",
    image: require("../assets/images/emotion/mood_match.png"),
    screen: "EmotionMatching",
    color: "#8A2BE2",
  },
];

const EmotionsCategory = ({ navigation }) => {
  const [doneFetching, setDoneFetching] = useState(false);
  const { buttonSize } = useUserPreferences();
  const { sound, height } = useContext(Context);
  const { fetching } = useContext(EmotionContext);

  if (fetching) return <SplashScreen navigation={navigation} />;

  return (
    <MainContainer
      showBack={true}
      showSetting={false}
      addStyle={styles.container}
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
                  scale: buttonSize * 1.2,
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

export default EmotionsCategory;

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
