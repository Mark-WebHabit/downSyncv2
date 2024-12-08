import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Collapsible from "react-native-collapsible";
import { PieChart } from "react-native-chart-kit";

const CollapsibleDandD = ({ dndObjects, showDandD, user }) => {
  const completed = dndObjects?.length
    ? dndObjects.filter((el) => el.complete === true).length
    : 0;
  const pending = dndObjects?.length ? dndObjects.length - completed : 50;

  const data = [
    {
      name: "Completed",
      population: completed,
      color: "#EEE8AA",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Pending",
      population: pending,
      color: "#352801",
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
    <Collapsible collapsed={!showDandD}>
      {dndObjects && (
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
            {user.user} has solved {completed} out of {dndObjects.length} Drag
            and Drop Challenges
          </Text>
        </>
      )}
    </Collapsible>
  );
};

export default CollapsibleDandD;

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
