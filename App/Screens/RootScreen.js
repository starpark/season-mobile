import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, BackHandler } from "react-native";
import { Provider, DefaultTheme, configureFonts } from "react-native-paper";
import Splash from "./SplashScreen";
import LoginStack from "../Navigation/LoginStack";
import { useSelector } from "react-redux";
import Root from "../Navigation/RootStack";
import Spinner from "react-native-loading-spinner-overlay";
import NetInfo from "@react-native-community/netinfo";
import { Snackbar } from "react-native-paper";
import * as Font from "expo-font";

const RootScreen = () => {
  const [loading, setLoading] = useState(true);
  const [nowState, setNowState] = useState("");
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.Auth);
  const apiCalled = useSelector((state) => state.Api);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    const _loadFontsAsync = async () => {
      await Font.loadAsync({
        Nanum: require("../Assets/fonts/NanumPen.ttf"),
        Square: require("../Assets/fonts/NanumSquare_acB.ttf"),
        Square_EB: require("../Assets/fonts/NanumSquare_acEB.ttf"),
        Square_L: require("../Assets/fonts/NanumSquare_acL.ttf"),
      });
      setNowState("");
    };

    setNowState("네트워크 상태 확인중...");
    NetInfo.fetch().then((state) => {
      if (!state) {
        setNowState("네트워크 연결을 확인해주세요.");
        setVisible(true);
      }
    });
    setNowState("폰트 불러오는중...");
    _loadFontsAsync();
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {};
  }, []);

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Spinner
          visible={apiCalled}
          size="large"
          animation="fade"
          color="#DC143C"
          overlayColor="rgba(0,0,0,0.4)"
        />
        <Snackbar
          style={{ zIndex: 1 }}
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: "종료",
            onPress: () => {
              BackHandler.exitApp();
            },
          }}
        >
          {nowState}
        </Snackbar>
        {loading ? (
          <Splash nowstate={nowState} />
        ) : user ? (
          <Root />
        ) : (
          <LoginStack />
        )}
      </SafeAreaView>
    </Provider>
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
