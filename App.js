import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// screens
import GatherResources from "./screens/GatherResources";
import GetStarted from "./screens/GetStarted";
import Home from "./screens/Home";
import SplashScreen from "./screens/SplashScreen";
import GamesList from "./screens/GamesList";
import GamesNavigator from "./routes/GamesNavigator";
import DataContext from "./DataContext";
import NumbersNavigator from "./routes/NumbersNavigator";
import WordsNavigator from "./routes/WordsNavigator";
import EmotionsNavigator from "./routes/EmotionsNavigator";
import ArtsNavigator from "./routes/ArtsNavigator";
import { usePlayBg } from "./customHooks/PlaySound";
import { useEffect } from "react";

const Stack = createStackNavigator();

export default function App() {
  const bgSound = usePlayBg(0.07);

  useEffect(() => {
    bgSound();
  }, [bgSound]);
  return (
    <DataContext>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Reources" component={GatherResources} />
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Start" component={GetStarted} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="GameList" component={GamesList} />
          <Stack.Screen name="Games" component={GamesNavigator} />
          <Stack.Screen name="Numbers" component={NumbersNavigator} />
          <Stack.Screen name="Words" component={WordsNavigator} />
          <Stack.Screen name="Emotions" component={EmotionsNavigator} />
          <Stack.Screen name="Arts" component={ArtsNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataContext>
  );
}
