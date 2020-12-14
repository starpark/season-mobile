import * as React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./BottomTab";
import VideoScreen from "../Screens/Course/VideoScreen";
import MessengerDetail from "../Screens/Messenger/MessengerDetail";

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          cardStyle: {
            backgroundColor: "white",
          },
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{ Title: "메인" }}
        />
        <Stack.Screen
          name="Video"
          component={VideoScreen}
          options={({ route }) => ({
            title: route.params.title,
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          })}
        />
        <Stack.Screen
          name="MessengerDetail"
          component={MessengerDetail}
          options={({ route }) => ({
            title: route.params.title,
            headerTitleStyle: { fontFamily: "Square", fontSize: 16 },
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerShown: true,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
