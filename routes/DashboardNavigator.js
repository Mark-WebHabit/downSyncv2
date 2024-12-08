import React from "react";

import Dashboard from "../GroupContext/Dashboard";
import { createStackNavigator } from "@react-navigation/stack";

import Progress from "../screens/Progress";
import ErrorBoundary from "../components/ErrorBoundary";

const Stack = createStackNavigator();

const DashboardNavigator = () => {
  return (
    <ErrorBoundary>
      <Dashboard>
        <Stack.Navigator
          initialRouteName="Progress"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Progress" component={Progress} />
        </Stack.Navigator>
      </Dashboard>
    </ErrorBoundary>
  );
};

export default DashboardNavigator;
