import React, {
  useRef,
  useState,
  forwardRef,
  useCallback,
  useEffect,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  Easing,
  Platform,
  BackHandler,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import { IconButton } from "react-native-paper";
import { WebView as RNWebView } from "react-native-webview";

import { useCombinedRefs } from "../Utils/use-combine-refs";

const { width, height: initialHeight } = Dimensions.get("window");
const isAndroid = Platform.OS === "android";

const extractHostname = (url) => {
  let hostname;

  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }

  hostname = hostname.split(":")[0];
  hostname = hostname.split("?")[0];

  return hostname;
};

const documentHeightCallbackScript = `
  function onElementHeightChange(elm, callback) {
    var lastHeight;
    var newHeight;
    (function run() {
      newHeight = Math.max(elm.clientHeight, elm.scrollHeight);
      if (lastHeight != newHeight) {
        callback(newHeight);
      }
      lastHeight = newHeight;
      if (elm.onElementHeightChangeTimer) {
        clearTimeout(elm.onElementHeightChangeTimer);
      }
      elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
  }
  onElementHeightChange(document.body, function (height) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        event: 'documentHeight',
        documentHeight: height,
      }),
    );
  });
`;

export const Modal = forwardRef((_, ref) => {
  const modalizeRef = useRef(null);
  const webViewRef = useRef(null);
  const combinedRef = useCombinedRefs(ref, modalizeRef);
  const [url, setUrl] = useState("");
  const [secured, setSecure] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [back, setBack] = useState(false);
  const [forward, setForward] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const [layoutHeight, setLayoutHeight] = useState(initialHeight);
  const [documentHeight, setDocumentHeight] = useState(initialHeight);
  const height = isAndroid ? documentHeight : layoutHeight;

  const handleClose = () => {
    if (modalizeRef.current) {
      modalizeRef.current.close();
    }
  };

  const handleLoad = (status) => {
    setMounted(true);

    if (status === "progress" && !mounted) {
      return;
    }

    const toValue = status === "start" ? 0.2 : status === "progress" ? 0.5 : 1;

    Animated.timing(progress, {
      toValue,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    if (status === "end") {
      Animated.timing(progress, {
        toValue: 2,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        progress.setValue(0);
      });
    }
  };

  const handleNavigationStateChange = useCallback(
    ({ url, canGoBack, canGoForward, loading, navigationType }) => {
      setBack(canGoBack);
      setForward(canGoForward);
      setSecure(url.includes("https"));
      setUrl(extractHostname(url));

      if (!loading && !navigationType && isAndroid) {
        if (webViewRef.current) {
          webViewRef.current.injectJavaScript(documentHeightCallbackScript);
        }
      }
    },
    []
  );

  const handleMessage = useCallback((event) => {
    if (!isAndroid) {
      return;
    }

    const data = JSON.parse(event.nativeEvent.data);

    if (!data) {
      return;
    }

    switch (data.event) {
      case "documentHeight": {
        if (data.documentHeight !== 0) {
          setDocumentHeight(data.documentHeight);
        }

        break;
      }
    }
  }, []);

  const handleBack = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const handleForward = () => {
    if (webViewRef.current) {
      webViewRef.current.goForward();
    }
  };

  const handleLayout = ({ layout }) => {
    setLayoutHeight(layout.height);
  };

  const renderHeader = () => (
    <View style={s.header}>
      <View style={s.header__wrapper}>
        <IconButton
          icon="window-close"
          size={20}
          onPress={handleClose}
          style={s.header__close}
        />

        <IconButton
          icon="arrow-left"
          size={24}
          onPress={handleBack}
          disabled={!back}
        />

        <View style={s.header__center}>
          {secured && (
            <MaterialCommunityIcons name="lock" size={20} color="#31a14c" />
          )}
          <Text
            style={[s.header__url, { color: secured ? "#31a14c" : "#5a6266" }]}
            numberOfLines={1}
          >
            {url}
          </Text>
        </View>

        <IconButton
          icon="arrow-right"
          size={24}
          onPress={handleForward}
          disabled={!forward}
          style={s.header__arrowRight}
        />

        <IconButton icon="dots-horizontal" size={24} disabled />
      </View>

      <Animated.View
        style={[
          s.header__progress,
          {
            transform: [
              {
                translateX: progress.interpolate({
                  inputRange: [0, 0.2, 0.5, 1, 2],
                  outputRange: [-width, -width + 80, -width + 220, 0, 0],
                }),
              },
            ],
            opacity: progress.interpolate({
              inputRange: [0, 0.1, 1, 2],
              outputRange: [0, 1, 1, 0],
            }),
          },
        ]}
      />
    </View>
  );

  return (
    <Modalize
      ref={combinedRef}
      HeaderComponent={renderHeader}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      onLayout={handleLayout}
    >
      <RNWebView
        ref={webViewRef}
        source={{
          uri: "http://board.sejong.ac.kr/mboardlistmobile.do?bbsConfigFK=335",
        }}
        onLoadStart={() => handleLoad("start")}
        onLoadProgress={() => handleLoad("progress")}
        onLoadEnd={() => handleLoad("end")}
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={handleMessage}
        startInLoadingState={true}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isAndroid}
        containerStyle={{ paddingBottom: 10 }}
        style={{ height }}
      />
    </Modalize>
  );
});

const s = StyleSheet.create({
  header: {
    height: 44,

    borderBottomColor: "#c1c4c7",
    borderBottomWidth: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },

  header__wrapper: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,

    paddingHorizontal: 12,

    height: "100%",
  },

  header__close: {
    marginRight: 25,
  },

  header__center: {
    flexDirection: "row",
    alignItems: "center",

    marginLeft: "auto",
  },

  header__url: {
    marginLeft: 4,

    fontSize: 16,
    fontWeight: "500",
  },

  header__arrowRight: {
    marginLeft: "auto",
    marginRight: 25,
  },

  header__progress: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

    backgroundColor: "#f6f7f9",

    opacity: 0,

    transform: [
      {
        translateX: -width,
      },
    ],
  },
});
