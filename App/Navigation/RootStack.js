import * as React from "react";
import { Share } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import BottomTab from "./BottomTab";
import NoticeTab from "./NoticeTab";
import NoticeMore from "../Screens/NoticeMore";
import { navigationRef } from "./rootNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { Host } from "react-native-portalize";
import { IconButton, Colors } from "react-native-paper";

const Stack = createStackNavigator();

const RootScreen = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <NavigationContainer ref={navigationRef}>
      <Host>
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
            component={BottomTab}
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
              headerTitleStyle: { fontFamily: "Godo" },
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
              headerTitleStyle: { fontFamily: "Godo" },
              headerRight: () => (
                <IconButton
                  icon="dots-vertical"
                  size={24}
                  onPress={() => console.log("Pressed")}
                />
              ),
            }}
          />
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
};

export default RootScreen;
