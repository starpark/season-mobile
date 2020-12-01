import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

import CourseInstructorScore from "../Screens/Course/Instructor/CourseInstructorScore";
import CourseInstructorListExam from "../Screens/Course/Instructor/CourseInstructorListExam";
import CourseInstructorListAssignment from "../Screens/Course/Instructor/CourseInstructorListAssignment";

import Global from "../Styles/GlobalStyles";

const InstructorTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        indicatorStyle: { backgroundColor: Global.Colors.sjred },
        labelStyle: { fontFamily: "Square" },
      }}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="CourseInstructorScore"
        component={CourseInstructorScore}
        options={{
          title: "학생 점수",
        }}
      />
      <Tab.Screen
        name="CourseInstructorListExam"
        component={CourseInstructorListExam}
        options={{
          title: "시험 채점",
        }}
      />
      <Tab.Screen
        name="CourseInstructorListAssignment"
        component={CourseInstructorListAssignment}
        options={{
          title: "과제 채점",
        }}
      />
    </Tab.Navigator>
  );
};

export default InstructorTab;
