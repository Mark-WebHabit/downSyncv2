import { StyleSheet, View, FlatList } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import { colorsObj } from "../assets/colors_flatfiledb_local";

import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";
import { ArtContext } from "../GroupContext/ArtsContext";

const BasicColors = ({ navigation }) => {
  const { colors } = useContext(ArtContext);
  const { sound, height, width } = useContext(Context);

  const renderItem = ({ item, index }) => {
    const isComplete = colors[index]?.complete;

    const newItem = { ...item, uid: colors[index]?.uid };

    const navigateToGame = () => {
      sound();
      navigation.navigate("ColorsLevel", {
        item: newItem,
      });
    };

    return (
      <LevelContainer
        text={index + 1}
        navigateToGame={navigateToGame}
        isComplete={isComplete}
        height={Math.floor(height / 4)}
        width={Math.round(width / 7.5)}
        index={index}
        dataArray={colorsObj}
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
          numColumns={4}
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
    flex: 1,
    width: "70%",
  },
  flatlist: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
});
