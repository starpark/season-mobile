import * as React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import Actions from "../../Redux/Actions";
import Global from "../Styles/GlobalStyles";

const Messenger = () => {
  return (
    <SafeAreaView style={Global.Styles.container}>
      <Text>Messenger</Text>
    </SafeAreaView>
  );
};

export default Messenger;
