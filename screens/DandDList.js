import { StyleSheet, View, FlatList } from "react-native";
import React, { useContext, useEffect } from "react";

import MainContainer from "../components/MainContainer";
import { objects } from "../assets/objects_flatfiledb";
import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";
import { WordContext } from "../GroupContext/WordsContext";

const images = [
  require("../assets/images/buttonbluebox.png"),
  require("../assets/images/buttonwhitebox.png"),
  require("../assets/images/buttonmintbox.png"),
  require("../assets/images/buttongreenbox.png"),
];

const DandDList = ({ navigation }) => {
  const { sound, height, width } = useContext(Context);
  const { dndObjects } = useContext(WordContext);

  const renderItem = ({ item, index }) => {
    const isComplete = dndObjects[index]?.complete;

    const imageSource = images[index % images.length];

    const newItem = { ...item, uid: dndObjects[index]?.uid, index };

    const navigateToGame = () => {
      sound();
      navigation.navigate("DandD", newItem);
    };

    return (
      <LevelContainer
        text={index + 1}
        imageSource={imageSource}
        navigateToGame={navigateToGame}
        isComplete={isComplete}
        height={Math.floor(height / 4.5)}
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
          data={objects.slice(0, 12)}
          renderItem={renderItem}
          keyExtractor={(_, i) => i}
          numColumns={4}
          contentContainerStyle={styles.flatlist}
        />
      </View>
    </MainContainer>
  );
};

export default DandDList;

const styles = StyleSheet.create({
  levelContainer: {
    marginHorizontal: "auto",
    height: "100%",
    width: "70%",
  },
  flatlist: {
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
});
