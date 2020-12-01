import * as React from "react";
import { SafeAreaView, View, Text, Button } from "react-native";

import Global from "../Styles/GlobalStyles";

const MessengerScreen = () => {
  return (
    <View style={Global.Styles.container}>
      <Text
        style={{
          fontFamily: "Square",
          fontSize: 25,
          marginLeft: 20,
          marginTop: 20,
          elevation: 10,
          zIndex: 10,
        }}
      >
        메신저
      </Text>
    </View>
  );
};

export default MessengerScreen;
