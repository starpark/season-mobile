import * as React from "react";
import { View } from "react-native";
import { FAB } from "react-native-paper";
import CourseTab from "../../Navigation/CourseTab";
import { useRoute, useNavigation } from "@react-navigation/native";
import Global from "../../Styles/GlobalStyles";

const CourseMore = () => {
  const [state, setState] = React.useState({ open: false });

  const route = useRoute();
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
              onPress: () => console.log("1"),
            },
            {
              icon: "book-open",
              label: "시험 업로드",
              onPress: () => console.log("2"),
            },
            {
              icon: "video",
              label: "강의영상 업로드",
              onPress: () =>
                navigation.navigate("AddVideo", {
                  title: `${route.params.title} > 강의영상 업로드`,
                }),
            },
            {
              icon: "pencil",
              label: "과제 업로드",
              onPress: () =>
                navigation.navigate("AddAssignment", {
                  title: `${route.params.title} > 과제 업로드`,
                }),
            },
            {
              icon: "file",
              label: "첨부파일 업로드",
              onPress: () =>
                navigation.navigate("AddAttachment", {
                  title: `${route.params.title} > 첨부파일 업로드`,
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
