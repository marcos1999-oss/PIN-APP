import React from "react";
import { Easing, Animated } from "react-native";

export default () => {
  return {
    transitionSpec: {
      duration: 100,
      easing: Easing.in(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      let router = sceneProps.navigation.state.routes;

      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex, thisSceneIndex + 1],
        outputRange: [0, width],
      });

      return { transform: [{ translateX }] };
    },
  };
};
