import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import GatherResources from "./screens/GatherResources";
import GetStarted from "./screens/GetStarted";
import Home from "./screens/Home";
import Splash from "./screens/SplashScreen";
import GamesList from "./screens/GamesList";
import GamesNavigator from "./routes/GamesNavigator";
import DataContext from "./DataContext";
import NumbersNavigator from "./routes/NumbersNavigator";
import WordsNavigator from "./routes/WordsNavigator";
import EmotionsNavigator from "./routes/EmotionsNavigator";
import ArtsNavigator from "./routes/ArtsNavigator";
import DashboardNavigator from "./routes/DashboardNavigator";

import { usePlayBg } from "./customHooks/PlaySound";
import Setting from "./screens/Setting";
import { StatusBar } from "react-native";

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const bgSound = usePlayBg(0.07);

  useEffect(() => {
    bgSound();
  }, [bgSound]);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate data fetching
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <DataContext>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Resources"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Resources" component={GatherResources} />
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Start" component={GetStarted} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="GameList" component={GamesList} />
          <Stack.Screen name="Games" component={GamesNavigator} />
          <Stack.Screen name="Numbers" component={NumbersNavigator} />
          <Stack.Screen name="Words" component={WordsNavigator} />
          <Stack.Screen name="Emotions" component={EmotionsNavigator} />
          <Stack.Screen name="Arts" component={ArtsNavigator} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="Dashboard" component={DashboardNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataContext>
  );
}
