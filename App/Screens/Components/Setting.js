import * as React from "react";
import { View, Text, Button } from "react-native";
import Actions from "../../Redux/Actions";
import Global from "../Styles/GlobalStyles";

const Setting = () => {
  return (
    <View style={Global.Styles.container}>
      <Text>Setting</Text>
      <View
        style={{
          elevation: 10,
          width: 100,
          height: 100,
          backgroundColor: "white",
        }}
      ></View>
    </View>
  );
};

export default Setting;
