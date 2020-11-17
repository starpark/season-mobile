import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Components/Home";
import Messenger from "../Components/Messenger";
import Calendar from "../Components/Calendar";
import Setting from "../Components/Setting";
import Community from "../Components/Community";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import TabBar from "./TabBar";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="message-bulleted" component={Messenger} />
        <Tab.Screen name="account-group" component={Community} />
        <Tab.Screen name="calendar" component={Calendar} />
        <Tab.Screen name="menu" component={Setting} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTab;
