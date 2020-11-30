import * as React from "react";
import { ScrollView, View, Text, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { List } from "react-native-paper";

const CourseMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const now = useSelector((state) => state.Now);
  const user = "instructor";

  return (
    <ScrollView>
      <List.Section style={{ paddingBottom: 120 }}>
        <List.Subheader
          style={{
            fontFamily: "Square",
          }}
        >
          정보
        </List.Subheader>
        <List.Item
          title="공지사항"
          titleStyle={{ fontFamily: "Square" }}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {
            navigation.navigate("CourseNotice", { title: now.title });
          }}
        />
        <List.Item
          title="수업계획서"
          titleStyle={{ fontFamily: "Square" }}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {}}
        />
        <List.Subheader
          style={{
            fontFamily: "Square",
          }}
        >
          강의
        </List.Subheader>
        <List.Item
          title="시험"
          titleStyle={{ fontFamily: "Square" }}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {
            navigation.navigate("CourseExamList", { title: now.title });
          }}
        />
        <List.Subheader
          style={{
            fontFamily: "Square",
          }}
        >
          소통
        </List.Subheader>
        <List.Item
          title="질의응답"
          titleStyle={{ fontFamily: "Square" }}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {
            navigation.navigate("CourseQnA", { title: now.title });
          }}
        />
        <List.Item
          title="팀프로젝트"
          titleStyle={{ fontFamily: "Square" }}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {
            console.log("메뉴");
          }}
        />
        <List.Item
          title="메신저"
          titleStyle={{ fontFamily: "Square" }}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {
            console.log("메뉴");
          }}
        />
        <List.Subheader
          style={{
            fontFamily: "Square",
          }}
        >
          성적
        </List.Subheader>
        <List.Item
          title="현재점수"
          titleStyle={{ fontFamily: "Square" }}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {
            if (user === "instructor") {
              navigation.navigate("CourseIScore", { title: now.title });
            } else {
              navigation.navigate("CourseSScore", { title: now.title });
            }
          }}
        />
        <List.Item
          title="온라인 출석부"
          titleStyle={{ fontFamily: "Square" }}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {
            if (user === "instructor") {
              navigation.navigate("CourseIAttendance", { title: now.title });
            } else {
              navigation.navigate("CourseSAttendance", { title: now.title });
            }
          }}
        />
      </List.Section>
    </ScrollView>
  );
};

export default CourseMenu;
