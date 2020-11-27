import * as React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../Screens/Login/LoginScreen";
import FindPasswordScreen from "../Screens/Login/FindPasswordScreen";

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          cardStyle: {
            backgroundColor: "white",
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false, Title: "로그인" }}
        />
        <Stack.Screen
          name="FindPW"
          component={FindPasswordScreen}
          options={{
            title: "비밀번호찾기",
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerStyle: {
              backgroundColor: "#fff",
              shadowColor: "transparent",
              shadowRadius: 0,
              shadowOffset: {
                height: 0,
              },
              elevation: 0,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginStack;
