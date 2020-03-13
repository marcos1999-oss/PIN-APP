import React from "react";
import { StyleSheet } from "react-native";
import { verticalScale, scale, moderateScale } from "../../Utils/scaling";

export default StyleSheet.create({
  container: {
    // flex: 1,
    height: verticalScale(247.67),
    flexDirection: "column",
    paddingBottom: verticalScale(42),
    backgroundColor: "#A338FF",
    justifyContent: "space-around",
    alignItems: "center",
  },
  comboTextContainer: {
    alignItems: "center",
  },
  content: {
    color: "white",
    fontWeight: "bold",
  },
  icon: {
    fontSize: moderateScale(50),
  },
  largeText: {
    fontSize: moderateScale(14),
  },
  normalText: {
    fontSize: moderateScale(10),
  },
});
