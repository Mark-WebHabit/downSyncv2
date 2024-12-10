import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { Image } from "react-native";
import Svg, { Line } from "react-native-svg";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { matching } from "../assets/matching_flatfiledb_local";
const getRandomOrder = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const MatchingLevel = () => {
  const level = matching[0]; // Using the first index for demonstration
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([]);
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);

  useEffect(() => {
    setImages(getRandomOrder(level));
    setTexts(getRandomOrder(level));
  }, []);

  const handleGesture = (event) => {
    const { nativeEvent } = event;
    if (nativeEvent.state === State.BEGAN) {
      setCurrentLine({
        startX: nativeEvent.absoluteX,
        startY: nativeEvent.absoluteY,
        endX: nativeEvent.absoluteX,
        endY: nativeEvent.absoluteY,
      });
    } else if (nativeEvent.state === State.ACTIVE && currentLine) {
      setCurrentLine({
        ...currentLine,
        endX: nativeEvent.absoluteX,
        endY: nativeEvent.absoluteY,
      });
    } else if (nativeEvent.state === State.END && currentLine) {
      const matchedImage = images.find(
        (img) =>
          img.name ===
          texts.find(
            (text) =>
              text.description ===
              level.find((item) => item.image === img.image).description
          ).name
      );

      if (matchedImage) {
        setLines([...lines, { ...currentLine, color: "green" }]);
      } else {
        Alert.alert("Error", "Incorrect match!");
        setLines([...lines, { ...currentLine, color: "red" }]);
      }
      setCurrentLine(null);
    }
  };

  const undoLastLine = () => {
    setLines((prevLines) => prevLines.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        {lines.map((line, index) => (
          <Line
            key={index}
            x1={line.startX}
            y1={line.startY}
            x2={line.endX}
            y2={line.endY}
            stroke={line.color}
            strokeWidth="2"
          />
        ))}
        {currentLine && (
          <Line
            x1={currentLine.startX}
            y1={currentLine.startY}
            x2={currentLine.endX}
            y2={currentLine.endY}
            stroke="black"
            strokeWidth="2"
          />
        )}
      </Svg>

      <View style={styles.columnContainer}>
        <View style={styles.column}>
          {images.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Image source={item.image} style={styles.img} />
              <PanGestureHandler
                onGestureEvent={handleGesture}
                onHandlerStateChange={handleGesture}
              >
                <TouchableOpacity
                  style={styles.connectionPoint}
                ></TouchableOpacity>
              </PanGestureHandler>
            </View>
          ))}
        </View>

        <View style={styles.column}>
          {texts.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <PanGestureHandler
                onGestureEvent={handleGesture}
                onHandlerStateChange={handleGesture}
              >
                <TouchableOpacity
                  style={[styles.connectionPoint, styles.textConnectionPoint]}
                ></TouchableOpacity>
              </PanGestureHandler>
              <Text>{item.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity onPress={undoLastLine} style={styles.undoButton}>
        <Text>Undo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchingLevel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  columnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  img: {
    width: 100,
    height: 100,
  },
  connectionPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 10,
  },
  textConnectionPoint: {
    marginRight: 10,
  },
  undoButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "lightgrey",
    alignItems: "center",
  },
});
