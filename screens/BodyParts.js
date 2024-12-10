import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { bodyParts } from "../assets/bodyparts_flatfiledb_local";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon

import MainContainer from "../components/MainContainer";
import { Context } from "../DataContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const BodyParts = ({ navigation }) => {
  const { speak } = useContext(Context);
  return (
    <MainContainer showSetting={false} navigation={navigation}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View style={styles.container}>
          <View style={styles.row}>
            {bodyParts.slice(0, 3).map((part, index) => {
              return (
                <View style={styles.rowCol} key={index}>
                  <View style={styles.rowColWrapper}>
                    <Pressable
                      style={styles.icon}
                      onPress={() => speak(part.description)}
                    >
                      <Icon name="question-circle" size={20} />
                    </Pressable>
                    <Pressable onPress={() => speak(part.name)}>
                      <Image source={part.image} style={styles.image} />
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.row}>
            {bodyParts.slice(3, 7).map((part, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.rowCol,
                    {
                      width: "20%",
                    },
                  ]}
                >
                  <View style={styles.rowColWrapper}>
                    <Pressable
                      style={styles.icon}
                      onPress={() => speak(part.description)}
                    >
                      <Icon name="question-circle" size={20} />
                    </Pressable>
                    <Pressable onPress={() => speak(part.name)}>
                      <Image source={part.image} style={styles.image} />
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.row}>
            {bodyParts.slice(7, 10).map((part, index) => {
              return (
                <View style={styles.rowCol} key={index}>
                  <View style={styles.rowColWrapper}>
                    <Pressable
                      style={styles.icon}
                      onPress={() => speak(part.description)}
                    >
                      <Icon name="question-circle" size={20} />
                    </Pressable>
                    <Pressable onPress={() => speak(part.name)}>
                      <Image source={part.image} style={styles.image} />
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </MainContainer>
  );
};

export default BodyParts;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "90%",
    margin: "auto",
  },

  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },

  rowCol: {
    height: "100%",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },

  rowColWrapper: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  image: {
    resizeMode: "stretch",
    height: "90%",
    aspectRatio: 1,
  },

  icon: {
    position: "absolute",
    top: 10,
    right: "2%",
  },
});
