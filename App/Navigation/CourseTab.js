import * as React from "react";
import { ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

import CourseWeekly from "../Screens/Course/CourseWeekly";
import CourseMenu from "../Screens/Course/CourseMenu";

import Global from "../Styles/GlobalStyles";

const CourseTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        indicatorStyle: { backgroundColor: Global.Colors.sjred },
        labelStyle: { fontFamily: "Square" },
      }}
      initialRouteName={CourseWeekly}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="CourseWeekly"
        component={CourseWeekly}
        options={{
          title: "주간 강의",
        }}
      />
      <Tab.Screen
        name="CourseMenu"
        component={CourseMenu}
        options={{
          title: "메뉴",
        }}
      />
    </Tab.Navigator>
  );
};

export default CourseTab;
