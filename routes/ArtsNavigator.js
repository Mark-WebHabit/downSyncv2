import { createStackNavigator } from "@react-navigation/stack";

import ArtsCategory from "../screens/ArtsCategory";
import ArtContextProvider from "../GroupContext/ArtsContext";
import BasicColors from "../screens/BasicColors";
import ColorsLevel from "../screens/ColorsLevel";
import MixColors from "../screens/MixColors";
const Stack = createStackNavigator();

const ArtsNavigator = () => {
  return (
    <ArtContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="ArtsCateg" component={ArtsCategory} />
        <Stack.Screen name="Colors" component={BasicColors} />
        <Stack.Screen name="ColorsLevel" component={ColorsLevel} />
        <Stack.Screen name="MixColors" component={MixColors} />
      </Stack.Navigator>
    </ArtContextProvider>
  );
};

export default ArtsNavigator;
