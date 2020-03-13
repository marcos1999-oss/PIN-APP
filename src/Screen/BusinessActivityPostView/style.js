import React from "react";
import { StyleSheet, Platform } from "react-native";
import {
  width,
  scale,
  verticalScale,
  moderateScale,
} from "../../Utils/scaling";

const IS_IOS = Platform.OS === "ios";
export default StyleSheet.create({
  headerContainer: {
    // position: 'absolute',
    width: "100%",
    height: verticalScale(60),
    backgroundColor: "black",
    // top: 0,
    // left: 0,
    zIndex: 1000,
    flexDirection: "row",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBackBtn: {
    marginLeft: scale(15),
    justifyContent: "center",
    alignItems: "flex-start",
    width: 100,
  },
  closeIcon: {
    fontSize: moderateScale(14),
    color: "white",
  },
  headerTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: moderateScale(12),
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
  container: {
    paddingHorizontal: scale(20),
    flexDirection: "column",
  },
  switchContainer: {
    height: verticalScale(30),
    width: scale(220),
    marginBottom: verticalScale(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 1,
    alignSelf: "center",
  },
  adPerformanceContainer: {
    marginBottom: verticalScale(10),
  },
  eventContainer: {
    height: verticalScale(20),
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(15),
    justifyContent: "center",
    backgroundColor: "#84CC7E",
    borderRadius: verticalScale(20),
    alignSelf: "flex-start",
  },
  eventText: {
    fontSize: moderateScale(12),
    color: "white",
  },
  buttonGroupContainer: {
    marginTop: verticalScale(10),
    flexDirection: "column",
  },
  buttonBlock: {
    height: verticalScale(40),
    marginBottom: verticalScale(10),
    borderRadius: verticalScale(5),
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: verticalScale(3) },
    shadowRadius: 6,
    elevation: 1,
  },
  btnText: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
});
