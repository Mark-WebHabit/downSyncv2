import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import { colorsObj } from "../assets/colors_flatfiledb_local";

import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";
import { ArtContext } from "../GroupContext/ArtsContext";

const images = [
  require("../assets/images/buttonbluebox.png"),
  require("../assets/images/buttonwhitebox.png"),
  require("../assets/images/buttonmintbox.png"),
  require("../assets/images/buttongreenbox.png"),
];

const BasicColors = ({ navigation }) => {
  const { colors } = useContext(ArtContext);
  const { sound } = useContext(Context);

  const renderItem = ({ item, index }) => {
    const isComplete = colors[index].complete;

    const imageSource = images[index % images.length];

    const newItem = { ...item, uid: colors[index].uid };

    const navigateToGame = () => {
      sound();
      navigation.navigate("ColorsLevel", {
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
          data={colorsObj}
          renderItem={renderItem}
          keyExtractor={(item, i) => i}
          numColumns={3}
          contentContainerStyle={styles.flatlist}
        />
      </View>
    </MainContainer>
  );
};

export default BasicColors;

const styles = StyleSheet.create({
  levelContainer: {
    marginHorizontal: "auto",
    height: "100%",
  },
  flatlist: {
    justifyContent: "center",
  },
});
