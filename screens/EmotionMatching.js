import { StyleSheet, View, FlatList } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import { EmotionContext } from "../GroupContext/EmotionContext";
import { emotionSample } from "../assets/emotions_sample_flatfiledb_local";
import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";

const EmotionMatching = ({ navigation }) => {
  const { emotionsMatching } = useContext(EmotionContext);
  const { sound, height } = useContext(Context);

  const renderItem = ({ item, index }) => {
    const isComplete = emotionsMatching[index]?.complete;

    console.log(index);

    const newItem = {
      ...item,
      name: emotionsMatching[index]?.name,
      uid: emotionsMatching[index]?.uid,
      index,
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
        navigateToGame={navigateToGame}
        isComplete={isComplete}
        height={Math.floor(height / 4)}
        index={index}
        dataArray={emotionSample}
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
          numColumns={4}
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
    flex: 1,
    width: "70%",
  },
  flatlist: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
});
