import React from "react";
import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "../../../Utils/scaling";
import { Colors } from "../../../Themes";

export default StyleSheet.create({
  powerButton: {
    marginRight: scale(15),
    alignSelf: "flex-end",
  },
  powerIcon: {
    color: "white",
  },
  bottom: {
    height: verticalScale(100),
    backgroundColor: "black",
    borderTopWidth: 0,
  },
  bottomItemContainer: {
    alignItems: "center",
  },
  bottomIcon: {
    color: "white",
  },
  postButton: {
    flexDirection: "column",
    backgroundColor: Colors.btnPostBackground,
    width: verticalScale(70),
    height: verticalScale(70),
    borderRadius: verticalScale(35),
    alignItems: "center",
    justifyContent: "center",
  },
  textIcon: {
    fontSize: moderateScale(10),
    fontWeight: "bold",
    color: "white",
  },
  l_cameraTop: {
    backgroundColor: "#000",
    padding: 20,
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  l_cameraBottom: {
    backgroundColor: "#000",
    width: "100%",
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  l_cameraBottom_btn1: {
    alignItems: "center",
  },
  l_cameraBottom_btn2: {
    flexDirection: "column",
    backgroundColor: "#31AF91",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  l_camera_preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  l_camera_capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
});

export const captureBtnSize = scale(35);
export const powerIconSize = scale(20);
