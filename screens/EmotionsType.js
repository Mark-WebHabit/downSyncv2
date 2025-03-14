import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import { EmotionContext } from "../GroupContext/EmotionContext";
import { emotions } from "../assets/emotions_flatfiledb_local";

import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";

const EmotionsType = ({ navigation }) => {
  const { emotionTypes } = useContext(EmotionContext);
  const { sound, height } = useContext(Context);

  const renderItem = ({ item, index }) => {
    const isComplete = emotionTypes[index]?.complete;

    const newItem = { ...item, uid: emotionTypes[index]?.uid, index };

    const navigateToGame = () => {
      sound();
      navigation.navigate("EmotionLevel", {
        item: newItem,
      });
    };

    return (
      <LevelContainer
        text={index + 1}
        navigateToGame={navigateToGame}
        isComplete={isComplete}
        height={Math.floor(height / 4)}
        index={index}
        emotions={emotions}
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
    flex: 1,
    width: "70%",
  },
  flatlist: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
});
