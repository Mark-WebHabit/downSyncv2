import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SplashScreem from "../screens/SplashScreen";
import useUserPreferences from "../customHooks/useUserPreference";
import ButtonSvg from "../components/ButtonSvg";

import MainContainer from "../components/MainContainer";
import { Context } from "../DataContext";
import { AnimalsContext } from "../GroupContext/AnimalsContext";

const buttons = [
  {
    title: "Sound",
    image: require("../assets/images/animals/sound.png"),
    screen: "MatchingEasy",
    color: "#FFA500",
  },
  {
    title: "Name",
    image: require("../assets/images/animals/name.png"),
    screen: "MatchingMedium",
    color: "#8A2BE2",
  },
  {
    title: "Description",
    image: require("../assets/images/animals/description.png"),
    screen: "MatchingDescription",
    color: "#FF00FF",
  },
];

const GameModes = ({ navigation }) => {
  const { buttonSize } = useUserPreferences();
  const { fetching } = useContext(AnimalsContext);
  const { sound, height } = useContext(Context);

  if (fetching) return <SplashScreem navigation={navigation} />;

  return (
    <MainContainer
      navigation={navigation}
      showSetting={false}
      addStyle={styles.container}
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
              isBlack={item.title === "Things"}
            />
          </TouchableOpacity>
        )}
      />
    </MainContainer>
  );
};

export default GameModes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
    paddin: 0,
    margin: 0,
  },
  flatListContainer: {
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
});
