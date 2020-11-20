import { StyleSheet, Platform } from "react-native";

const Global = {
  Colors: {
    sjred: "#DC143C",
    sjgray: "#334d61",
    sjivory: "#fffde5",
    sjCgray: "#eeede3",
    sjWgray1: "#c8bdad",
    sjWgray2: "#716258",
    sjLgray: "#7e929f",
    sjyellow: "#fad771",
    sjgold: "#926d4d",
    sjsilver: "#c7c8ca",
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
    course: {
      0: "#ba0665",
      1: "#de1934",
      2: "#0352ea",
      3: "#2525bf",
      4: "#0c808b",
      5: "#800080",
      6: "#5f2782",
      7: "#777777",
      8: "#222222",
      9: "#b65151",
      10: "#52515d",
    },
  },
  Styles: StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:
        Platform.OS === "android" ? Expo.Constants.statusBarHeight : 0,
      paddingBottom: 60,
    },
  }),
};

export default Global;
