import * as React from "react";
import { SafeAreaView, View, Text, Button } from "react-native";

import Global from "../Styles/GlobalStyles";

const CommunityScreen = () => {
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
        커뮤니티
      </Text>
    </View>
  );
};

export default CommunityScreen;
