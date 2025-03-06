import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import { EmotionContext } from "../GroupContext/EmotionContext";
import { emotions } from "../assets/emotions_flatfiledb_local";

import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";

const images = [
  require("../assets/images/buttonbluebox.png"),
  require("../assets/images/buttonwhitebox.png"),
  require("../assets/images/buttonmintbox.png"),
  require("../assets/images/buttongreenbox.png"),
];

const EmotionsType = ({ navigation }) => {
  const { emotionTypes } = useContext(EmotionContext);
  const { sound, height, width } = useContext(Context);

  const renderItem = ({ item, index }) => {
    const isComplete = emotionTypes[index]?.complete;

    const imageSource = images[index % images.length];

    const newItem = { ...item, uid: emotionTypes[index]?.uid };

    const navigateToGame = () => {
      sound();
      navigation.navigate("EmotionLevel", {
        item: newItem,
      });
    };

    return (
      <LevelContainer
        text={index + 1}
        imageSource={imageSource}
        navigateToGame={navigateToGame}
        isComplete={isComplete}
        width={Math.round(width / 5.5)}
        height={Math.floor(height / 3.2)}
      />
    );
  };

  return (
    <MainContainer
      navigation={navigation}
      showSetting={false}
      addStyle={styles.container}
    >
      <View style={styles.levelContainer}>
        <FlatList
          data={emotions}
          renderItem={renderItem}
          keyExtractor={(item, i) => i}
          numColumns={4}
          contentContainerStyle={styles.flatlist}
        />
      </View>
    </MainContainer>
  );
};

export default EmotionsType;

const styles = StyleSheet.create({
  levelContainer: {
    marginHorizontal: "auto",
    height: "100%",
  },
  flatlist: {
    justifyContent: "center",
  },
});
