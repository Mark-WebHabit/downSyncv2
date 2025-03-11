import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GameContext from "../GroupContext/GameContext";
import { createStackNavigator } from "@react-navigation/stack";

import GameScreen from "../screens/GameScreen";
import XOX from "../screens/XOX";
import MemoryGame from "../screens/MemoryGame";
import MatchingLevel from "../screens/MatchingLevel";
import MatchingObjects from "../screens/MatchingObjects";
import MatchingObjectsMedium from "../screens/MatchingObjectsMedium";
import MatchingLevelMedium from "../screens/MatchingLevelMedium";

// mode for matching
import GameScreenMatchingMode from "../screens/GameScreenMatchingMode";

const Stack = createStackNavigator();

const GamesNavigator = () => {
  return (
    <GameContext>
      <Stack.Navigator
        initialRouteName="GameScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="xox" component={XOX} />
        <Stack.Screen name="Memory" component={MemoryGame} />

        {/*  */}
        <Stack.Screen name="Matching" component={MatchingLevel} />
        <Stack.Screen name="MatchingMedium" component={MatchingLevelMedium} />

        {/*  */}
        <Stack.Screen name="MatchingObjects" component={MatchingObjects} />
        <Stack.Screen
          name="MatchingObjectsMedium"
          component={MatchingObjectsMedium}
        />

        <Stack.Screen
          name="GameScreenMatchingMode"
          component={GameScreenMatchingMode}
        />
      </Stack.Navigator>
    </GameContext>
  );
};

export default GamesNavigator;

const styles = StyleSheet.create({});
