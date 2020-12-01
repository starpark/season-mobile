import * as React from "react";
import { SafeAreaView, View, Text, Button, ScrollView } from "react-native";
import { List, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Global from "../../../Styles/GlobalStyles";

const CourseInstructorGradeExam = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{ paddingBottom: 60 }}>
      <List.Item
        title="시험1"
        description="시험입니다."
        left={(props) => (
          <List.Icon
            {...props}
            icon="pencil-box-outline"
            color={Global.Colors.sjgray}
          />
        )}
        right={(props) => (
          <IconButton icon="dots-horizontal" size={28} onPress={() => {}} />
        )}
        onPress={() =>
          navigation.navigate("CourseInstructorGradeExam", {
            title: "시험1",
          })
        }
      />
    </ScrollView>
  );
};

export default CourseInstructorGradeExam;
