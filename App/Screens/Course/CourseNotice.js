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
import { Entypo } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
const { width: screenWidth } = Dimensions.get("window");

const response = [
  {
    title: "공지는 읽으세요 제발",
    body: "<span>아령하세여</span>",
    issuer: "string",
    createdAt: "2020-11-24T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "공지는 읽으세요 제발",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-24T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "공지는 읽으세요 제발",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-24T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "공지는 읽으세요 제발",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-24T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "공지는 읽으세요 제발",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-24T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "공지는 읽으세요 제발",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-23T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "공지는 읽으세요 제발",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-23T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "공지는 읽으세요 제발",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-23T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "공지는 읽으세요 제발",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-23T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "공지는 읽으세요 제발",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-23T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "공지는 읽으세요 제발",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-23T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "공지는 읽으세요 제발",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-22T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title: "공지는 읽으세요 제발",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-22T07:50:45.997Z",
    updatedAt: "date",
  },
  {
    title:
      "공지는 읽으세요 제발공지는 읽으세요 제발공지는 읽으세요 제발공지는 읽으세요 제발공지는 읽으세요 제발공지는 읽으세요 제발공지는 읽으세요 제발공지는 읽으세요 제발",
    body: "string",
    issuer: "string",
    createdAt: "2020-11-10T07:50:45.997Z",
    updatedAt: "date",
  },
];

const CourseNotice = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();
  const now = useSelector((state) => state.Now);

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
          navigation.navigate("NoticeMore", { item, way: now.title })
        }
      >
        <View style={styles.notice_box}>
          <View>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: "Square",
                width: screenWidth - 100,
              }}
            >
              {item.title}
            </Text>
            <Text style={{ color: Global.Colors.sjWgray2 }}>
              {item.issuer} · {timeForToday(item.createdAt)}
            </Text>
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
    marginBottom: 80,
  },
  notice_box: {
    width: screenWidth,
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CourseNotice;
