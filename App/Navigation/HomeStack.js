import * as React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import NoticeTab from "./NoticeTab";
import NoticeMore from "../Screens/Notice/NoticeMore";
import CourseMore from "../Screens/Course/CourseMore";
import PDFView from "../Components/PDFReader";
import AddVideo from "../Screens/Course/Instructor/CourseAddVideo";
import AddAttachment from "../Screens/Course/Instructor/CourseAddAttachment";
import AddAssignment from "../Screens/Course/Instructor/CourseAddAssignment";
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
        name="NoticeMore"
        component={NoticeMore}
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
        name="CourseMore"
        component={CourseMore}
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
        name="PDF"
        component={PDFView}
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
        name="AddAttachment"
        component={AddAttachment}
        options={({ route }) => ({
          title: route.params.title,
          headerTitleStyle: { fontFamily: "Square", fontSize: 16 },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="AddAssignment"
        component={AddAssignment}
        options={({ route }) => ({
          title: route.params.title,
          headerTitleStyle: { fontFamily: "Square", fontSize: 16 },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name="AddVideo"
        component={AddVideo}
        options={({ route }) => ({
          title: route.params.title,
          headerTitleStyle: { fontFamily: "Square", fontSize: 16 },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
