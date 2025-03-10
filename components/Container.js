import { SafeAreaView } from "react-native";
import React from "react";

const Container = ({ children, addStyle }) => {
  return <SafeAreaView style={[addStyle]}>{children}</SafeAreaView>;
};

export default Container;
