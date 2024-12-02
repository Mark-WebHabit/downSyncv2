import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import MainContainer from "../components/MainContainer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Context } from "../DataContext";

const PronounceWord = ({ navigation, route }) => {
  const { item } = route.params;
  const { speak } = useContext(Context);

  return (
    <MainContainer navigation={navigation} showSetting={false}>
      <View style={styles.container}>
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
});
