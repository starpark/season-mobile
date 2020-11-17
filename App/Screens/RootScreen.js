import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Splash from "./Components/Splash";
import LoginStack from "./Navigation/LoginStack";
import { useSelector } from "react-redux";
import BottomTab from "./Navigation/BottomTab";
import Spinner from "react-native-loading-spinner-overlay";

const RootScreen = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.Auth);
  const apiloading = useSelector((state) => state.API);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {};
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Spinner
        visible={apiloading}
        size="large"
        animation="fade"
        color="#DC143C"
        overlayColor="rgba(0,0,0,0.4)"
      />
      {loading ? (
        <Splash nowstate="Loading... TEST(1/1)" />
      ) : user ? (
        <BottomTab />
      ) : (
        <LoginStack />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    elevation: 1,
  },
});

export default RootScreen;
