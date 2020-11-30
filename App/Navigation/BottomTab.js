import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "../Navigation/HomeStack";
import MessengerScreen from "../Screens/MessengerScreen";
import CalendarScreen from "../Screens/CalendarScreen";
import SettingScreen from "../Screens/SettingScreen";
import CommunityScreen from "../Screens/CommunityScreen";
import TabBar from "./BottomTabBar";
import { Host } from "react-native-portalize";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Host>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="home" component={HomeStack} />
        <Tab.Screen name="message-bulleted" component={MessengerScreen} />
        <Tab.Screen name="account-group" component={CommunityScreen} />
        <Tab.Screen name="calendar" component={CalendarScreen} />
        <Tab.Screen name="menu" component={SettingScreen} />
      </Tab.Navigator>
    </Host>
  );
};

export default BottomTab;