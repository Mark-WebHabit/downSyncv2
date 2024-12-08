import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Collapsible from "react-native-collapsible";
import { PieChart } from "react-native-chart-kit";

const CollapsibleBasicShapes = ({ basicShapes, showBasicShapes, user }) => {
  const completed = basicShapes?.length
    ? basicShapes.filter((el) => el.complete === true).length
    : 0;
  const pending = basicShapes?.length ? basicShapes.length - completed : 24;

  const data = [
    {
      name: "Completed",
      population: completed,
      color: "#F08080",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Pending",
      population: pending,
      color: "#1B2004",
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
    <Collapsible collapsed={!showBasicShapes}>
      {basicShapes && (
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
            {user.user} has viewed {completed} out of {basicShapes.length}{" "}
            different Basic Shapes
          </Text>
        </>
      )}
    </Collapsible>
  );
};

export default CollapsibleBasicShapes;

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
