import { createStackNavigator } from "@react-navigation/stack";

import Numbers from "../screens/Numbers";
import BasicNumberScreen from "../screens/BasicNumberScreen";
import Count from "../screens/Count";
import Operations from "../screens/Operations";
import MathScreen from "../screens/MathScreen";
import NumbersContextProvder from "../context/NumbersContext";

const Stack = createStackNavigator();

const NumbersNavigator = () => {
  return (
    <NumbersContextProvder>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="BasicNumber" component={Numbers} />
        <Stack.Screen name="NumberGif" component={BasicNumberScreen} />
        <Stack.Screen name="Count" component={Count} />
        <Stack.Screen name="Math" component={Operations} />
        <Stack.Screen name="MathQuestions" component={MathScreen} />
      </Stack.Navigator>
    </NumbersContextProvder>
  );
};

export default NumbersNavigator;
