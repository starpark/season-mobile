import * as React from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import Global from "../../../Styles/GlobalStyles";

const { width: screenWidth } = Dimensions.get("window");

const CourseAddAttachment = () => {
  const route = useRoute();
  console.log(route);

  return (
    <ScrollView>
      <View></View>
    </ScrollView>
  );
};

export default CourseAddAttachment;
