import * as React from "react";
import { SafeAreaView, Text, Button } from "react-native";
import Actions from "../../Redux/Actions";

const Home = () => {
  return (
    <SafeAreaView>
      <Text>Home</Text>

      <Button onPress={() => {}} title="로그아웃" />
    </SafeAreaView>
  );
};

export default Home;
