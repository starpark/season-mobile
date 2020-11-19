import * as React from "react";
import { SafeAreaView, View, StyleSheet, Text, ScrollView } from "react-native";
import CourseTracker from "./CourseTracker";
import Global from "../Styles/GlobalStyles";


const Home = () => {
  return (
    <SafeAreaView style={Global.Styles.container}>
      <View style={styles.userbox}></View>
      <View style={styles.courseTracker}>
        <CourseTracker />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userbox: {
    height: 70,
    backgroundColor: "gray",

  },
  courseTracker: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default Home;
