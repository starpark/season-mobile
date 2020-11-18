import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? Expo.Constants.statusBarHeight : 0,
    paddingBottom: 60,
  },
});

export default styles;
