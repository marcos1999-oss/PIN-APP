import React from "react";
import { StyleSheet } from "react-native";
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
    backgroundColor: "#84CC7E",
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
  title: {
    fontSize: moderateScale(12),
    fontWeight: "bold",
  },
  allPostsContainer: {
    marginTop: verticalScale(15),
  },
  marginBot25: {
    marginBottom: verticalScale(25),
  },
  textFontSize12: {
    fontSize: scale(12),
  },
  createText: {
    fontSize: scale(10),
    fontWeight: "bold",
  },
  infoPinPost: {
    fontSize: scale(10),
    alignSelf: "center",
  },
  createPostBtn: {
    alignSelf: "center",
    marginBottom: scale(15),
    marginTop: scale(15),
    borderRadius: 30,
    width: moderateScale(200),
    backgroundColor: "#5F92F3",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgIcon: {
    width: moderateScale(40),
    height: verticalScale(40),
    marginBottom: scale(5),
    marginTop: scale(25),
    alignSelf: "center",
  },
  createDescription: {
    fontSize: scale(12),
    color: "#808080",
  },
});
