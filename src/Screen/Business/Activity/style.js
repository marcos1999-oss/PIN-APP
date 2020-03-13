import React from "react";
import { StyleSheet, Platform } from "react-native";
import {
  width,
  scale,
  verticalScale,
  moderateScale,
} from "../../../Utils/scaling";

const textTabStyle = moderateScale(12);
export default StyleSheet.create({
  headerContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    elevation: 0,
  },
  underlineTab: {
    height: verticalScale(1),
    backgroundColor: "#5F92F3",
  },
  tabStyle: {
    backgroundColor: "white",
    alignItems: "flex-end",
    paddingBottom: verticalScale(5),
  },
  textStyle: {
    fontSize: textTabStyle,
    color: "#959595",
  },
  activeTextStyle: {
    fontSize: textTabStyle,
    fontWeight: "bold",
    color: "black",
  },
});
