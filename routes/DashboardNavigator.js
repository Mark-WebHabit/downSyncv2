import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Dashboard from "../GroupContext/Dashboard";
import { createStackNavigator } from "@react-navigation/stack";

import Progress from "../screens/Progress";

const Stack = createStackNavigator();

const DashboardNavigator = () => {
  return (
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
  );
};

export default DashboardNavigator;

const styles = StyleSheet.create({});
