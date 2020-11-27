import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

import CourseNotice from "../Screens/Notice/CourseNotice";
import SeasonNotice from "../Screens/Notice/SeasonNotice";

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
        name="CourseNotice"
        component={CourseNotice}
        options={{
          title: "코스 공지",
        }}
      />
      <Tab.Screen
        name="SeasonNotice"
        component={SeasonNotice}
        options={{
          title: "전체 공지",
        }}
      />
    </Tab.Navigator>
  );
};

export default NoticeTab;
