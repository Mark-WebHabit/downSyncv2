import { StyleSheet, View, FlatList } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import { alphabetWords } from "../assets/letters_flatfiledb_local";

import LevelContainer from "../components/LevelContainer";
import { Context } from "../DataContext";
import { WordContext } from "../GroupContext/WordsContext";

const images = [
  require("../assets/images/buttonbluebox.png"),
  require("../assets/images/buttonwhitebox.png"),
  require("../assets/images/buttonmintbox.png"),
  require("../assets/images/buttongreenbox.png"),
];

const Letter = ({ navigation }) => {
  const { sound, height, width } = useContext(Context);
  const { letters } = useContext(WordContext);

  const renderItem = ({ item, index }) => {
    const isComplete = letters[index]?.complete;

    const imageSource = images[index % images.length];

    const newItem = { ...item, uid: letters[index]?.uid };

    const navigateToGame = () => {
      sound();
      navigation.navigate("LetterSample", newItem);
    };

    return (
      <LevelContainer
        text={item.letter}
        imageSource={imageSource}
        navigateToGame={navigateToGame}
        isComplete={isComplete}
        height={Math.floor(height / 4.5)}
        width={Math.round(width / 9)}
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
          data={alphabetWords}
          renderItem={renderItem}
          keyExtractor={(_, i) => i}
          numColumns={7}
          contentContainerStyle={styles.flatlist}
        />
      </View>
    </MainContainer>
  );
};

export default Letter;

const styles = StyleSheet.create({
  levelContainer: {
    marginHorizontal: "auto",
    height: "100%",
    paddingTop: 10,
  },
  flatlist: {
    justifyContent: "center",
    alignItems: "center",
  },
});
