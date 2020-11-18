import * as React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import TaskTracker from "./TaskTracker";
import globalStyle from "./styles";

const Home = () => {
  return (
    <SafeAreaView style={globalStyle.container}>
      <View style={styles.userbox}></View>
      <View style={styles.tasktracker}>
        <TaskTracker />
      </View>
      <View style={styles.mainnotice}></View>
      <View style={styles.subnotice}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userbox: {
    flex: 1,
    backgroundColor: "red",
  },
  tasktracker: {
    backgroundColor: "gray",
  },
  mainnotice: {
    flex: 2,
    backgroundColor: "green",
  },
  subnotice: {
    flex: 2,
    backgroundColor: "yellow",
  },
});

export default Home;
