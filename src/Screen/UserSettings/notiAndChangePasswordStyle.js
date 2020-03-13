import React from "react";
import { StyleSheet } from "react-native";
import {
  width,
  verticalScale,
  moderateScale,
  scale,
} from "../../Utils/scaling";

export default StyleSheet.create({
  l_container: {
    flex: 1,
    backgroundColor: "#5F92F3",
  },

  l_bottom: {
    position: "absolute",
    bottom: 0,
  },
  m_SwitchList: {
    flexDirection: "row",
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(5),
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  payments_text1: {
    color: "#fff",
    fontSize: moderateScale(10),
  },
  payments_text2: {
    color: "#fff",
    fontSize: moderateScale(30),
  },
  payments_text3: {
    color: "#fff",
    fontSize: moderateScale(14),
  },
  payments_text4: {
    color: "#fff",
    fontSize: moderateScale(8),
  },
  payments_vertical_border: {
    height: verticalScale(45),
    width: 0.5,
    backgroundColor: "#eee",
  },

  m_monthCard: {
    backgroundColor: "#000",
    width: scale(341),
    height: verticalScale(187),
    borderRadius: verticalScale(30),
    alignItems: "center",
    marginHorizontal: scale(10),
  },
  m_monthCard_bottom_mask: {
    position: "absolute",
    bottom: 0,
  },
  m_monthCard_bottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  m_monthCard_bottom_child: {
    alignItems: "center",
  },

  m_monthCard_txt1: {
    color: "#fff",
    fontSize: moderateScale(10),
  },
  m_monthCard_txt2: {
    color: "#fff",
    fontSize: moderateScale(30),
  },
  m_monthCard_txt3: {
    color: "#fff",
    fontSize: moderateScale(12),
  },
  m_monthCard_txt4: {
    color: "#fff",
    fontSize: moderateScale(8),
  },

  m_toggleSwitch: {
    borderWidth: 0.6,
    borderColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: verticalScale(20),
  },
  m_toggleSwitch_switch: {
    flex: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    backgroundColor: "#fff",
    borderRadius: verticalScale(20),
  },
  m_toggleSwitch_switch_text: {
    textAlign: "center",
    color: "#000",
    fontSize: moderateScale(12),
    fontWeight: "bold",
  },

  m_fabButton: {
    flexDirection: "row",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    marginRight: scale(-30),
  },
  m_fabButton_statusLight: {
    width: verticalScale(6),
    height: verticalScale(6),
    backgroundColor: "#fff",
    borderRadius: verticalScale(3),
    position: "absolute",
    left: scale(13),
  },
  cardContainer: { width: scale(234), alignSelf: "center" },
  cardWrapper: {
    paddingHorizontal: scale(10),
    paddingTop: verticalScale(10),
    alignItems: "center",
    alignSelf: "center",
  },
  cardTitle: {
    color: "#6E6969",
    fontSize: moderateScale(16),
    fontWeight: "bold",
    textAlign: "center",
  },
  actionBtnContainer: { marginTop: verticalScale(20) },
});
