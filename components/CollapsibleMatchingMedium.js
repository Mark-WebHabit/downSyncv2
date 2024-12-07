import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Collapsible from "react-native-collapsible";
import { PieChart } from "react-native-chart-kit";

const CollapsibleMatchingMedium = ({
  matchingMedium,
  showMathingMedium,
  user,
}) => {
  const completed = matchingMedium
    ? matchingMedium.filter((el) => el.complete === true).length
    : 0;
  const pending = matchingMedium?.length
    ? matchingMedium?.length - completed
    : 0;

  const data = [
    {
      name: "Completed",
      population: completed,
      color: "#ADD8E6",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Pending",
      population: pending,
      color: "#060270",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
  };

  return (
    <Collapsible collapsed={!showMathingMedium}>
      {matchingMedium && (
        <>
          <PieChart
            data={data}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          <Text style={styles.info}>
            {user.user} has recognized {completed} out of{" "}
            {matchingMedium.length} Animals
          </Text>
        </>
      )}
    </Collapsible>
  );
};

export default CollapsibleMatchingMedium;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Set background to white
  },
  info: {
    textAlign: "center",
    fontWeight: "700",
  },
});
