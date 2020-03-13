import React from "react";
import { StyleSheet } from "react-native";
import { verticalScale, scale, moderateScale } from "../../../../Utils/scaling";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: scale(15),
    marginVertical: verticalScale(25),
  },
  title: {
    fontSize: moderateScale(12),
    fontWeight: "bold",
  },
  allPostsContainer: {
    marginTop: verticalScale(15),
    marginBottom: verticalScale(25),
  },
  PinsContainer: {
    marginVertical: verticalScale(10),
  },
  NoPostsShowMessage: {
    fontSize: 14,
    color: "#D3D3D3",
  }
});
