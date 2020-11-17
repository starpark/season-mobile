import React, { useState, useEffect } from "react";
import { BottomMenuItem } from "./BottomMenuItem";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";

const TabBar = ({ state, descriptors, navigation }) => {
  const [translateValue] = useState(new Animated.Value(0));
  const totalWidth = Dimensions.get("window").width;
  const tabWidth = totalWidth / state.routes.length;

  const animateSlider = (index) => {
    Animated.spring(translateValue, {
      toValue: index * tabWidth,
      velocity: 10,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateSlider(state.index);
  }, [state.index]);

  return (
    <View style={[style.tabContainer, { width: totalWidth }]}>
      <View style={{ flexDirection: "row" }}>
        <Animated.View
          style={[
            style.slider,
            {
              transform: [{ translateX: translateValue }],
              width: tabWidth - 20,
            },
          ]}
        />

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }

            animateSlider(index);
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ["selected"] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={index}
            >
              <BottomMenuItem
                isCurrent={isFocused}
                iconName={label.toString()}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  tabContainer: {
    height: 60,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowColor: "black",
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    backgroundColor: "#fbfbfb",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 10,
    position: "absolute",
    bottom: 0,
  },
  slider: {
    height: 5,
    position: "absolute",
    top: 0,
    left: 10,
    backgroundColor: "#DC143C",
    borderRadius: 10,
  },
});

export default TabBar;
