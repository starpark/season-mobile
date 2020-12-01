import * as React from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { WebView } from "react-native-webview";
import Global from "../../Styles/GlobalStyles";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");

const NoticeMore = (props) => {
  const navigation = useNavigation();

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
    <View style={{ flex: 1 }}>
      <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
        <Text
          onPress={() => navigation.goBack()}
          style={{ fontFamily: "Square", color: Global.Colors.gray1 }}
        >
          {props.route.params.way} &gt;{" "}
          <Text style={{ color: "black" }}>공지사항</Text>
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
        containerStyle={{ padding: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: screenWidth,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default NoticeMore;
