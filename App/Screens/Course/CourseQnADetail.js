import * as React from "react";
import { Dimensions, View, Text, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { WebView } from "react-native-webview";
import Global from "../../Styles/GlobalStyles";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const { width: screenWidth } = Dimensions.get("window");

const CourseQnADetail = (props) => {
  const [webViewHeight, setWebViewHeight] = React.useState(null);
  const [answerHeight, setAnsweerHeight] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const navigation = useNavigation();
  const now = useSelector((state) => state.Now);

  const params = props.route.params.item;

  const yyyymmdd = (date) => {
    const timeValue = new Date(date);

    var year = timeValue.getFullYear(); //yyyy
    var month = 1 + timeValue.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    var day = timeValue.getDate(); //d
    day = day >= 10 ? day : "0" + day;

    return `${year}-${month}-${day}`;
  };

  const onMessage = (event) => {
    setWebViewHeight(Number(event.nativeEvent.data));
  };
  const onLayout = (event) => {
    setAnsweerHeight(event.nativeEvent.layout.height);
  };

  const onShouldStartLoadWithRequest = (request) => {
    if (request.navigationType === "click") {
      // Open all new click-throughs in external browser.
      Linking.openURL(request.url);
      return false;
    }
    return true;
  };

  const submitAnswer = async () => {
    console.log(comment);
  };

  const timeForToday = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 7) {
      return `${betweenTimeDay}일전`;
    }

    var year = timeValue.getFullYear(); //yyyy
    var month = 1 + timeValue.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    var day = timeValue.getDate(); //d
    day = day >= 10 ? day : "0" + day;

    return `${year}-${month}-${day}`;
  };

  const head = `
                <style type="text/css"> @font-face {font-family: 'Square'; src:url('file:///App/Assets/fonts/NanumSquare_acB.ttf')}</style>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body { font-size: 150%; word-wrap: break-word; overflow-wrap: break-word;}
                </style>
              `;
  const body =
    head +
    `<p style='font-family:"Square";'>
      ${params.body}
    </p>`;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 60,
        minHeight: webViewHeight + answerHeight,
      }}
    >
      <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
        <Text
          onPress={() => navigation.goBack()}
          style={{ fontFamily: "Square", color: Global.Colors.gray1 }}
        >
          {now.title} &gt;{" "}
          <Text style={{ color: "black" }}>{props.route.params.way} </Text>
        </Text>
        <Text
          style={{
            fontFamily: "Square",
            fontSize: 25,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          {params.title}
        </Text>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>{params.issuer}</Text>
            <View style={{ flexDirection: "row" }}>
              <AntDesign
                name="calendar"
                size={20}
                color="black"
                style={{ marginRight: 5 }}
              />
              <Text>{yyyymmdd(params.createdAt)}</Text>
            </View>
          </View>
        </View>
      </View>

      <WebView
        originWhitelist={["*"]}
        source={{
          html: `<html>
                    <head>
                      ${head}
                    </head>
                    <body>
                      ${body}
                    </body>
                </html>`,
        }}
        //source={{ uri: "https://tofugear.com" }}
        containerStyle={{ padding: 20, minHeight: 200 }}
        bounces={true}
        scrollEnabled={false}
        onMessage={onMessage}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        injectedJavaScript="window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));"
      />
      <View style={{ paddingHorizontal: 20 }} onLayout={onLayout}>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="message-reply-text"
            size={24}
            color={Global.Colors.sjred}
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontFamily: "Square", fontSize: 20 }}>2개의 답변</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setComment(text)}
            value={comment}
            label="답글 작성"
            theme={{
              colors: { primary: Global.Colors.sjgray },
              fonts: { regular: { fontFamily: "Square_L" } },
            }}
            multiline={true}
          />
          <Button
            icon="pencil"
            mode="contained"
            onPress={submitAnswer}
            theme={{
              colors: { primary: Global.Colors.sjgray },
              fonts: { regular: { fontFamily: "Square_L" } },
            }}
            style={{ alignSelf: "flex-end" }}
          >
            답글 작성
          </Button>
        </View>
        <View style={styles.answer_box}>
          <View style={styles.answer_header}>
            <View style={styles.answer_user}>
              <FontAwesome5 name="user-alt" size={24} color="black" />
              <Text
                style={{
                  fontFamily: "Square",
                  fontSize: 20,
                  marginHorizontal: 10,
                }}
              >
                교수자
              </Text>
              <Octicons name="verified" size={15} color="green" />
            </View>
            <View>
              <Text style={{ color: "gray" }}>{timeForToday(new Date())}</Text>
            </View>
          </View>
          <View>
            <Text>
              Expo는 네이티브 언어의 사용없이 앱을 개발할 수 있도록 해주는
              프레임워크입니다.
            </Text>
          </View>
        </View>
        <View style={styles.answer_box}>
          <View style={styles.answer_header}>
            <View style={styles.answer_user}>
              <FontAwesome5 name="user-alt" size={24} color="black" />
              <Text
                style={{
                  fontFamily: "Square",
                  fontSize: 20,
                  marginHorizontal: 10,
                }}
              >
                박별
              </Text>
            </View>
            <View>
              <Text style={{ color: "gray" }}>{timeForToday(new Date())}</Text>
            </View>
          </View>
          <View>
            <Text>감사합니다.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: screenWidth,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 50,
    backgroundColor: "white",
    marginBottom: 10,
  },
  answer_box: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Global.Colors.gray,
    borderRadius: 20,
  },
  answer_header: {
    marginBottom: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  answer_user: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CourseQnADetail;
