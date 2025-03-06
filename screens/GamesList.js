import {
  ImageBackground,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import MainContainer from "../components/MainContainer";
import useUserPreferences from "../customHooks/useUserPreference";
import { Context } from "../DataContext";

const GamesList = ({ navigation }) => {
  const { fontSize, buttonFontColor, buttonSize } = useUserPreferences();
  const { sound, width, height } = useContext(Context);

  const buttons = [
    {
      title: "Games",
      image: require("../assets/images/buttonwhite.png"),
      screen: "Games",
    },
    {
      title: "Animals",
      image: require("../assets/images/buttonmint.png"),
      screen: "Animals",
    },
    {
      title: "Numbers",
      image: require("../assets/images/buttonblue.png"),
      screen: "Numbers",
    },
    {
      title: "Words",
      image: require("../assets/images/buttongreen.png"),
      screen: "Words",
    },
    {
      title: "Body",
      image: require("../assets/images/buttonwhite.png"),
      screen: "BodyParts",
    },
    {
      title: "Things",
      image: require("../assets/images/buttonmint.png"),
      screen: "Things",
    },
    {
      title: "Emotions",
      image: require("../assets/images/buttonblue.png"),
      screen: "Emotions",
    },
    {
      title: "Arts",
      image: require("../assets/images/buttongreen.png"),
      screen: "Arts",
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
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.button,
              {
                transform: [{ scale: buttonSize }],
                width: width / 3,
                height: height / 4.5,
              },
            ]}
            onPress={() => {
              sound();
              navigation.navigate(item.screen);
            }}
          >
            <ImageBackground
              source={item.image}
              resizeMode="stretch"
              style={styles.buttonContainer}
            >
              <Text
                style={[
                  styles.text,
                  { fontSize: fontSize, color: buttonFontColor },
                ]}
              >
                {item.title}
              </Text>
            </ImageBackground>
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
  },
  flatListContainer: {
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  button: {
    height: 80,
  },
  buttonContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  text: {
    width: "100%",
    textAlign: "center",
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
