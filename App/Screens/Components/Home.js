import * as React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import CourseTracker from "./CourseTracker";
import Global from "../Styles/GlobalStyles";

const Home = () => {
  return (
    <SafeAreaView style={Global.Styles.container}>
      <View style={styles.userbox}></View>
      <View style={styles.tasktracker}>
        <CourseTracker />
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
    backgroundColor: "white",
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
