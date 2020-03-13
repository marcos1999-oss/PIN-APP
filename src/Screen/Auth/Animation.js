import React from "react";
import posed from "react-native-pose";

export const UserLogin = posed.View({
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      default: { ease: "easeIn", duration: 100 },
    },
  },
  hidden: {
    y: 30,
    opacity: 0.5,
    scale: 0.8,
    transition: {
      default: { ease: "easeOut", duration: 100 },
    },
  },
});

export const BusinessLogin = posed.View({
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      default: { ease: "easeOut", duration: 100 },
    },
  },
  hidden: {
    y: 30,
    opacity: 0.5,
    scale: 0.8,
    transition: {
      default: { ease: "easeIn", duration: 100 },
    },
  },
});
