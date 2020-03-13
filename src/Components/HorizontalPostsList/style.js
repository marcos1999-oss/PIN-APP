import React from "react";
import { StyleSheet } from "react-native";
import {
  width,
  scale,
  verticalScale,
  moderateScale,
} from "../../Utils/scaling";

const textTabStyle = moderateScale(12);
export default StyleSheet.create({
  portraitContainer: {
    width: scale(120),
    height: verticalScale(170),
    marginRight: scale(30),
    flexDirection: "column",
    justifyContent: "space-between",
  },
  portraitImageContainer: {
    width: "100%",
    height: verticalScale(150),
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: verticalScale(10),
  },
  eventType: {
    position: "absolute",
    left: scale(7),
    bottom: verticalScale(7),
    // width: scale(60),
    paddingHorizontal: scale(10),
    height: verticalScale(20),
    borderRadius: verticalScale(20),
    backgroundColor: "#84CC7E",
    justifyContent: "center",
  },
  landscapeContainer: {
    width: scale(235),
    height: verticalScale(100),
    marginRight: scale(20),
  },
  opacityItem: {
    opacity: 0.2,
  },
});
