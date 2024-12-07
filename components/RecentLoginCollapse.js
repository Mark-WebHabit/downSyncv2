import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Collapsible from "react-native-collapsible";
import { formatDuration } from "../utilities/Date";

const RecentLoginCollapse = ({
  showRecentLogin,
  logins,
  filteredLogins,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <>
      {showRecentLogin && (
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          <TextInput
            style={styles.searchBar}
            placeholder="Search by date (DD-MM-YYYY)"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
      )}

      <Collapsible collapsed={!showRecentLogin}>
        {logins && logins.length > 0 && (
          <View style={styles.showRecentLogin}>
            <View style={styles.mostRecent}>
              <Text style={styles.mostRecentLoginText}>
                Recent: {new Date(logins[0].loginTime).toLocaleString()}
              </Text>

              <Text style={styles.mostRecentLoginText}>
                Duration:{" "}
                {formatDuration(logins[0].loginTime, logins[0].logoutTime)}
              </Text>
            </View>
          </View>
        )}

        {filteredLogins && filteredLogins.length > 0 && (
          <ScrollView style={styles.scrollView}>
            {filteredLogins.map((login, index) => (
              <View key={index} style={styles.filteredLogin}>
                <Text style={styles.filteredLoginText}>
                  Login: {new Date(login.loginTime).toLocaleString()}
                </Text>
                <Text style={styles.filteredLoginText}>
                  Duration: {formatDuration(login.loginTime, login.logoutTime)}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}
      </Collapsible>
    </>
  );
};

export default RecentLoginCollapse;

const styles = StyleSheet.create({
  showRecentLogin: {
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  mostRecent: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  mostRecentLoginText: {
    fontWeight: "700",
    fontSize: 15,
    textAlign: "left",
  },
  searchBar: {
    height: 50,
    borderColor: "#FFC107",
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#FFF59D",
    zIndex: 10,
    marginBottom: 10,
  },
  scrollView: {
    flexGrow: 1,
  },
  filteredLogin: {
    padding: 10,
    backgroundColor: "#90EE90",
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#32CD32",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  filteredLoginText: {
    color: "#000080",
    fontSize: 15,
  },
});
