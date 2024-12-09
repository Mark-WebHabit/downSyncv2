import React from "react";
import GameModes from "../screens/GameModes";
import AnimalsContextProvider from "../GroupContext/AnimalsContext";
import { createStackNavigator } from "@react-navigation/stack";

import MatchingSoundGameLevel from "../screens/MatchingSoundGameLevel";
import MatchingNameGameLevel from "../screens/MatchingNameGameLevel";
import MatchingDescGameLevel from "../screens/MatchingDescGameLevel";
import GameScreen from "../screens/GameScreen";

// easy
import MatchingSound from "../screens/MtchingSound";
// medium
import MatchingName from "../screens/MatchingName";
// hard
import MatchingDescription from "../screens/MatchingDescription";

const Stack = createStackNavigator();

const AnimalsNavigator = () => {
  return (
    <AnimalsContextProvider>
      <Stack.Navigator
        initialRouteName="Mode"
        screenOptions={{
          headerShown: false,
        }}
      >
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
      </Stack.Navigator>
    </AnimalsContextProvider>
  );
};

export default AnimalsNavigator;
