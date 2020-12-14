import * as React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import {
  List,
  DefaultTheme,
  IconButton,
  Portal,
  Dialog,
  Menu,
  TouchableRipple,
} from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import { useRoute, useNavigation } from "@react-navigation/native";
import Global from "../../Styles/GlobalStyles";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Global.Colors.sjgray,
  },
  fonts: {
    regular: "Square",
  },
};

const CourseWeekly = () => {
  const [user, setUser] = React.useState("instructor");
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = React.useState("");
  const [item, setItem] = React.useState([]);
  const navigation = useNavigation();

  const showModal = ({ type, item }) => {
    setType(type);
    setItem(item);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const byteToSize = (bytes) => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  };

  React.useEffect(() => {}, []);

  const yyyymmddhhmmss = (date) => {
    const timeValue = new Date(date);

    let year = timeValue.getFullYear(); //yyyy
    let month = 1 + timeValue.getMonth(); //mm
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    let day = timeValue.getDate(); //dd
    day = day >= 10 ? day : "0" + day;
    let hour = timeValue.getHours(); //hh
    hour = hour >= 10 ? hour : "0" + hour;
    let minutes = timeValue.getMinutes(); //mm
    minutes = minutes >= 10 ? minutes : "0" + minutes;

    return `${year}/${month}/${day} ${hour}시 ${minutes}분`;
  };

  const openWebBrowser = async (url) => {
    const result = await WebBrowser.openBrowserAsync(url);
    console.log(result);
  };

  const ItemDialog = ({ item, type, visible }) => (
    <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.Title style={{ fontFamily: "Square" }}>
        {type === "lectures" && "강의 정보"}
        {type === "assignments" && "과제 정보"}
        {type === "attachments" && "첨부자료 정보"}
      </Dialog.Title>

      <Dialog.Content>
        <Text style={{ fontFamily: "Square", fontSize: 18 }}>{item.title}</Text>
        {item.createdAt && (
          <Text style={{ color: "gray" }}>
            {yyyymmddhhmmss(item.createdAt)}
          </Text>
        )}
        {item.attachment && (
          <Text style={{ color: "gray" }}>
            파일 용량: {byteToSize(item.attachment.size)}
          </Text>
        )}
        <Text>{item.description}</Text>

        {type === "lectures" && (
          <View>
            <TouchableRipple
              style={{ height: 40, justifyContent: "center", paddingLeft: 10 }}
              onPress={() => {
                navigation.navigate("Video", { item });
                hideDialog();
              }}
            >
              <Text>보기</Text>
            </TouchableRipple>
          </View>
        )}
        {type === "assignments" && (
          <View>
            <TouchableRipple
              style={{ height: 40, justifyContent: "center", paddingLeft: 10 }}
              onPress={() => {
                navigation.navigate("SubmitAssignment", { item });
                hideDialog();
              }}
            >
              <Text>제출하기</Text>
            </TouchableRipple>
          </View>
        )}
        {type === "attachments" && (
          <View>
            <TouchableRipple
              style={{ height: 40, justifyContent: "center", paddingLeft: 10 }}
              onPress={() => {
                openWebBrowser(item.attachment.url);
                hideDialog();
              }}
            >
              <Text>보기</Text>
            </TouchableRipple>
          </View>
        )}
        {user === "instructor" && (
          <View>
            <TouchableRipple
              style={{ height: 40, justifyContent: "center", paddingLeft: 10 }}
              onPress={() => console.log(1)}
            >
              <Text>삭제</Text>
            </TouchableRipple>
          </View>
        )}
      </Dialog.Content>
    </Dialog>
  );

  const renderContents = ({ item }, { type }) => {
    return (
      <List.Item
        title={item.title}
        onPress={() => {
          if (type === "attachments") {
            openWebBrowser(item.attachment.url);
          } else if (type === "assignments") {
            navigation.navigate("SubmitAssignment", { item });
          } else {
            navigation.navigate("Video", { item });
          }
        }}
        description={item.description}
        onLongPress={() => showModal({ type, item })}
        right={(props) => (
          <IconButton
            icon="dots-horizontal"
            size={28}
            onPress={() => showModal({ type, item })}
          />
        )}
        left={(props) => (
          <View>
            {type === "lectures" && (
              <List.Icon {...props} icon="check" color="green" />
            )}
            {type === "assignments" && (
              <List.Icon {...props} icon="close" color="red" />
            )}
            {type === "attachments" && (
              <List.Icon {...props} icon="file-download-outline" />
            )}
          </View>
        )}
      />
    );
  };

  const renderWeekly = ({ item }) => {
    return (
      <List.Accordion
        title={`${item.week}주차`}
        id={`${item.week}week`}
        left={(props) => <List.Icon {...props} icon="view-week" />}
        titleStyle={{ fontFamily: "Square", fontWeight: "bold", fontSize: 20 }}
        style={styles.week_accrodion}
        theme={theme}
      >
        <List.AccordionGroup>
          <View style={styles.week_accrodion}>
            <View style={styles.week_contents}>
              <List.Accordion
                title="강의영상"
                id={`${item.week}lecture`}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="video"
                    style={{ paddingLeft: 10 }}
                  />
                )}
                titleStyle={{ fontFamily: "Square" }}
                theme={theme}
              >
                <FlatList
                  data={item.lectures}
                  renderItem={(item) =>
                    renderContents(item, { type: "lectures" })
                  }
                  keyExtractor={(item) => item._id}
                />
              </List.Accordion>
            </View>
            <View style={styles.week_contents}>
              <List.Accordion
                title="과제"
                id={`${item.week}assignments`}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="pencil"
                    style={{ paddingLeft: 10 }}
                  />
                )}
                titleStyle={{ fontFamily: "Square" }}
                theme={theme}
              >
                <FlatList
                  data={item.assignments}
                  renderItem={(item) =>
                    renderContents(item, { type: "assignments" })
                  }
                  keyExtractor={(item) => item._id}
                />
              </List.Accordion>
            </View>
            <View style={styles.week_contents}>
              <List.Accordion
                title="강의자료"
                id={`${item.week}attachments`}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="file"
                    style={{ paddingLeft: 10 }}
                  />
                )}
                titleStyle={{ fontFamily: "Square" }}
                theme={theme}
              >
                <FlatList
                  data={item.attachments}
                  renderItem={(item) =>
                    renderContents(item, { type: "attachments" })
                  }
                  keyExtractor={(item) => item._id}
                />
              </List.Accordion>
            </View>
          </View>
        </List.AccordionGroup>
      </List.Accordion>
    );
  };

  return (
    <View>
      <List.AccordionGroup>
        <FlatList
          data={response}
          renderItem={renderWeekly}
          keyExtractor={(item) => item.week.toString()}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
      </List.AccordionGroup>
      <Portal>
        <ItemDialog item={item} type={type} visible={visible} />
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  week_accrodion: {
    borderBottomWidth: 1,
    borderBottomColor: Global.Colors.gray2,
  },
  week_contents: {
    borderBottomWidth: 1,
    borderBottomColor: Global.Colors.gray,
  },
  week_items: {
    borderBottomWidth: 1,
    borderBottomColor: Global.Colors.gray,
  },
  modal_container: {
    padding: 20,
  },
  plus_instructor: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 0,
  },
  modal_header: {
    borderBottomWidth: 1,
    borderBottomColor: Global.Colors.gray2,
    paddingBottom: 5,
    marginBottom: 5,
  },
});

const response = [
  {
    week: 1,
    lectures: [
      {
        attachments: [],
        _id: "5fc6d9d22fb7d97fee7f3e07",
        class: "5fc6aa7d11dbf95b4c634205",
        number: 1,
        title: "1-1 번째 강의 입니다.",
        description: "강의 코멘트 입니다.",
        week: 1,
        comments: [],
        video: {
          _id: "5fc6d9d22fb7d97fee7f3e08",
          key:
            "/uploads/courses/123456/class/3/week1/lecture1/1606867410215-KakaoTalk_20201202_085849843.mp4",
          url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          size: 385932,
        },
        createdAt: "2020-12-02T00:03:30.490Z",
        updatedAt: "2020-12-02T00:03:30.490Z",
        __v: 0,
      },
      {
        attachments: [],
        _id: "5fc6d9d62fb7d97fee7f3e09",
        class: "5fc6aa7d11dbf95b4c634205",
        number: 2,
        title: "1-2 번째 강의 입니다.",
        week: 1,
        comments: [],
        video: {
          _id: "5fc6d9d72fb7d97fee7f3e0a",
          key:
            "/uploads/courses/123456/class/3/week1/lecture2/1606867414971-KakaoTalk_20201202_085849843.mp4",
          url:
            "https://season-api-server-repository.s3.ap-northeast-2.amazonaws.com//uploads/courses/123456/class/3/week1/lecture2/1606867414971-KakaoTalk_20201202_085849843.mp4",
          size: 385932,
        },
        createdAt: "2020-12-02T00:03:35.167Z",
        updatedAt: "2020-12-02T00:03:35.167Z",
        __v: 0,
      },
      {
        attachments: [],
        _id: "5fc6d9dd2fb7d97fee7f3e0b",
        class: "5fc6aa7d11dbf95b4c634205",
        number: 3,
        title: "1-3 번째 강의 입니다.",
        week: 1,
        comments: [],
        video: {
          _id: "5fc6d9dd2fb7d97fee7f3e0c",
          key:
            "/uploads/courses/123456/class/3/week1/lecture3/1606867421165-KakaoTalk_20201202_085849843.mp4",
          url:
            "https://season-api-server-repository.s3.ap-northeast-2.amazonaws.com//uploads/courses/123456/class/3/week1/lecture3/1606867421165-KakaoTalk_20201202_085849843.mp4",
          size: 385932,
        },
        createdAt: "2020-12-02T00:03:41.402Z",
        updatedAt: "2020-12-02T00:03:41.402Z",
        __v: 0,
      },
    ],
    assignments: [
      {
        attachments: [],
        _id: "5fc6d9dd2fb7d97fee7f3e0b",
        class: "5fc6aa7d11dbf95b4c634205",
        number: 3,
        title: "1주차 과제입니다.",
        week: 1,
        comments: [],
        video: {
          _id: "5fc6d9dd2fb7d97fee7f3e0c",
          key:
            "/uploads/courses/123456/class/3/week1/lecture3/1606867421165-KakaoTalk_20201202_085849843.mp4",
          url:
            "https://season-api-server-repository.s3.ap-northeast-2.amazonaws.com//uploads/courses/123456/class/3/week1/lecture3/1606867421165-KakaoTalk_20201202_085849843.mp4",
          size: 385932,
        },
        createdAt: "2020-12-02T00:03:41.402Z",
        updatedAt: "2020-12-02T00:03:41.402Z",
        __v: 0,
      },
    ],
    attachments: [],
  },
  {
    week: 2,
    lectures: [
      {
        attachments: [],
        _id: "5fc6d9e22fb7d97fee7f3e0d",
        class: "5fc6aa7d11dbf95b4c634205",
        number: 1,
        title: "2-1 번째강의 입니다.",
        week: 2,
        comments: [],
        video: {
          _id: "5fc6d9e22fb7d97fee7f3e0e",
          key:
            "/uploads/courses/123456/class/3/week2/lecture1/1606867426355-KakaoTalk_20201202_085849843.mp4",
          url:
            "https://season-api-server-repository.s3.ap-northeast-2.amazonaws.com//uploads/courses/123456/class/3/week2/lecture1/1606867426355-KakaoTalk_20201202_085849843.mp4",
          size: 385932,
        },
        createdAt: "2020-12-02T00:03:46.607Z",
        updatedAt: "2020-12-02T00:03:46.607Z",
        __v: 0,
      },
      {
        attachments: [],
        _id: "5fc6d9e72fb7d97fee7f3e0f",
        class: "5fc6aa7d11dbf95b4c634205",
        number: 2,
        title: "2-2 번째 강의 입니다.",
        week: 2,
        comments: [],
        video: {
          _id: "5fc6d9e72fb7d97fee7f3e10",
          key:
            "/uploads/courses/123456/class/3/week2/lecture2/1606867431042-KakaoTalk_20201202_085849843.mp4",
          url:
            "https://season-api-server-repository.s3.ap-northeast-2.amazonaws.com//uploads/courses/123456/class/3/week2/lecture2/1606867431042-KakaoTalk_20201202_085849843.mp4",
          size: 385932,
        },
        createdAt: "2020-12-02T00:03:51.249Z",
        updatedAt: "2020-12-02T00:03:51.249Z",
        __v: 0,
      },
      {
        attachments: [],
        _id: "5fc6d9eb2fb7d97fee7f3e11",
        class: "5fc6aa7d11dbf95b4c634205",
        number: 3,
        title: "2-3 번째 강의 입니다.",
        week: 2,
        comments: [],
        video: {
          _id: "5fc6d9eb2fb7d97fee7f3e12",
          key:
            "/uploads/courses/123456/class/3/week2/lecture3/1606867435525-KakaoTalk_20201202_085849843.mp4",
          url:
            "https://season-api-server-repository.s3.ap-northeast-2.amazonaws.com//uploads/courses/123456/class/3/week2/lecture3/1606867435525-KakaoTalk_20201202_085849843.mp4",
          size: 385932,
        },
        createdAt: "2020-12-02T00:03:55.768Z",
        updatedAt: "2020-12-02T00:03:55.768Z",
        __v: 0,
      },
    ],
    assignments: [],
    attachments: [
      {
        _id: "5fc6da1b2fb7d97fee7f3e15",
        class: "5fc6aa7d11dbf95b4c634205",
        number: 1,
        week: 2,
        title: "강의자료",
        description: "강의자료입니다.",
        comments: [],
        attachment: {
          _id: "5fc6da1c2fb7d97fee7f3e16",
          key:
            "/uploads/courses/123456/class/3/week2/attachments/1606867483888-2004-ubuntu.png",
          url:
            "http://kocw-n.xcache.kinxcdn.com/data/document/2017/duksung/choiseunghoon121/11.pdf",
          size: 145862,
        },
        __v: 0,
      },
    ],
  },
  {
    week: 3,
    lectures: [],
    assignments: [],
    attachments: [],
  },
  {
    week: 4,
    lectures: [
      {
        attachments: [],
        _id: "5fc6d9c32fb7d97fee7f3e03",
        class: "5fc6aa7d11dbf95b4c634205",
        number: 1,
        title: "4-2 번째 강의 올시다~~ ^^",
        week: 4,
        comments: [],
        video: {
          _id: "5fc6d9c32fb7d97fee7f3e04",
          key:
            "/uploads/courses/123456/class/3/week4/lecture1/1606867395522-KakaoTalk_20201202_085849843.mp4",
          url:
            "https://season-api-server-repository.s3.ap-northeast-2.amazonaws.com//uploads/courses/123456/class/3/week4/lecture1/1606867395522-KakaoTalk_20201202_085849843.mp4",
          size: 385932,
        },
        createdAt: "2020-12-02T00:03:15.857Z",
        updatedAt: "2020-12-02T00:03:15.857Z",
        __v: 0,
      },
      {
        attachments: [],
        _id: "5fc6d9c92fb7d97fee7f3e05",
        class: "5fc6aa7d11dbf95b4c634205",
        number: 2,
        title: "4-1 번째 강의 올시다~~ ^^",
        week: 4,
        comments: [],
        video: {
          _id: "5fc6d9ca2fb7d97fee7f3e06",
          key:
            "/uploads/courses/123456/class/3/week4/lecture2/1606867401964-KakaoTalk_20201202_085849843.mp4",
          url:
            "https://season-api-server-repository.s3.ap-northeast-2.amazonaws.com//uploads/courses/123456/class/3/week4/lecture2/1606867401964-KakaoTalk_20201202_085849843.mp4",
          size: 385932,
        },
        createdAt: "2020-12-02T00:03:22.219Z",
        updatedAt: "2020-12-02T00:03:22.219Z",
        __v: 0,
      },
    ],
    assignments: [],
    attachments: [
      {
        _id: "5fc6da262fb7d97fee7f3e17",
        class: "5fc6aa7d11dbf95b4c634205",
        number: 1,
        week: 4,
        title: "두 번째 과제",
        description: "개강 후 첫 번째 과제입니다. ",
        comments: [],
        attachment: {
          _id: "5fc6da272fb7d97fee7f3e18",
          key:
            "/uploads/courses/123456/class/3/week4/attachments/1606867494822-2004-ubuntu.png",
          url:
            "https://blackboard.sejong.ac.kr/bbcswebdav/pid-2456814-dt-content-rid-7645394_1/xid-7645394_1",
          size: 145862,
        },
        __v: 0,
      },
    ],
  },
  {
    week: 5,
    lectures: [],
    assignments: [],
    attachments: [],
  },
  {
    week: 6,
    lectures: [],
    assignments: [],
    attachments: [],
  },
  {
    week: 7,
    lectures: [],
    assignments: [],
    attachments: [],
  },
  {
    week: 8,
    lectures: [],
    assignments: [],
    attachments: [],
  },
  {
    week: 9,
    lectures: [],
    assignments: [],
    attachments: [],
  },
  {
    week: 10,
    lectures: [],
    assignments: [],
    attachments: [],
  },
  {
    week: 11,
    lectures: [],
    assignments: [],
    attachments: [],
  },
  {
    week: 12,
    lectures: [],
    assignments: [],
    attachments: [],
  },
  {
    week: 13,
    lectures: [],
    assignments: [],
    attachments: [],
  },
  {
    week: 14,
    lectures: [],
    assignments: [],
    attachments: [],
  },
  {
    week: 15,
    lectures: [],
    assignments: [],
    attachments: [],
  },
  {
    week: 16,
    lectures: [],
    assignments: [],
    attachments: [],
  },
];

export default CourseWeekly;
