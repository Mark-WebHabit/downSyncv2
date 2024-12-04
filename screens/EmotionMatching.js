import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import { EmotionContext } from "../GroupContext/EmotionContext";
import { emotionSample } from "../assets/emotions_sample_flatfiledb_local";

import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";

const images = [
  require("../assets/images/buttonbluebox.png"),
  require("../assets/images/buttonwhitebox.png"),
  require("../assets/images/buttonmintbox.png"),
  require("../assets/images/buttongreenbox.png"),
];

const EmotionMatching = ({ navigation }) => {
  const { emotionMatching } = useContext(EmotionContext);
  const { sound } = useContext(Context);

  const renderItem = ({ item, index }) => {
    const isComplete = emotionMatching[index].complete;

    const imageSource = images[index % images.length];

    const newItem = {
      ...item,
      name: emotionMatching[index].name,
      uid: emotionMatching[index].uid,
    };

    const navigateToGame = () => {
      sound();
      navigation.navigate("EmotionMatchingLevel", {
        item: newItem,
      });
    };

    return (
      <LevelContainer
        text={index + 1}
        imageSource={imageSource}
        navigateToGame={navigateToGame}
        isComplete={isComplete}
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
          data={emotionSample}
          renderItem={renderItem}
          keyExtractor={(item, i) => i}
          numColumns={3}
          contentContainerStyle={styles.flatlist}
        />
      </View>
    </MainContainer>
  );
};

export default EmotionMatching;

const styles = StyleSheet.create({
  levelContainer: {
    marginHorizontal: "auto",
    height: "100%",
  },
  flatlist: {
    justifyContent: "center",
  },
});
