import { StyleSheet, View, FlatList } from "react-native";
import React, { useContext, useEffect } from "react";

import MainContainer from "../components/MainContainer";
import { alphabetWords } from "../assets/letters_flatfiledb_local";
import { wordsWithPronunciations } from "../assets/pronunciation_flatfiledb_local";

import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";

const images = [
  require("../assets/images/buttonbluebox.png"),
  require("../assets/images/buttonwhitebox.png"),
  require("../assets/images/buttonmintbox.png"),
  require("../assets/images/buttongreenbox.png"),
];

const Pronunciations = ({ navigation }) => {
  const { sound } = useContext(Context);

  const renderItem = ({ item, index }) => {
    const isComplete = false;

    const imageSource = images[index % images.length];

    const newItem = { item: wordsWithPronunciations[index] };

    const navigateToGame = () => {
      sound();
      navigation.navigate("PronounceWord", newItem);
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
          data={wordsWithPronunciations}
          renderItem={renderItem}
          keyExtractor={(_, i) => i}
          numColumns={3}
          contentContainerStyle={styles.flatlist}
        />
      </View>
    </MainContainer>
  );
};

export default Pronunciations;

const styles = StyleSheet.create({
  levelContainer: {
    marginHorizontal: "auto",
    height: "100%",
  },
  flatlist: {
    justifyContent: "center",
  },
});
