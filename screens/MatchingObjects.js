import { StyleSheet, View, FlatList } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import { GamesContext } from "../GroupContext/GameContext";
import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";

const MatchingObjects = ({ navigation }) => {
  const { matching } = useContext(GamesContext);
  const { sound, height } = useContext(Context);

  const renderItem = ({ item, index }) => {
    const isComplete = item.complete;

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
        navigateToGame={navigateToGame}
        isComplete={isComplete}
        height={Math.floor(height / 3.5)}
        dataArray={matching}
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
          data={matching}
          renderItem={renderItem}
          keyExtractor={(item) => item.uid}
          style={styles.flatlist}
          numColumns={3}
          contentContainerStyle={styles.flatlistContent}
        />
      </View>
    </MainContainer>
  );
};

export default MatchingObjects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  levelContainer: {
    flex: 1,
    width: "100%",
  },
  flatlist: {
    flex: 1,
    width: "60%",
    marginHorizontal: "auto",
  },
  flatlistContent: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
});
