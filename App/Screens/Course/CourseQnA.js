import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import Global from "../../Styles/GlobalStyles";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
const { width: screenWidth } = Dimensions.get("window");

const response = [
  {
    title: "교수님 질문이요!!!!!!!!!!1",
    body: "<span>아령하세여</span>",
    issuer: "string",
    createdAt: "2020-11-24T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "교수님 질문이요!!!!!!!!!!1",
    body:
      "<a href='https://learn-ap-northeast-2-prod-fleet01-xythos.content.blackboardcdn.com/5cf774ff89eaf/3508111?X-Blackboard-Expiration=1606759200000&X-Blackboard-Signature=O3KAXZyGt3p2s%2FuXSFy6w1VL7AajzG6AY9T2X9oQXJ0%3D&X-Blackboard-Client-Id=513122&response-cache-control=private%2C%20max-age%3D21600&response-content-disposition=inline%3B%20filename%2A%3DUTF-8%27%27C1.pdf&response-content-type=application%2Fpdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20201130T120000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21600&X-Amz-Credential=AKIAZH6WM4PLRAIZCZRQ%2F20201130%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=dd02230831e326427eae01d0a7403fe8be607da03a32e6383b3b1555288ede67'> rr </a>",
    issuer: "string",
    createdAt: "2020-11-24T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "교수님 질문이요!!!!!!!!!!1",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-24T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "교수님 질문이요!!!!!!!!!!1",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-24T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "교수님 질문이요!!!!!!!!!!1",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-24T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "교수님 질문이요!!!!!!!!!!1",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-23T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "교수님 질문이요!!!!!!!!!!1",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-23T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "교수님 질문이요!!!!!!!!!!1",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-23T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "교수님 질문이요!!!!!!!!!!1",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-23T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "교수님 질문이요!!!!!!!!!!1",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-23T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "교수님 질문이요!!!!!!!!!!1",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-23T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "교수님 질문이요!!!!!!!!!!1",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-22T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "교수님 질문이요!!!!!!!!!!1",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-22T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title:
      "교수님 질문이요!!!!!!!!!!1교수님 질문이요!!!!!!!!!!1교수님 질문이요!!!!!!!!!!1교수님 질문이요!!!!!!!!!!1교수님 질문이요!!!!!!!!!!1교수님 질문이요!!!!!!!!!!1교수님 질문이요!!!!!!!!!!1교수님 질문이요!!!!!!!!!!1",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-10T07:50:45.997Z",
    updatedAt: "date",
  },
];

const CourseQnA = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  function timeForToday(value) {
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
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableRipple
        onPress={() =>
          navigation.navigate("CourseQnADetail", { item, way: "질의응답" })
        }
      >
        <View style={styles.notice_box}>
          <View>
            <Text numberOfLines={1} style={styles.notice_title}>
              {item.title}
            </Text>
            <Text style={{ color: Global.Colors.sjWgray2 }}>
              {item.issuer} · {timeForToday(item.createdAt)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="message-reply-text"
              size={16}
              color={Global.Colors.sjred}
              style={{ marginHorizontal: 5 }}
            />
            <Text>0</Text>
          </View>

          <Entypo
            name="chevron-right"
            size={24}
            color={Global.Colors.sjgray}
            style={{ alignSelf: "center" }}
          />
        </View>
      </TouchableRipple>
    );
  };

  return (
    <View style={styles.contanier}>
      <FlatList
        data={response}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}${item.createdAt}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    paddingBottom: 60,
  },
  notice_box: {
    width: screenWidth,
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  notice_title: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Square",
    width: 250,
  },
});

export default CourseQnA;
