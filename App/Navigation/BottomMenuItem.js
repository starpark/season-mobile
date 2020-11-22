import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const BottomMenuItem = ({ iconName, isCurrent }) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={32}
        style={{ color: isCurrent ? "#DC143C" : "grey" }}
      />
    </View>
  );
};
