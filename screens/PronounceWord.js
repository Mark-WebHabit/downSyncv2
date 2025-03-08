import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import MainContainer from "../components/MainContainer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Context } from "../DataContext";
import { wordsWithPronunciations } from "../assets/pronunciation_flatfiledb_local";
const PronounceWord = ({ navigation, route }) => {
  const { item, index } = route.params;
  const { speak } = useContext(Context);
  const [nextItem, setNextItem] = useState(null);

  useEffect(() => {
    if (index < wordsWithPronunciations?.length - 1) {
      const nextItem = {
        item: wordsWithPronunciations[index + 1],
        index: index + 1,
      };
      setNextItem(nextItem);
    }
  }, [item]);

  return (
    <MainContainer navigation={navigation} showSetting={false}>
      <View style={styles.container}>
        {nextItem && index < wordsWithPronunciations?.length - 1 && (
          <TouchableOpacity
            style={styles.nextItemContainer}
            onPress={() => {
              navigation.replace("PronounceWord", nextItem);
            }}
          >
            <Text style={styles.nextItem}>{nextItem.item.word[0]}</Text>
          </TouchableOpacity>
        )}
        <TouchableWithoutFeedback onPress={() => speak(item.word)}>
          <Text style={styles.text}>{item.word}</Text>
        </TouchableWithoutFeedback>
        <Text style={styles.small}>{item.pronunciation}</Text>
      </View>
    </MainContainer>
  );
};

export default PronounceWord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "relative",
  },
  text: {
    fontSize: 100,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "red",
    lineHeight: 100,
  },
  small: {
    fontSize: 30,
    lineHeight: 30,
  },
  nextItemContainer: {
    width: 50,
    height: 50,
    position: "absolute",
    right: 60,
    top: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  nextItem: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 40,
    color: "green",
  },
});
