import React from "react";
import { StyleSheet } from "react-native";
import {
  width,
  height,
  scale,
  verticalScale,
  moderateScale,
} from "../../Utils/scaling";

const blue = "#57A3EF";
const green = "#99CC00";
const persianGreen = "#00A599";
const orange = "#F46C05";
const red = "#FF0000";
const purple = "#CC29AE";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  submitButton: {
    marginRight: scale(5),
    alignSelf: "flex-end",
  },
  submitText: {
    fontSize: moderateScale(12),
    fontWeight: "bold",
    color: "white",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(50),
  },
  textArea: {
    fontSize: moderateScale(12),
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  themeSelectionContainer: {
    height: verticalScale(52),
    paddingLeft: scale(30),
    paddingRight: scale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  themeButton: {
    paddingBottom: 0,
  },
});

export const colors = [blue, green, persianGreen, orange, red, purple];
