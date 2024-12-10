import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Line } from "react-native-svg";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const MatchingLevel = () => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);

  const handleGestureStart = (nativeEvent) => {
    setCurrentLine({
      startX: nativeEvent.absoluteX,
      startY: nativeEvent.absoluteY,
      endX: nativeEvent.absoluteX,
      endY: nativeEvent.absoluteY,
    });
  };

  const handleGestureMove = (nativeEvent) => {
    if (currentLine) {
      setCurrentLine({
        ...currentLine,
        endX: nativeEvent.absoluteX,
        endY: nativeEvent.absoluteY,
      });
    }
  };

  const handleGestureEnd = (nativeEvent) => {
    if (currentLine) {
      setLines([...lines, currentLine]);
      setCurrentLine(null);
    }
  };

  const handleGesture = (event) => {
    const { nativeEvent } = event;
    switch (nativeEvent.state) {
      case State.BEGAN:
        handleGestureStart(nativeEvent);
        break;
      case State.ACTIVE:
        handleGestureMove(nativeEvent);
        break;
      case State.END:
        handleGestureEnd(nativeEvent);
        break;
    }
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
            stroke="black"
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

      <View style={styles.imagesAndtextContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={require("../assets/matching/arm.png")}
            style={styles.img}
          />
          <PanGestureHandler
            onGestureEvent={handleGesture}
            onHandlerStateChange={handleGesture}
          >
            <TouchableOpacity
              style={styles.imageConnectionPoint}
            ></TouchableOpacity>
          </PanGestureHandler>
        </View>
      </View>

      <View style={styles.imagesAndtextContainer}>
        <View style={styles.textWrapper}>
          <PanGestureHandler
            onGestureEvent={handleGesture}
            onHandlerStateChange={handleGesture}
          >
            <TouchableOpacity
              style={[styles.imageConnectionPoint, styles.textConnectionPoint]}
            ></TouchableOpacity>
          </PanGestureHandler>
          <Text>this is a text</Text>
        </View>
      </View>
    </View>
  );
};

export default MatchingLevel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  imagesAndtextContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    position: "relative",
  },
  img: {
    resizeMode: "stretch",
    width: 100,
    height: 100,
  },
  imageConnectionPoint: {
    position: "absolute",
    height: 10,
    width: 10,
    borderRadius: 20,
    borderWidth: 1,
    right: -30,
    top: 50,
  },
  textWrapper: {
    borderWidth: 1,
  },
  textConnectionPoint: {
    left: -30,
    top: 50,
  },
});
