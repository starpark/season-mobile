import * as React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../Components/Login";
import FindPW from "../Components/FindPW";

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
          component={Login}
          options={{ headerShown: false, Title: "로그인" }}
        />
        <Stack.Screen
          name="FindPW"
          component={FindPW}
          options={{
            title: "비밀번호찾기",
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerStyle: {
              elevation: 0,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginStack;
