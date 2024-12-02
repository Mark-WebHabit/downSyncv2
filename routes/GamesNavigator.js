import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GameModes from "../screens/GameModes";
import GameContext from "../GroupContext/GameContext";
import { createStackNavigator } from "@react-navigation/stack";

import MatchingSoundGameLevel from "../screens/MatchingSoundGameLevel";
import MatchingNameGameLevel from "../screens/MatchingNameGameLevel";
import MatchingDescGameLevel from "../screens/MatchingDescGameLevel";
import GameScreen from "../screens/GameScreen";
import XOX from "../screens/XOX";
import MemoryGame from "../screens/MemoryGame";

// easy
import MatchingSound from "../screens/MtchingSound";
// medium
import MatchingName from "../screens/MatchingName";
// hard
import MatchingDescription from "../screens/MatchingDescription";

const Stack = createStackNavigator();

const GamesNavigator = () => {
  return (
    <GameContext>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="Mode" component={GameModes} />
        <Stack.Screen
          name="MatchingEasyGame"
          component={MatchingSoundGameLevel}
        />
        <Stack.Screen
          name="MatchingMediumGame"
          component={MatchingNameGameLevel}
        />
        <Stack.Screen
          name="MatchingHardGame"
          component={MatchingDescGameLevel}
        />

        <Stack.Screen name="MatchingEasy" component={MatchingSound} />
        <Stack.Screen name="MatchingMedium" component={MatchingName} />
        <Stack.Screen
          name="MatchingDescription"
          component={MatchingDescription}
        />
        <Stack.Screen name="xox" component={XOX} />
        <Stack.Screen name="Memory" component={MemoryGame} />
      </Stack.Navigator>
    </GameContext>
  );
};

export default GamesNavigator;

const styles = StyleSheet.create({});
