import { createStackNavigator } from "@react-navigation/stack";

import EmotionsCategory from "../screens/EmotionsCategory";
import EmotionsType from "../screens/EmotionsType";
import EmotionContextProvider from "../GroupContext/EmotionContext";
import EmotionLevel from "../screens/EmotionLevel";
import EmotionMatching from "../screens/EmotionMatching";
import EmotionMatchingLevel from "../screens/EmotionMatchingLevel";

const Stack = createStackNavigator();

const EmotionsNavigator = () => {
  return (
    <EmotionContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="EmotionCateg" component={EmotionsCategory} />
        <Stack.Screen name="EmotionType" component={EmotionsType} />
        <Stack.Screen name="EmotionLevel" component={EmotionLevel} />
        <Stack.Screen name="EmotionMatching" component={EmotionMatching} />
        <Stack.Screen
          name="EmotionMatchingLevel"
          component={EmotionMatchingLevel}
        />
      </Stack.Navigator>
    </EmotionContextProvider>
  );
};

export default EmotionsNavigator;
