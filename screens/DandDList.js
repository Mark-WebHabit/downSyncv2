import { StyleSheet, View, FlatList } from "react-native";
import React, { useContext, useEffect } from "react";

import MainContainer from "../components/MainContainer";
import { objects } from "../assets/objects_flatfiledb";
import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";
import { WordContext } from "../GroupContext/WordsContext";

const DandDList = ({ navigation }) => {
  const { sound, height, width } = useContext(Context);
  const { dndObjects } = useContext(WordContext);

  const renderItem = ({ item, index }) => {
    const isComplete = dndObjects[index]?.complete;

    const newItem = { ...item, uid: dndObjects[index]?.uid, index };

    const navigateToGame = () => {
      sound();
      navigation.navigate("DandD", newItem);
    };

    return (
      <LevelContainer
        text={index + 1}
        navigateToGame={navigateToGame}
        isComplete={isComplete}
        height={Math.floor(height / 4)}
        width={Math.round(width / 7.5)}
        index={index}
        dataArray={objects.slice(0, 12)}
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
    flex: 1,
    width: "70%",
  },
  flatlist: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
});
