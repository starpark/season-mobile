import * as React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  RefreshControl,
} from "react-native";
import Global from "../Styles/GlobalStyles";
import { Text, TouchableRipple, IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { Foundation, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import Action from "../Redux/Actions";
import { ScrollView } from "react-native-gesture-handler";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useNavigation } from "@react-navigation/native";
import { Portal } from "react-native-portalize";
import { Modal } from "../Components/Modal";

const { width: screenWidth } = Dimensions.get("window");

const backgrounds = {
  0: require(`../Assets/image/background1.jpg`),
  1: require(`../Assets/image/background2.jpg`),
  2: require(`../Assets/image/background3.jpg`),
  3: require(`../Assets/image/background4.jpg`),
  4: require(`../Assets/image/background5.jpg`),
  5: require(`../Assets/image/background6.jpg`),
};
const Home = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [entries, setEntries] = React.useState([]);
  const [uri, setUri] = React.useState("");
  const navigation = useNavigation();
  const modalRef = React.useRef(null);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(Action.APIAction.API_CALL());
    setEntries(require("../Utils/json").ENTRIES1);
    dispatch(Action.APIAction.API_END());
    return () => {};
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const openNotice = () => {
    navigation.navigate("Notice");
  };

  const openHomePage = () => {
    setUri("http://m.sejong.ac.kr/index.do");
    modalRef.current.open();
  };

  const openSchedule = () => {
    setUri("http://m.sejong.ac.kr/contents/mobile/cor/scheduleguide.html");
    modalRef.current.open();
  };

  const RenderItem = ({ item, index }) => {
    return (
      <View style={styless.item}>
        <IconButton
          icon="plus-circle-outline"
          color="white"
          size={30}
          style={styless.item_more}
          onPress={() => console.log("Pressed")}
        />
        <Text style={{ fontFamily: "Godo" }}>{item.title}</Text>
        <Text style={styless.item_instructor}>{item.instructor}</Text>
        <View style={styless.item_box}>
          <View
            style={[
              styless.item_left_line,
              { backgroundColor: Global.Colors.course[index] },
            ]}
          />
          <View style={styless.item_inner}>
            <View style={{ height: 70 }}>
              <Text style={styless.item_title}>최근 공지사항</Text>
              <View>
                <View style={styless.item_contents}>
                  <Text numberOfLines={1}>- 공지는 읽으세요... 제발...</Text>
                  <Text>2020-11-22</Text>
                </View>
                <View style={styless.item_contents}>
                  <Text numberOfLines={1}>- 공지는 읽으세요... 제발...</Text>
                  <Text>2020-11-22</Text>
                </View>
              </View>
            </View>
            <View style={{ height: 70 }}>
              <Text style={styless.item_title}>최근 업로드된 강의</Text>
              <View>
                <View>
                  <View style={styless.item_contents}>
                    <Text numberOfLines={1}>
                      - 강의는 챙겨보세요... 제발...
                    </Text>
                    <Text>2020-11-22</Text>
                  </View>
                  <View style={styless.item_contents}>
                    <Text numberOfLines={1}>
                      - 강의는 챙겨보세요... 제발...
                    </Text>
                    <Text>2020-11-22</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styless.item_tasktracker_title}>Task Tracker</Text>
              <View style={styless.item_tasktracker_box}>
                <View style={styless.item_tasktracker_contents_box}>
                  <View style={styless.item_tasktracker_content}>
                    <Entypo name="time-slot" size={24} color="black" />
                    <Text style={styless.item_tasktracker_content_title}>
                      학습 시간
                    </Text>
                  </View>
                  <View style={styless.item_tasktracker_content_box}>
                    <Text style={styless.item_tasktracker_content_info}>
                      {item.learningTime} 분
                    </Text>
                  </View>
                </View>
                <View style={styless.item_tasktracker_contents_box}>
                  <View style={styless.item_tasktracker_content}>
                    <Foundation name="graph-bar" size={24} color="black" />
                    <Text style={styless.item_tasktracker_content_title}>
                      점수
                    </Text>
                  </View>
                  <View style={styless.item_tasktracker_content_box}>
                    <Text style={styless.item_tasktracker_content_info}>
                      {item.score.now} 점
                    </Text>
                    <Text style={styless.item_tasktracker_content_sub}>
                      / {item.score.max}
                    </Text>
                  </View>
                </View>
                <View style={styless.item_tasktracker_contents_box}>
                  <View style={styless.item_tasktracker_content}>
                    <MaterialCommunityIcons
                      name="checkbox-marked-circle-outline"
                      size={24}
                      color="black"
                    />
                    <Text style={styless.item_tasktracker_content_title}>
                      출석
                    </Text>
                  </View>
                  <View style={styless.item_tasktracker_content_box}>
                    <Text style={styless.item_tasktracker_content_info}>
                      {item.attendance.now} 회
                    </Text>
                    <Text style={styless.item_tasktracker_content_sub}>
                      / {item.attendance.max}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={styless.item_tasktracker_due_box}>
                  <Text style={styless.item_tasktracker_due_content}>D-7</Text>
                  <Text>과제는 미리하세요 제발...</Text>
                </View>
                <View style={styless.item_tasktracker_due_box}>
                  <Text style={styless.item_tasktracker_due_content}>D-7</Text>
                  <Text>수업은 미리 들으세요 제발...</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={Global.Styles.container}>
      <View style={styless.header}>
        <Image
          source={require("../Assets/image/sjlogo.png")}
          style={styless.header_logo}
        />
        <View style={styless.header_slogan_box}>
          <Text style={styless.header_slogan}>창조하라! 세종처럼!</Text>
        </View>
      </View>
      <View style={styless.course_box}>
        <View style={styless.course_title_wrapper}>
          <View style={styless.course_title_border}>
            <Text style={styless.course_title_content}>나의 코스</Text>
          </View>

          <View style={styless.course_title_rest} />
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styless.course_scroll_box}
          pagingEnabled={true}
          decelerationRate={"fast"}
          snapToInterval={370} //your element width
          snapToAlignment={"start"}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {entries.map((item, index) => (
            <RenderItem index={index} item={item} key={index} />
          ))}
        </ScrollView>
      </View>
      <ScrollView
        contentContainerStyle={styless.shortcut_scroll_box}
        showsVerticalScrollIndicator={false}
      >
        <View style={styless.shortcut_scroll_content}>
          <ImageBackground
            source={backgrounds[0]}
            style={styless.shortcut_scroll_imgbg_view}
            imageStyle={styless.shortcut_scroll_imgbg_img}
            blurRadius={1}
          >
            <TouchableRipple
              borderless={true}
              style={styless.shortcut_scroll_touch_box}
              onPress={openNotice}
            >
              <View style={{ padding: 10 }}>
                <Text style={styless.shortcut_scroll_touch_title}>
                  공지사항
                </Text>
                <Text style={styless.shortcut_scroll_touch_subtitle}>
                  Notice
                </Text>
              </View>
            </TouchableRipple>
          </ImageBackground>
          <ImageBackground
            source={backgrounds[1]}
            style={styless.shortcut_scroll_imgbg_view}
            imageStyle={styless.shortcut_scroll_imgbg_img}
            blurRadius={1}
          >
            <TouchableRipple
              borderless={true}
              style={styless.shortcut_scroll_touch_box}
              onPress={openSchedule}
            >
              <View style={{ padding: 10 }}>
                <Text style={styless.shortcut_scroll_touch_title}>
                  학사 일정
                </Text>
                <Text style={styless.shortcut_scroll_touch_subtitle}>
                  Academic Calendar
                </Text>
              </View>
            </TouchableRipple>
          </ImageBackground>
        </View>
        <View style={styless.shortcut_scroll_content}>
          <ImageBackground
            source={backgrounds[2]}
            style={styless.shortcut_scroll_imgbg_view}
            imageStyle={styless.shortcut_scroll_imgbg_img}
            blurRadius={1}
          >
            <TouchableRipple
              borderless={true}
              style={styless.shortcut_scroll_touch_box}
              onPress={() => console.log("1")}
            >
              <View style={{ padding: 10 }}>
                <Text style={styless.shortcut_scroll_touch_title}>
                  성적조회
                </Text>
                <Text style={styless.shortcut_scroll_touch_subtitle}>
                  Academic Calendar
                </Text>
              </View>
            </TouchableRipple>
          </ImageBackground>
          <ImageBackground
            source={backgrounds[3]}
            style={styless.shortcut_scroll_imgbg_view}
            imageStyle={styless.shortcut_scroll_imgbg_img}
            blurRadius={1}
          >
            <TouchableRipple
              borderless={true}
              style={styless.shortcut_scroll_touch_box}
              onPress={openHomePage}
            >
              <View style={{ padding: 10 }}>
                <Text style={styless.shortcut_scroll_touch_title}>
                  세종대 홈페이지
                </Text>
                <Text style={styless.shortcut_scroll_touch_subtitle}>
                  Home Page
                </Text>
              </View>
            </TouchableRipple>
          </ImageBackground>
        </View>
      </ScrollView>
      <Portal>
        <Modal ref={modalRef} uri={uri} />
      </Portal>
    </SafeAreaView>
  );
};

const styless = StyleSheet.create({
  item: {
    width: 350,
    borderRadius: 13,
    marginRight: 20,
    marginVertical: 10,
  },
  item_more: {
    position: "absolute",
    alignSelf: "center",
    bottom: -28,
    backgroundColor: Global.Colors.sjgray,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    zIndex: 1,
    elevation: 6,
  },
  item_instructor: {
    fontFamily: "Godo",
    fontSize: 12,
    color: Global.Colors.gray3,
  },
  item_box: {
    flexDirection: "row",
    height: 330,
    width: 350,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  item_left_line: {
    width: 7,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  item_inner: {
    paddingHorizontal: 10,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 40,
  },
  item_title: { fontFamily: "Godo", fontSize: 16, marginBottom: 5 },
  item_contents: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item_tasktracker_title: { fontFamily: "Godo", fontSize: 18, marginBottom: 5 },
  item_tasktracker_box: { flexDirection: "row", marginHorizontal: 10 },
  item_tasktracker_contents_box: { flex: 1, alignItems: "center" },
  item_tasktracker_content: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  item_tasktracker_content_title: {
    fontFamily: "Godo",
    fontSize: 14,
    marginLeft: 5,
  },
  item_tasktracker_content_box: { height: 50, justifyContent: "flex-start" },
  item_tasktracker_content_info: { fontFamily: "Godo", fontSize: 16 },
  item_tasktracker_content_sub: {
    alignSelf: "flex-start",
    fontSize: 12,
    color: "gray",
  },
  item_tasktracker_due_box: { flexDirection: "row", marginBottom: 5 },
  item_tasktracker_due_content: {
    backgroundColor: Global.Colors.red1,
    borderRadius: 5,
    paddingHorizontal: 3,
    color: "white",
    marginRight: 10,
  },
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  header_logo: {
    resizeMode: "contain",
    height: 40,
    width: 130,
    marginHorizontal: 20,
  },
  header_slogan_box: { flex: 1, alignItems: "flex-end" },
  header_slogan: {
    fontFamily: "Nanum",
    color: Global.Colors.sjgray,
    fontSize: 25,
    paddingRight: 20,
  },
  course_box: {
    paddingVertical: 10,
  },
  course_title_wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 20,
  },
  course_title_border: {
    borderBottomWidth: 3,
    borderBottomColor: Global.Colors.sjred,
  },
  course_title_content: {
    fontFamily: "Godo",
    fontSize: 25,
  },
  course_title_rest: {
    flex: 1,
    borderBottomWidth: 3,
    borderBottomColor: Global.Colors.gray,
  },
  course_scroll_box: {
    paddingLeft: 20,
    paddingRight: screenWidth - 390,
    paddingBottom: 20,
  },
  shortcut_scroll_box: {
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  shortcut_scroll_content: { flexDirection: "row" },
  shortcut_scroll_imgbg_view: {
    height: 60,
    flex: 1,
    margin: 5,
    borderRadius: 5,
  },
  shortcut_scroll_imgbg_img: { borderRadius: 5 },
  shortcut_scroll_touch_box: { borderRadius: 5, flex: 1 },
  shortcut_scroll_touch_title: {
    fontFamily: "Godo",
    fontSize: 17,
    color: "white",
  },
  shortcut_scroll_touch_subtitle: {
    fontFamily: "Godo",
    fontSize: 12,
    color: "white",
  },
});
export default Home;
