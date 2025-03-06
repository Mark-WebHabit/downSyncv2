import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import MainContainer from "../components/MainContainer";
import { AnimalsContext } from "../GroupContext/AnimalsContext";

import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";

const images = [
  require("../assets/images/buttonbluebox.png"),
  require("../assets/images/buttonwhitebox.png"),
  require("../assets/images/buttonmintbox.png"),
  require("../assets/images/buttongreenbox.png"),
];

const MatchingSound = ({ navigation }) => {
  const { matchingEasy } = useContext(AnimalsContext);
  const { sound } = useContext(Context);

  const { height, width } = useContext(Context);

  const renderItem = ({ item, index }) => {
    const isComplete = item.complete;

    const imageSource = images[index % images.length];

    const navigateToGame = () => {
      sound();
      navigation.navigate("MatchingEasyGame", {
        item: item,
      });
    };

    return (
      <LevelContainer
        text={index + 1}
        imageSource={imageSource}
        navigateToGame={navigateToGame}
        isComplete={isComplete}
        height={Math.floor(height / 4.2)}
        width={Math.round(width / 7.5)}
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
          data={matchingEasy}
          renderItem={renderItem}
          keyExtractor={(item) => item.uid}
          numColumns={6}
          contentContainerStyle={styles.flatlist}
        />
      </View>
    </MainContainer>
  );
};

export default MatchingSound;

const styles = StyleSheet.create({
  levelContainer: {
    marginHorizontal: "auto",
    height: "100%",
  },
  flatlist: {
    justifyContent: "center",
  },
});
