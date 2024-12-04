import { createStackNavigator } from "@react-navigation/stack";

import ArtsCategory from "../screens/ArtsCategory";
import ArtContextProvider from "../GroupContext/ArtsContext";
import BasicColors from "../screens/BasicColors";
import ColorsLevel from "../screens/ColorsLevel";
import MixColors from "../screens/MixColors";
import Shapes from "../screens/Shapes";
import ShapesBasic from "../screens/ShapesBasic";
import ShapesBasicLevels from "../screens/ShapesBasicLevels";
import MatchShapes from "../screens/MatchShapes";
import MatchShapesLevel from "../screens/MatchShapesLevel";
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
        <Stack.Screen name="shapes" component={Shapes} />
        <Stack.Screen name="ShapesBasic" component={ShapesBasic} />
        <Stack.Screen name="ShapesBasicLevels" component={ShapesBasicLevels} />
        <Stack.Screen name="MatchShapes" component={MatchShapes} />
        <Stack.Screen name="MatchShapesLevel" component={MatchShapesLevel} />
      </Stack.Navigator>
    </ArtContextProvider>
  );
};

export default ArtsNavigator;
