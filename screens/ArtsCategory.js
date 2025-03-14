import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import ButtonSvg from "../components/ButtonSvg";

import useUserPreferences from "../customHooks/useUserPreference";
import { Context } from "../DataContext";
import { ArtContext } from "../GroupContext/ArtsContext";
import SplashScreen from "./SplashScreen";

const buttons = [
  {
    title: "Colors",
    image: require("../assets/images/art/color.png"),
    screen: "Colors",
    color: "#FFA500",
  },
  {
    title: "Mix Colors",
    image: require("../assets/images/art/mix.png"),
    screen: "MixColors",
    color: "#8A2BE2",
  },
  {
    title: "Shapes",
    image: require("../assets/images/art/shape.png"),
    screen: "shapes",
    color: "#FF00FF",
  },
];

const ArtsCategory = ({ navigation }) => {
  const { buttonSize } = useUserPreferences();
  const { sound, height } = useContext(Context);
  const { fetching } = useContext(ArtContext);

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

export default ArtsCategory;

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
