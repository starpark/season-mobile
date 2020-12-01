import * as React from "react";
import { View } from "react-native";
import { FAB } from "react-native-paper";
import CourseTab from "../../Navigation/CourseTab";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Global from "../../Styles/GlobalStyles";

const CourseMore = () => {
  const [state, setState] = React.useState({ open: false });

  const now = useSelector((state) => state.Now);
  const navigation = useNavigation();

  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const [user, setUser] = React.useState("instructor");

  return (
    <View style={{ flex: 1 }}>
      <CourseTab />
      {user === "instructor" && (
        <FAB.Group
          open={open}
          icon={open ? "plus" : "table-of-contents"}
          fabStyle={{ backgroundColor: Global.Colors.sjgray, bottom: 60 }}
          actions={[
            {
              icon: "note-plus",
              label: "공지사항 작성",
              onPress: () =>
                navigation.navigate("AddNotice", {
                  title: now.title,
                }),
            },
            {
              icon: "book-open",
              label: "시험 업로드",
              onPress: () =>
                navigation.navigate("AddExam", {
                  title: now.title,
                }),
            },
            {
              icon: "video",
              label: "강의영상 업로드",
              onPress: () =>
                navigation.navigate("AddVideo", {
                  title: now.title,
                }),
            },
            {
              icon: "pencil",
              label: "과제 업로드",
              onPress: () =>
                navigation.navigate("AddAssignment", {
                  title: now.title,
                }),
            },
            {
              icon: "file",
              label: "첨부파일 업로드",
              onPress: () =>
                navigation.navigate("AddAttachment", {
                  title: now.title,
                }),
            },
            {
              icon: "bell",
              label: null,
              onPress: () => console.log(""),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      )}
    </View>
  );
};

export default CourseMore;
