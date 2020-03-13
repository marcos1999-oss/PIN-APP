import React from "react";
import { StyleSheet } from "react-native";
import { verticalScale, moderateScale, scale } from "../../../Utils/scaling";

export default StyleSheet.create({
  m_link: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.6)",
    marginTop: verticalScale(10),
    height: verticalScale(40),
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  m_link_header: {
    borderBottomWidth: 0,
    borderBottomColor: "rgba(255,255,255,0.6)",
    height: verticalScale(36),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  m_link_text: {
    color: "#fff",
    fontSize: moderateScale(14),
    paddingLeft: scale(10),
  },
  m_link_icon: {
    position: "relative",
    left: scale(20),
  },
});
