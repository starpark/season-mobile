import * as React from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { List, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Global from "../../../Styles/GlobalStyles";

const CourseInstructorGradeAssignment = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{ paddingBottom: 60 }}>
      <List.Item
        title="과제1"
        description="과제입니다."
        left={(props) => (
          <List.Icon {...props} icon="pencil" color={Global.Colors.sjgray} />
        )}
        right={(props) => (
          <IconButton icon="dots-horizontal" size={28} onPress={() => {}} />
        )}
        onPress={() =>
          navigation.navigate("CourseInstructorGradeAssignment", {
            title: "과제1",
          })
        }
      />
    </ScrollView>
  );
};

export default CourseInstructorGradeAssignment;
