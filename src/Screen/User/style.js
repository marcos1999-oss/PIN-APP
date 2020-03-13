import React from "react";
import { StyleSheet, Platform } from "react-native";
import { verticalScale, scale, moderateScale } from "../../Utils/scaling";

const IS_IOS = Platform.OS === "ios";
export default StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(IS_IOS ? 5 : 10),
    justifyContent: "space-between",
  },
  headerIcon: {
    width: verticalScale(35),
    height: verticalScale(35),
  },
  blueDot: {
    position: "absolute",
    bottom: 0,
    left: IS_IOS ? 0 : verticalScale(-11.5),
    width: verticalScale(12),
    height: verticalScale(12),
    borderRadius: verticalScale(6),
    borderWidth: verticalScale(2),
    borderColor: "white",
    backgroundColor: "#44C7F7",
  },
  heartBufferLayer: {
    width: verticalScale(35),
    height: verticalScale(35),
    borderRadius: verticalScale(17.5),
    borderWidth: 0.4,
    borderColor: "#E85858",
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "#E858584C",
  },
  content: {},
  controlPanel: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(10),
    // backgroundColor: 'green',
  },
  controlButton: {
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
  },
  activeControlIcon: {
    fontSize: moderateScale(16),
  },
  inactiveControlIcon: {
    fontSize: moderateScale(16),
    color: "#C4C4C4",
  },
  middleControlButton: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderLeftWidth: scale(0.5),
    borderRightWidth: scale(0.5),
    borderRadius: 0,
    borderColor: "#707070",
  },
});
