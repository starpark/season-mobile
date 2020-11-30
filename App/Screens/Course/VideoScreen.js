import * as React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  Alert,
  BackHandler,
  TouchableWithoutFeedback,
} from "react-native";
import { Video } from "expo-av";
import { useNetInfo } from "@react-native-community/netinfo";
import { useRoute, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Slider from "@react-native-community/slider";
import * as ScreenOrientation from "expo-screen-orientation";
import Animated from "react-native-reanimated";
import { IconButton, Snackbar } from "react-native-paper";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import Global from "../../Styles/GlobalStyles";
import Spinner from "react-native-loading-spinner-overlay";

let backControlTimeOut = null;
let controlsTimeOut = null;

const Community = () => {
  const VideoRef = React.useRef();
  const doubleTapRefL = React.useRef();
  const doubleTapRefR = React.useRef();
  const [videoEnd, setVideoEnd] = React.useState(false);
  const [playBackState, setPlayBackState] = React.useState(null);
  const [statusBarControl, setStatusBarControl] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [sliderValueChanging, setSliderValueChanging] = React.useState({
    state: false,
    value: 0,
  });
  const [controls, setControls] = React.useState(false);
  const [learningTime, setLearningTime] = React.useState(500000);
  const [
    playbackInstancePosition,
    setPlaybackInstancePosition,
  ] = React.useState(0);
  const [
    playbackInstanceDuration,
    setPlaybackInstanceDuration,
  ] = React.useState(0);
  const [lastUpdate, setLastUpdate] = React.useState(0);
  const { isConnected } = useNetInfo();
  const route = useRoute();
  const navigation = useNavigation();
  const { item, lectures } = route.params;

  let backControl = false;

  React.useEffect(() => {
    const orientation_LANDSCAPE = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };

    const orientation_DEFAULT = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.DEFAULT
      );
    };
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    orientation_LANDSCAPE();

    return () => {
      clearTimeout(backControlTimeOut);
      clearTimeout(controlsTimeOut);
      orientation_DEFAULT();
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    if (!backControl) {
      setStatusBarControl(true);
      backControl = true;
      backControlTimeOut = setTimeout(() => {
        setStatusBarControl(false);
        backControl = false;
      }, 2000);
    } else {
      clearTimeout(backControlTimeOut);
      return false;
    }
    return true;
  };

  const updatePlaybackStatus = (newPlaybackState) => {
    if (playBackState !== newPlaybackState) {
      setPlayBackState(newPlaybackState);
    }
    if (newPlaybackState === "end") {
      setVideoEnd(true);
      setControls(true);
    }
  };

  const updatePlayback = (status) => {
    if (!status.isLoaded) {
      if (status.error) {
        updatePlaybackStatus("error");
      }
    } else {
      setPlaybackInstancePosition(status.positionMillis || 0);
      if (learningTime < status.positionMillis) {
        setLearningTime(status.positionMillis || 0);
      }
      setPlaybackInstanceDuration(status.durationMillis || 0);
      if (status.didJustFinish) {
        updatePlaybackStatus("end");
      } else {
        if (!isConnected && status.isBuffering) {
          Alert.alert(
            "네트워크 연결이 끊겼습니다.",
            `최근저장기록: ${lastUpdate}`,
            [{ text: "강의종료", onPress: () => console.log("1") }]
          );
        } else {
          updatePlaybackStatus(isPlayingOrBufferingOrPaused(status));
        }
      }
    }
  };

  const isPlayingOrBufferingOrPaused = (status) => {
    if (!status.isLoaded) {
      return "error";
    }
    if (status.isPlaying) {
      return "playing";
    }
    if (status.isBuffering) {
      return "buffering";
    }
    return "paused";
  };

  const getMMSSFromMillis = (millis) => {
    const totalSeconds = millis / 1000;
    const seconds = String(Math.floor(totalSeconds % 60));
    const minutes = String(Math.floor(totalSeconds / 60));
    return minutes.padStart(2, "0") + ":" + seconds.padStart(2, "0");
  };

  const sliderPosition = () =>
    playbackInstancePosition / playbackInstanceDuration || 0;

  const sliderValueChange = async (value) => {
    clearTimeout(controlsTimeOut);
    setSliderValueChanging({
      ...sliderValueChanging,
      state: true,
      value: value * playbackInstanceDuration,
    });

    await VideoRef.current.setStatusAsync({ shouldPlay: false });
  };

  const sliderValudeComplete = async (value) => {
    let v = value;
    if (v > learningTime / playbackInstanceDuration) {
      v = learningTime / playbackInstanceDuration;
      onToggleSnackBar(!visible);
    }
    try {
      const playback = await VideoRef.current.setStatusAsync({
        positionMillis: v * playbackInstanceDuration,
        shouldPlay: true,
      });
      setSliderValueChanging({
        ...sliderValueChanging,
        state: false,
        value: 0,
      });
    } catch (e) {
      console.error(e);
    } finally {
      hideControls(2000);
    }
  };

  const showControls = () => {
    if (!controls) {
      setControls(true);
      hideControls(5000);
    }
  };

  const hideControls = (t) => {
    clearTimeout(controlsTimeOut);
    controlsTimeOut = setTimeout(() => {
      setControls(false);
    }, t);
  };

  const hideControlDirect = () => {
    clearTimeout(controlsTimeOut);
    setControls(false);
  };

  const pauseVideo = async () => {
    try {
      await VideoRef.current.pauseAsync();
    } catch (e) {
      console.error(e);
    }
  };

  const playVideo = async () => {
    try {
      await VideoRef.current.playAsync();
    } catch (e) {
      console.error(e);
    }
  };

  const _onSingleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      showControls();
    }
  };

  const _onDoubleTapL = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      back10Sec();
    }
  };

  const _onDoubleTapR = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      forward10Sec();
    }
  };

  const forward10Sec = async (event) => {
    let v = playbackInstancePosition + 10000;
    if (v > learningTime) {
      v = learningTime;
      onToggleSnackBar(!visible);
      return;
    }
    try {
      await VideoRef.current.setStatusAsync({
        positionMillis: v,
        shouldPlay: true,
      });
    } catch (e) {
      console.error(e);
    } finally {
      endToReplay();
    }
  };

  const back10Sec = async () => {
    const v = playbackInstancePosition - 10000;
    try {
      await VideoRef.current.setStatusAsync({
        positionMillis: v,
        shouldPlay: true,
      });
    } catch (e) {
      console.error(e);
    } finally {
      endToReplay();
    }
  };

  const replayVideo = async () => {
    try {
      await VideoRef.current.replayAsync();
      setVideoEnd(false);
    } catch (e) {
      console.error(e);
    } finally {
      endToReplay();
    }
  };

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const endToReplay = () => {
    if (videoEnd) {
      setVideoEnd(false);
      hideControls(2000);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar
        style="light"
        backgroundColor="rgba(0,0,0,0.5)"
        hideTransitionAnimation="slide"
        animated={true}
        hidden={!statusBarControl}
      />
      <Spinner
        visible={playBackState === "buffering"}
        size="large"
        animation="fade"
        color="#DC143C"
        overlayColor="rgba(0,0,0,0.4)"
      />
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={2000}
        wrapperStyle={{
          zIndex: 1500,
          elevation: 1500,
        }}
      >
        현재 수강 시간인 {getMMSSFromMillis(learningTime)}를 넘을 수 없습니다.
      </Snackbar>
      <View
        style={{
          position: "absolute",
          zIndex: 500,
          elevation: 500,
          flexDirection: "row",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <TapGestureHandler
          onHandlerStateChange={_onSingleTap}
          waitFor={doubleTapRefL}
        >
          <TapGestureHandler
            ref={doubleTapRefL}
            onHandlerStateChange={_onDoubleTapL}
            numberOfTaps={2}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </TapGestureHandler>
        </TapGestureHandler>
        <TapGestureHandler
          onHandlerStateChange={_onSingleTap}
          waitFor={doubleTapRefR}
        >
          <TapGestureHandler
            ref={doubleTapRefR}
            onHandlerStateChange={_onDoubleTapR}
            numberOfTaps={2}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </TapGestureHandler>
        </TapGestureHandler>
      </View>
      <View style={{ flex: 1 }}>
        <Video
          style={{
            flex: 1,
            backgroundColor: "black",
          }}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          shouldPlay={true}
          source={{ uri: item.videoUri }}
          ref={VideoRef}
          useNativeControls={false}
          onPlaybackStatusUpdate={updatePlayback}
          onLoadStart={() => updatePlaybackStatus("buffering")}
        />
      </View>
      {controls && (
        <TouchableWithoutFeedback
          onPress={hideControlDirect}
          style={{ flex: 1 }}
        >
          <Animated.View
            style={{
              position: "absolute",
              justifyContent: "center",
              zIndex: 1000,
              elevation: 1000,
              backgroundColor: "rgba(0,0,0,0.5)",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                paddingBottom: 20,
                paddingHorizontal: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontFamily: "Square", color: "white" }}>
                  {sliderValueChanging.state
                    ? getMMSSFromMillis(sliderValueChanging.value)
                    : getMMSSFromMillis(playbackInstancePosition)}{" "}
                  / {getMMSSFromMillis(playbackInstanceDuration)}
                </Text>
              </View>

              <Slider
                style={{ flex: 1, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={Global.Colors.sjred}
                maximumTrackTintColor="white"
                thumbTintColor={Global.Colors.sjred}
                value={sliderPosition()}
                onValueChange={sliderValueChange}
                onSlidingComplete={sliderValudeComplete}
                disabled={playBackState === "error"}
              />
            </View>
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                justifyContent: "space-between",
              }}
            >
              <IconButton
                icon="arrow-left"
                size={25}
                color="white"
                onPress={() => navigation.goBack()}
              />
              <Text
                style={{
                  fontFamily: "Square_EB",
                  fontSize: 25,
                  color: "white",
                }}
              >
                {item.title}
              </Text>
              <IconButton
                icon="dots-horizontal"
                size={25}
                color="white"
                onPress={() => {}}
              />
            </View>
            <View
              style={{
                position: "absolute",
                alignSelf: "center",
                flexDirection: "row",
              }}
            >
              {videoEnd ? (
                <>
                  <IconButton
                    icon="replay"
                    size={60}
                    color="white"
                    onPress={replayVideo}
                  />
                </>
              ) : (
                <>
                  {!sliderValueChanging.state &&
                    playBackState === "playing" && (
                      <IconButton
                        icon="rewind-10"
                        size={60}
                        color="white"
                        onPress={back10Sec}
                      />
                    )}
                  {!sliderValueChanging.state &&
                    playBackState === "playing" && (
                      <IconButton
                        icon="pause-circle-outline"
                        size={60}
                        color="white"
                        onPress={pauseVideo}
                      />
                    )}
                  {!sliderValueChanging.state && playBackState === "paused" && (
                    <IconButton
                      icon="play-circle-outline"
                      size={60}
                      color="white"
                      onPress={playVideo}
                    />
                  )}
                  {!sliderValueChanging.state &&
                    playBackState === "playing" && (
                      <IconButton
                        icon="fast-forward-10"
                        size={60}
                        color="white"
                        onPress={forward10Sec}
                      />
                    )}
                </>
              )}
            </View>

            {/* <Text style={{ fontFamily: "Square", fontSize: 20 }}>
          {item.description}
        </Text> */}
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
};

export default Community;
