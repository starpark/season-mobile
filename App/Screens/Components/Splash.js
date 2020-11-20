import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Splash = (props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../Assets/image/sejonglogo.jpg")}
      />
      <Text style={styles.text}>자기주도창의전공 2분반</Text>

      <Text style={styles.now}>{props.nowstate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
  now: {
    color: "gray",
    paddingTop: 100,
  },
  logo: {
    resizeMode: "contain",
    height: "15%",
  },
});

export default Splash;
