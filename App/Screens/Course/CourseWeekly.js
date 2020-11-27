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
import { useRoute, useNavigation } from "@react-navigation/native";
import Global from "../../Styles/GlobalStyles";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

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
  const lectures = [];
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = React.useState("");
  const [item, setItem] = React.useState([]);
  const [state, setState] = React.useState({ open: false });

  const route = useRoute();
  const navigation = useNavigation();

  const showModal = ({ type, item }) => {
    setType(type);
    setItem(item);
    setVisible(true);
  };
  const hideDialog = () => setVisible(false);

  React.useEffect(() => {
    response.map((item) => {
      lectures.push({ lectures: item.lectures, week: item.week });
    });
  }, []);

  // const attachmentsDir = FileSystem.cacheDirectory + `${route.params.title}/`;

  // const callback = (downloadProgress) => {
  //   const progress =
  //     downloadProgress.totalBytesWritten /
  //     downloadProgress.totalBytesExpectedToWrite;
  //   console.log(progress);
  // };

  // const ensureDirExists = async () => {
  //   const dirInfo = await FileSystem.getInfoAsync(attachmentsDir);
  //   if (!dirInfo.exists) {
  //     await FileSystem.makeDirectoryAsync(attachmentsDir, {
  //       intermediates: true,
  //     });
  //   }
  // };

  // const downloadFile = async (item) => {
  //   const { uri: link, uuid } = item;

  //   const splitUri = link.split("/");
  //   const fileName = splitUri[splitUri.length - 1];

  //   const fileUri =
  //     attachmentsDir + `${route.params.title}_${uuid}_${fileName}`;

  //   const downloadResumable = FileSystem.createDownloadResumable(
  //     link,
  //     fileUri,
  //     {},
  //     callback
  //   );
  //   try {
  //     const result = await downloadResumable.downloadAsync();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const ensureFileExists = async (item) => {
  //   await ensureDirExists();

  //   const { uri: link, uuid } = item;

  //   const splitUri = link.split("/");
  //   const fileName = splitUri[splitUri.length - 1];

  //   const fileUri =
  //     attachmentsDir + `${route.params.title}_${uuid}_${fileName}`;
  //   const fileInfo = await FileSystem.getInfoAsync(fileUri);

  //   if (!fileInfo.exists) {
  //     await downloadFile(item);
  //   }

  //   return fileUri;
  // };

  // const deleteFile = async (item) => {
  //   const { uri: link, title, uuid } = item;

  //   const splitUri = link.split("/");
  //   const fileName = splitUri[splitUri.length - 1];

  //   const fileUri = attachmentsDir + `${title}_${uuid}_${fileName}`;

  //   await FileSystem.deleteAsync(fileUri);
  // };

  // const getContentUri = async (item) => {
  //   const uri = await FileSystem.getContentUriAsync(
  //     await ensureFileExists(item)
  //   );
  //   console.log(FileSystem.cacheDirectory);

  //   DocumentPicker.getDocumentAsync({
  //     type: "*/*",
  //     copyToCacheDirectory: true,
  //   });

  //   console.log(uri);
  //   return uri;
  // };

  const ItemDialog = ({ item, type, visible }) => (
    <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.Title style={{ fontFamily: "Square" }}>
        {type === "lectures" && "강의 정보"}
        {type === "assignments" && "과제 정보"}
        {type === "attachments" && "첨부자료 정보"}
      </Dialog.Title>

      <Dialog.Content>
        <Text style={{ fontFamily: "Square", fontSize: 20, paddingBottom: 10 }}>
          {item.title}
        </Text>

        {type === "lectures" && (
          <View>
            <TouchableRipple
              style={{ height: 40, justifyContent: "center", paddingLeft: 10 }}
              onPress={() => console.log(1)}
            >
              <Text>보기</Text>
            </TouchableRipple>
          </View>
        )}
        {type === "assignments" && (
          <View>
            <TouchableRipple
              style={{ height: 40, justifyContent: "center", paddingLeft: 10 }}
              onPress={() => console.log(1)}
            >
              <Text>제출하기</Text>
            </TouchableRipple>
          </View>
        )}
        {type === "attachments" && (
          <View>
            <TouchableRipple
              style={{ height: 40, justifyContent: "center", paddingLeft: 10 }}
              onPress={() => console.log(1)}
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
              <Text>수정</Text>
            </TouchableRipple>
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
            navigation.navigate("PDF", { title: item.title, uri: item.uri });
          } else if (type === "assignments") {
            console.log("과제");
          } else {
            navigation.navigate("Video", { item, lectures });
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
            {type === "attachments" && <List.Icon {...props} icon="download" />}
          </View>
        )}
      />
    );
  };

  const renderWeekly = ({ item }) => {
    return (
      <List.Accordion
        title={item.week}
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
                  keyExtractor={(item) => item.uuid}
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
                  keyExtractor={(item) => item.uuid}
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
                  keyExtractor={(item) => item.uuid}
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
          keyExtractor={(item) => item.week}
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
    week: "1",
    lectures: [
      {
        uuid: "5",
        title: "string",
        description: "string",
        videoUri:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        comments: [
          {
            user: {
              uuid: "string",
              name: "string",
              type: ["student", "instructor"],
            },
            body: "string",
            isModified: "boolean",
            createdAt: "date",
            updatedAT: "date",
          },
        ],
      },
      {
        uuid: "6",
        title: "string",
        description: "string",
        videoUri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        comments: [
          {
            user: {
              uuid: "string",
              name: "string",
              type: ["student", "instructor"],
            },
            body: "string",
            isModified: "boolean",
            createdAt: "date",
            updatedAT: "date",
          },
        ],
      },
    ],
    assignments: [
      {
        uuid: "7",
        title: "string",
        description: "string",
        submissionRate: "number",
        calendarItem: "undefined",
        duration: {
          status: "string",
          start: "date",
          end: "date",
          period: "string",
        },
        student: {
          status: "string",
          score: "number",
          submissionUri: "string",
        },
      },
      {
        uuid: "8",
        title: "string",
        description: "string",
        submissionRate: "number",
        calendarItem: "undefined",
        duration: {
          status: "string",
          start: "date",
          end: "date",
          period: "string",
        },
        student: {
          status: "string",
          score: "number",
          submissionUri: "string",
        },
      },
    ],
    attachments: [
      {
        uuid: "9",
        title: "string",
        description: "string",
        uri:
          "http://www.eduever.com/upload/board/%C4%C4%C7%BB%C5%CD%20%C0%CF%B9%DD%20%C5%EB%C7%D5%B1%B3%BE%C8(%C3%E2%B7%C2%BF%EB).pdf",
        comments: [
          {
            user: {
              uuid: "string",
              name: "string",
              type: ["student", "instructor"],
            },
            body: "string",
            isModified: "boolean",
            createdAt: "date",
            updatedAT: "date",
          },
        ],
      },
      {
        uuid: "10",
        title: "string",
        description: "string",
        uri:
          "https://learn-ap-northeast-2-prod-fleet01-xythos.content.blackboardcdn.com/5cf774ff89eaf/3508111?X-Blackboard-Expiration=1606381200000&X-Blackboard-Signature=gLLJZwS70cGmkfjHPZ5cqBHhTpPfMR7cn3LDjXR5uk0%3D&X-Blackboard-Client-Id=513122&response-cache-control=private%2C%20max-age%3D21600&response-content-disposition=inline%3B%20filename%2A%3DUTF-8%27%27C1.pdf&response-content-type=application%2Fpdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20201126T030000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21600&X-Amz-Credential=AKIAZH6WM4PLRAIZCZRQ%2F20201126%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=605053304d8ab8ca7e94943790c0f03d126d399054f7676f1e30ee6934f27251",
        comments: [
          {
            user: {
              uuid: "string",
              name: "string",
              type: ["student", "instructor"],
            },
            body: "string",
            isModified: "boolean",
            createdAt: "date",
            updatedAT: "date",
          },
        ],
      },
    ],
  },
  {
    week: "2",
    lectures: [
      {
        uuid: "11",
        title: "string",
        description: "string",
        videoUri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        comments: [
          {
            user: {
              uuid: "string",
              name: "string",
              type: ["student", "instructor"],
            },
            body: "string",
            isModified: "boolean",
            createdAt: "date",
            updatedAT: "date",
          },
        ],
      },
    ],
    assignments: [
      {
        uuid: "12",
        title: "string",
        description: "string",
        submissionRate: "number",
        calendarItem: "undefined",
        duration: {
          status: "string",
          start: "date",
          end: "date",
          period: "string",
        },
        student: {
          status: "string",
          score: "number",
          submissionUri: "string",
        },
      },
    ],
    attachments: [
      {
        uuid: "13",
        title: "string",
        description: "string",
        uri:
          "https://learn-ap-northeast-2-prod-fleet01-xythos.content.blackboardcdn.com/5cf774ff89eaf/4467972?X-Blackboard-Expiration=1606381200000&X-Blackboard-Signature=tPeA7kgLd908jjxsZ8%2FiithBKxB97OT0O8WF2iv6rLo%3D&X-Blackboard-Client-Id=513122&response-cache-control=private%2C%20max-age%3D21600&response-content-disposition=inline%3B%20filename%2A%3DUTF-8%27%27C9.pdf&response-content-type=application%2Fpdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20201126T030000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21600&X-Amz-Credential=AKIAZH6WM4PLRAIZCZRQ%2F20201126%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=47a3bf395e1d16f6c1df0a4c95b5e5a43709f82b776088df7623df7fc20bcff7",
        comments: [
          {
            user: {
              uuid: "string",
              name: "string",
              type: ["student", "instructor"],
            },
            body: "string",
            isModified: "boolean",
            createdAt: "date",
            updatedAT: "date",
          },
        ],
      },
    ],
  },
];

export default CourseWeekly;
