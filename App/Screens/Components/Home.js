import * as React from "react";
import { SafeAreaView, Text, Button } from "react-native";
import Actions from "../../Redux/Actions";
import styles from "./styles";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;
