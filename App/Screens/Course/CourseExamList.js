import * as React from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { List, IconButton } from "react-native-paper";

import Global from "../../Styles/GlobalStyles";
const { width: screenWidth } = Dimensions.get("window");

const CourseExamList = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
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
        onPress={() => navigation.navigate("CourseExam")}
      />
    </ScrollView>
  );
};

export default CourseExamList;
