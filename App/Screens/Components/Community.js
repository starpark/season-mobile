import * as React from "react";
import { SafeAreaView, View, Text, Button } from "react-native";

import Global from "../Styles/GlobalStyles";

const Community = () => {
  return (
    <View style={Global.Styles.container}>
      <Text>CCC</Text>
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

export default Community;
