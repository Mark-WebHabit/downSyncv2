import { createStackNavigator } from "@react-navigation/stack";

import ThingsList from "../screens/ThingsList";
import SchoolSupplies from "../screens/SchoolSupplies";
import Wearables from "../screens/Wearables";
import HouseHold from "../screens/HouseHold";
const Stack = createStackNavigator();

const ThinsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ThingsList" component={ThingsList} />
      <Stack.Screen name="SchoolSupplies" component={SchoolSupplies} />
      <Stack.Screen name="Wearables" component={Wearables} />
      <Stack.Screen name="Household" component={HouseHold} />
    </Stack.Navigator>
  );
};

export default ThinsNavigator;
