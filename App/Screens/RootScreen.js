import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Provider as StoreProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import rootReducer from "../Redux/Reducers";
import { createStore } from "redux";
import Splash from "./Components/Splash";
import LoginStack from "./Navigation/LoginStack";

const RootScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      console.log("test");
    };
  }, []);

  return (
    <StoreProvider store={createStore(rootReducer)}>
      <PaperProvider>
        <StatusBar style="auto" />
        {loading ? <Splash nowstate="Loading... TEST(1/1)" /> : <LoginStack />}
      </PaperProvider>
    </StoreProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RootScreen;
