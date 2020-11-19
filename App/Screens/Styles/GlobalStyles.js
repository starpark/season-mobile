import { StyleSheet, Platform } from "react-native";

const Global = {
  Colors: {
    red1: "#DC143C",
    red2: "#D43958",
    red3: "#CC4E67",
    red4: "#D66B81",
    red5: "#DE8A9A",
    red6: "#E0ADB7",
    red7: "#F5D7DD",
    gray: "#F0F0F0",
    gray2: "#cfcfcf",
    green1: "#A6F6F1",
    green2: "#E8FFFF",
    error: "#f2113e",
    warn: "#f28d11",
    fine: "#f7e414",
    well: "#10c731",
    blue: "#0084ff",
  },
  Styles: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      paddingTop: Platform.OS === "android" ? Expo.Constants.statusBarHeight : 0,
      paddingBottom: 60,
    },
  })

}

export default Global;
