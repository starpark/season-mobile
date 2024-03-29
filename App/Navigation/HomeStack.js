import * as React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import NoticeTab from "./NoticeTab";
import NoticeDetail from "../Screens/Notice/NoticeDetail";
import CourseDetail from "../Screens/Course/CourseDetail";
import CourseNotice from "../Screens/Course/CourseNotice";
import CourseExamList from "../Screens/Course/CourseExamList";
import CourseQnADetail from "../Screens/Course/CourseQnADetail";
import CourseQnA from "../Screens/Course/CourseQnA";
//교수자
import AddVideo from "../Screens/Course/Instructor/CourseAddVideo";
import AddAttachment from "../Screens/Course/Instructor/CourseAddAttachment";
import AddAssignment from "../Screens/Course/Instructor/CourseAddAssignment";
import AddNotice from "../Screens/Course/Instructor/CourseAddNotice";
import AddExam from "../Screens/Course/Instructor/CourseAddExam";
import CourseIScore from "../Navigation/InstructorTab";
import CourseIAttendance from "../Screens/Course/Instructor/CourseInstructorAttendance";
import CourseInstructorGradeAssignment from "../Screens/Course/Instructor/CourseInstructorGradeAssignment";
import CourseInstructorGradeExam from "../Screens/Course/Instructor/CourseInstructorGradeExam";
import GradeAssignmentDetail from "../Screens/Course/Instructor/GradeAssignmentDetail";
import GradeExamDetail from "../Screens/Course/Instructor/GradeExamDetail";
//학생
import SubmitAssignment from "../Screens/Course/Student/CourseSubmitAssignment";
import CourseExam from "../Screens/Course/Student/CourseExam";
import CourseSScore from "../Screens/Course/Student/CourseStudentScore";
import CourseSAttendance from "../Screens/Course/Student/CourseStudentAttendance";

import { IconButton } from "react-native-paper";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="메인"
      screenOptions={{
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="Main"
        component={HomeScreen}
        options={{
          title: "메인",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notice"
        component={NoticeTab}
        options={{
          title: "공지사항",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,

            elevation: 0,
          },
          headerTitleStyle: { fontFamily: "Square" },
        }}
      />
      <Stack.Screen
        name="NoticeDetail"
        component={NoticeDetail}
        options={{
          title: "",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,

            elevation: 0,
          },
          gestureDirection: "horizontal",
          gestureEnabled: true,
          headerTitleStyle: { fontFamily: "Square" },
          headerRight: () => (
            <IconButton
              icon="dots-vertical"
              size={24}
              onPress={() => console.log("Pressed")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={({ route }) => ({
          title: route.params.title,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,

            elevation: 0,
          },
          headerTitleStyle: { fontFamily: "Square" },
        })}
      />
      <Stack.Screen
        name="CourseNotice"
        component={CourseNotice}
        options={({ route }) => ({
          title: `${route.params.title} > 공지사항`,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,

          headerTitleStyle: { fontFamily: "Square", fontSize: 16 },
        })}
      />
      <Stack.Screen
        name="CourseExamList"
        component={CourseExamList}
        options={({ route }) => ({
          title: `${route.params.title} > 시험`,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTitleStyle: { fontFamily: "Square", fontSize: 16 },
        })}
      />
      <Stack.Screen
        name="CourseQnA"
        component={CourseQnA}
        options={({ route }) => ({
          title: `${route.params.title} > 질의응답`,
          headerTitleStyle: { fontFamily: "Square", fontSize: 16 },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="CourseQnADetail"
        component={CourseQnADetail}
        options={{
          title: "",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,

            elevation: 0,
          },
          gestureDirection: "horizontal",
          gestureEnabled: true,
          headerTitleStyle: { fontFamily: "Square" },
          headerRight: () => (
            <IconButton
              icon="dots-vertical"
              size={24}
              onPress={() => console.log("Pressed")}
            />
          ),
        }}
      />

      {/* 교수자 */}
      <Stack.Screen
        name="AddAttachment"
        component={AddAttachment}
        options={({ route }) => ({
          title: `${route.params.title} > 첨부파일 업로드`,
          headerTitleStyle: { fontFamily: "Square", fontSize: 16 },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="AddAssignment"
        component={AddAssignment}
        options={({ route }) => ({
          title: `${route.params.title} > 과제 업로드`,
          headerTitleStyle: { fontFamily: "Square", fontSize: 16 },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="AddVideo"
        component={AddVideo}
        options={({ route }) => ({
          title: `${route.params.title} > 강의영상 업로드`,
          headerTitleStyle: { fontFamily: "Square", fontSize: 16 },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="AddNotice"
        component={AddNotice}
        options={({ route }) => ({
          title: `${route.params.title} > 공지사항 작성`,
          headerTitleStyle: { fontFamily: "Square", fontSize: 16 },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="AddExam"
        component={AddExam}
        options={({ route }) => ({
          title: `${route.params.title} > 시험 업로드`,
          headerTitleStyle: { fontFamily: "Square", fontSize: 16 },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="CourseIScore"
        component={CourseIScore}
        options={({ route }) => ({
          title: `${route.params.title} > 과제/시험 채점`,
          headerTitleStyle: { fontFamily: "Square", fontSize: 16 },
          headerStyle: {
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,

            elevation: 0,
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="CourseIAttendance"
        component={CourseIAttendance}
        options={({ route }) => ({
          title: `${route.params.title} > 학생 출석/점수`,
          headerTitleStyle: {
            fontFamily: "Square",
            fontSize: 16,
          },
          headerStyle: {
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,

            elevation: 0,
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="CourseInstructorGradeExam"
        component={CourseInstructorGradeExam}
        options={({ route }) => ({
          title: `${route.params.title} 채점`,
          headerTitleStyle: {
            fontFamily: "Square",
          },
          headerStyle: {
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,

            elevation: 0,
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="CourseInstructorGradeAssignment"
        component={CourseInstructorGradeAssignment}
        options={({ route }) => ({
          title: `${route.params.title} 채점`,
          headerTitleStyle: {
            fontFamily: "Square",
          },
          headerStyle: {
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,

            elevation: 0,
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="GradeAssignmentDetail"
        component={GradeAssignmentDetail}
        options={({ route }) => ({
          title: `과제 채점`,
          headerTitleStyle: {
            fontFamily: "Square",
          },
          headerStyle: {
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,

            elevation: 0,
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="GradeExamDetail"
        component={GradeExamDetail}
        options={({ route }) => ({
          title: `시험 채점`,
          headerTitleStyle: {
            fontFamily: "Square",
          },
          headerStyle: {
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,

            elevation: 0,
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      {/* 학생 */}
      <Stack.Screen
        name="SubmitAssignment"
        component={SubmitAssignment}
        options={({ route }) => ({
          title: route.params.item.title,
          headerTitleStyle: { fontFamily: "Square", fontSize: 16 },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="CourseExam"
        component={CourseExam}
        options={({ route }) => ({
          title: route.params.title,
          headerTitleStyle: { fontFamily: "Square", fontSize: 16 },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="CourseSScore"
        component={CourseSScore}
        options={({ route }) => ({
          title: `${route.params.title} > 나의 점수`,
          headerTitleStyle: { fontFamily: "Square", fontSize: 16 },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="CourseSAttendance"
        component={CourseSAttendance}
        options={({ route }) => ({
          title: `${route.params.title} > 온라인 출석부`,
          headerTitleStyle: {
            fontFamily: "Square",
            fontSize: 16,
          },
          headerStyle: {
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,

            elevation: 0,
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
