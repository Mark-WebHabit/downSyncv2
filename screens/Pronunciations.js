import { StyleSheet, View, FlatList } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import { wordsWithPronunciations } from "../assets/pronunciation_flatfiledb_local";

import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";

const Pronunciations = ({ navigation }) => {
  const { sound, height, width } = useContext(Context);

  const renderItem = ({ item, index }) => {
    const isComplete = false;

    const newItem = { item: wordsWithPronunciations[index], index: index };

    const navigateToGame = () => {
      sound();
      navigation.navigate("PronounceWord", newItem);
    };

    return (
      <LevelContainer
        text={index + 1}
        navigateToGame={navigateToGame}
        isComplete={isComplete}
        height={Math.floor(height / 4.7)}
        width={Math.round(width / 9)}
        index={index}
        dataArray={wordsWithPronunciations}
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
          numColumns={7}
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
    flex: 1,
    width: "90%",
  },
  flatlist: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
});
