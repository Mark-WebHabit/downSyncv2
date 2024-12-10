import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Animated,
} from "react-native";
import React, { useContext } from "react";
import { wearableItems } from "../assets/wearabble_flatfiledb_local";
import Icon from "react-native-vector-icons/FontAwesome";

import MainContainer from "../components/MainContainer";
import { Context } from "../DataContext";

const Wearables = ({ navigation }) => {
  const { speak } = useContext(Context);
  const animatedValues = wearableItems.map(() => new Animated.Value(1));

  const handlePress = (index, name) => {
    Animated.sequence([
      Animated.timing(animatedValues[index], {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    speak(name);
  };

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
            {wearableItems.slice(0, 3).map((part, index) => {
              return (
                <View style={styles.rowCol} key={index}>
                  <View style={styles.rowColWrapper}>
                    <Pressable
                      style={styles.icon}
                      onPress={() => speak(part.description)}
                    >
                      <Icon name="question-circle" size={20} />
                    </Pressable>
                    <Pressable onPress={() => handlePress(index, part.name)}>
                      <Animated.Image
                        source={part.image}
                        style={[
                          styles.image,
                          { transform: [{ scale: animatedValues[index] }] },
                        ]}
                      />
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.row}>
            {wearableItems.slice(3, 7).map((part, index) => {
              const adjustedIndex = index + 3; // Adjust index for the second row
              return (
                <View
                  key={adjustedIndex}
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
                    <Pressable
                      onPress={() => handlePress(adjustedIndex, part.name)}
                    >
                      <Animated.Image
                        source={part.image}
                        style={[
                          styles.image,
                          {
                            transform: [
                              { scale: animatedValues[adjustedIndex] },
                            ],
                          },
                        ]}
                      />
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.row}>
            {wearableItems.slice(7, 10).map((part, index) => {
              const adjustedIndex = index + 7; // Adjust index for the third row
              return (
                <View style={styles.rowCol} key={adjustedIndex}>
                  <View style={styles.rowColWrapper}>
                    <Pressable
                      style={styles.icon}
                      onPress={() => speak(part.description)}
                    >
                      <Icon name="question-circle" size={20} />
                    </Pressable>
                    <Pressable
                      onPress={() => handlePress(adjustedIndex, part.name)}
                    >
                      <Animated.Image
                        source={part.image}
                        style={[
                          styles.image,
                          {
                            transform: [
                              { scale: animatedValues[adjustedIndex] },
                            ],
                          },
                        ]}
                      />
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

export default Wearables;

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
