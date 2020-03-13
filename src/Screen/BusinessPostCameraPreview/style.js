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
  headerContainer: {
    // position: 'absolute',
    width: "100%",
    height: verticalScale(60),
    backgroundColor: "black",
    top: 0,
    left: 0,
    zIndex: 1000,
    flexDirection: "row",
    // justifyContent: 'center',
  },
  headerBackBtn: {
    marginLeft: scale(15),
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  closeIcon: {
    fontSize: moderateScale(14),
    color: "white",
  },
  headerTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
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
