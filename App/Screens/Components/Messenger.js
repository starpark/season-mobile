import * as React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import Actions from "../../Redux/Actions";
import styles from "./styles";

const Messenger = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Messenger</Text>
    </SafeAreaView>
  );
};

export default Messenger;
