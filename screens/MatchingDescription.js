import { StyleSheet, View, FlatList } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import { AnimalsContext } from "../GroupContext/AnimalsContext";
import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";

const MatchingDescription = ({ navigation }) => {
  const { matchingHard } = useContext(AnimalsContext);
  const { sound } = useContext(Context);
  const { height } = useContext(Context);

  const renderItem = ({ item, index }) => {
    const isComplete = item.complete;

    const navigateToGame = () => {
      sound();
      navigation.navigate("MatchingHardGame", {
        item: item,
      });
    };

    return (
      <LevelContainer
        text={index + 1}
        navigateToGame={navigateToGame}
        isComplete={isComplete}
        height={Math.floor(height / 4)}
        index={index}
        dataArray={matchingHard}
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
          data={matchingHard}
          renderItem={renderItem}
          keyExtractor={(item) => item.uid}
          numColumns={4}
          contentContainerStyle={styles.flatlist}
        />
      </View>
    </MainContainer>
  );
};

export default MatchingDescription;

const styles = StyleSheet.create({
  levelContainer: {
    marginHorizontal: "auto",
    height: "100%",
    width: "70%",
  },
  flatlist: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
});
