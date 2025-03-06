import { StyleSheet, View, FlatList } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import { GamesContext } from "../GroupContext/GameContext";
import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";

const images = [
  require("../assets/images/buttonbluebox.png"),
  require("../assets/images/buttonwhitebox.png"),
  require("../assets/images/buttonmintbox.png"),
  require("../assets/images/buttongreenbox.png"),
];

const MatchingObjects = ({ navigation }) => {
  const { matching } = useContext(GamesContext);
  const { sound, height, width } = useContext(Context);

  const renderItem = ({ item, index }) => {
    const isComplete = item.complete;

    const imageSource = images[index % images.length];

    const newItem = { ...item, ...matching[item.name] };

    const navigateToGame = () => {
      sound();
      navigation.navigate("Matching", {
        item: newItem,
      });
    };

    return (
      <LevelContainer
        text={index + 1}
        imageSource={imageSource}
        navigateToGame={navigateToGame}
        isComplete={isComplete}
        height={Math.floor(height / 4.5)}
        width={Math.round(width / 7)}
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
          data={matching}
          renderItem={renderItem}
          keyExtractor={(item) => item.uid}
          numColumns={5}
          contentContainerStyle={styles.flatlist}
        />
      </View>
    </MainContainer>
  );
};

export default MatchingObjects;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  levelContainer: {
    marginHorizontal: "auto",
    height: "100%",
  },
  flatlist: {
    justifyContent: "center",
  },
});
