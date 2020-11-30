import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

import CourseAllNotice from "../Screens/Notice/CourseAllNotice";
import AllNotice from "../Screens/Notice/AllNotice";

import Global from "../Styles/GlobalStyles";

const NoticeTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        indicatorStyle: { backgroundColor: Global.Colors.sjred },
        labelStyle: { fontFamily: "Square" },
      }}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="CourseAllNotice"
        component={CourseAllNotice}
        options={{
          title: "코스 공지",
        }}
      />
      <Tab.Screen
        name="AllNotice"
        component={AllNotice}
        options={{
          title: "전체 공지",
        }}
      />
    </Tab.Navigator>
  );
};

export default NoticeTab;
