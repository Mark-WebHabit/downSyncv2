import { StyleSheet, View, FlatList } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import { shapesObj } from "../assets/shapes_sample_flatfiledb_local";
import { ArtContext } from "../GroupContext/ArtsContext";

import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";

const MatchShapes = ({ navigation }) => {
  const { shapesMatching } = useContext(ArtContext);
  const { sound, width, height } = useContext(Context);

  const renderItem = ({ item, index }) => {
    const isComplete = item.complete;

    const newItem = { ...item, ...shapesObj[item.name], index: item?.name };

    const navigateToGame = () => {
      sound();
      navigation.navigate("MatchShapesLevel", {
        item: newItem,
      });
    };

    return (
      <LevelContainer
        text={index + 1}
        navigateToGame={navigateToGame}
        isComplete={isComplete}
        height={Math.floor(height / 4.5)}
        width={Math.round(width / 7.5)}
        index={index}
        dataArray={shapesMatching}
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
          data={shapesMatching}
          renderItem={renderItem}
          keyExtractor={(item) => item.uid}
          numColumns={4}
          contentContainerStyle={styles.flatlist}
        />
      </View>
    </MainContainer>
  );
};

export default MatchShapes;

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
