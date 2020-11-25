import * as React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CourseTab from "../Navigation/CourseTab";
import Global from "../Styles/GlobalStyles";

const { width: screenWidth } = Dimensions.get("window");

const CourseMore = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <CourseTab />
    </View>
  );
};

export default CourseMore;
