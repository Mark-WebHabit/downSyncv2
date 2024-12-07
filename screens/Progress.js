import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { BarChart } from "react-native-chart-kit";

import { ProgressContext } from "../GroupContext/Dashboard";
import SplashScreen from "./SplashScreen";
import { changeScreenOrientation } from "../utilities/Orientation";
import RecentLoginCollapse from "../components/RecentLoginCollapse";
import CollapsibleMatchingEasy from "../components/CollapsibleMatchingEasy";
import CollapsibleMatchingMedium from "../components/CollapsibleMatchingMedium";
import CollapsiblematchingHard from "../components/CollapsibleMatchingHard";
import Collapsibleletters from "../components/CollapsibleAlphabets";

const Progress = ({ navigation }) => {
  const {
    fetching,
    logins,
    matchingEasy,
    user,
    matchingMedium,
    matchingHard,
    letters,
  } = useContext(ProgressContext);

  const [showRecentLogin, setShowRecentLogin] = useState(false);
  const [showMathingEasy, setShowMatchingEasy] = useState(false);
  const [showMathingMedium, setShowMatchingMedium] = useState(false);
  const [showMathingHard, setShowMatchingHard] = useState(false);
  const [showAlphabets, setShowAlphabets] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLogins, setFilteredLogins] = useState([]);

  useEffect(() => {
    try {
      changeScreenOrientation(true);
    } catch (error) {
      console.log(error);
    }

    return () => {
      changeScreenOrientation();
    };
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const result = logins
        .filter((login) => login.uid === searchQuery)
        .sort((a, b) => b.loginTime - a.loginTime);

      setFilteredLogins(result);
    } else {
      setFilteredLogins([]);
    }
  }, [searchQuery, logins]);

  if (fetching) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowRecentLogin(!showRecentLogin)}
        >
          <Text style={styles.text}>Recent Login</Text>
          <Icon
            name={showRecentLogin ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <RecentLoginCollapse
          showRecentLogin={showRecentLogin}
          logins={logins}
          filteredLogins={filteredLogins}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowMatchingEasy(!showMathingEasy)}
        >
          <Text style={styles.text}>Animals Sound</Text>
          <Icon
            name={showMathingEasy ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <CollapsibleMatchingEasy
          matchingEasy={matchingEasy}
          showMathingEasy={showMathingEasy}
          user={user}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowMatchingMedium(!showMathingMedium)}
        >
          <Text style={styles.text}>Animal Name</Text>
          <Icon
            name={showMathingMedium ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <CollapsibleMatchingMedium
          matchingMedium={matchingMedium}
          showMathingMedium={showMathingMedium}
          user={user}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowMatchingHard(!showMathingHard)}
        >
          <Text style={styles.text}>Animal Description</Text>
          <Icon
            name={showMathingEasy ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <CollapsiblematchingHard
          showMathingHard={showMathingHard}
          matchingHard={matchingHard}
          user={user}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowAlphabets(!showAlphabets)}
        >
          <Text style={styles.text}>Alphabets</Text>
          <Icon
            name={showAlphabets ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <Collapsibleletters
          showAlphabets={showAlphabets}
          letters={letters}
          user={user}
        />
      </ScrollView>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFEBEE",
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight + 10 : 0 + 10,
  },
  button: {
    width: "95%",
    marginHorizontal: "auto",
    backgroundColor: "#74706f",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "left",
    color: "white",
  },
  back: {
    width: "30%",
    aspectRatio: 4 / 1.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 100,
  },
  backText: {
    fontSize: 20,
    color: "white",
    fontWeight: "800",
    textAlign: "center",
  },
});
