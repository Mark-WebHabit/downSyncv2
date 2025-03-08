import {
  ImageBackground,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import MainContainer from "../components/MainContainer";
import useUserPreferences from "../customHooks/useUserPreference";
import { Context } from "../DataContext";

import ButtonSvg from "../components/ButtonSvg";

const GamesList = ({ navigation }) => {
  const { buttonSize } = useUserPreferences();
  const { sound, height } = useContext(Context);

  const buttons = [
    {
      title: "Games",
      image: require("../assets/images/gameslist/games.png"),
      screen: "Games",
      color: "#FF0000",
    },
    {
      title: "Animals",
      image: require("../assets/images/gameslist/animals.png"),
      screen: "Animals",
      color: "#0000FF",
    },
    {
      title: "Numbers",
      image: require("../assets/images/gameslist/numbers.png"),
      screen: "Numbers",
      color: "#FF69B4",
    },
    {
      title: "Words",
      image: require("../assets/images/gameslist/words.png"),
      screen: "Words",
      color: "#FFA500",
    },
    {
      title: "Body",
      image: require("../assets/images/gameslist/body.png"),
      screen: "BodyParts",
      color: "#8A2BE2",
    },
    {
      title: "Things",
      image: require("../assets/images/gameslist/things.png"),
      screen: "Things",
      color: "#00FFFF",
    },
    {
      title: "Emotions",
      image: require("../assets/images/gameslist/emotions.png"),
      screen: "Emotions",
      color: "#FF00FF",
    },
    {
      title: "Arts",
      image: require("../assets/images/gameslist/arts.png"),
      screen: "Arts",
      color: "#FF00FF",
    },
  ];

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
        numColumns={2}
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

export default GamesList;

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
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  buttonSvg: {},
});
