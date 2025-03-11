import { StyleSheet, View, FlatList } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import { GamesContext } from "../GroupContext/GameContext";
import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";

const MatchingObjectsMedium = ({ navigation }) => {
  const { matchingMedium } = useContext(GamesContext);
  const { sound, height } = useContext(Context);

  const renderItem = ({ item, index }) => {
    const isComplete = item.complete;

    const newItem = { ...item, ...matchingMedium[item.name] };

    const navigateToGame = () => {
      sound();
      navigation.navigate("MatchingMedium", {
        item: newItem,
      });
    };

    return (
      <LevelContainer
        text={index + 1}
        navigateToGame={navigateToGame}
        isComplete={isComplete}
        height={Math.floor(height / 3.5)}
        dataArray={matchingMedium}
        index={index}
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
          data={matchingMedium}
          renderItem={renderItem}
          keyExtractor={(item) => item.uid}
          numColumns={3}
          contentContainerStyle={styles.flatlist}
        />
      </View>
    </MainContainer>
  );
};

export default MatchingObjectsMedium;

const styles = StyleSheet.create({
  levelContainer: {
    marginHorizontal: "auto",
    height: "100%",
    flex: 1,
    width: "70%",
  },
  flatlist: {
    justifyContent: "space-evenly",
    flexGrow: 1,
    height: "100%",
  },
});
