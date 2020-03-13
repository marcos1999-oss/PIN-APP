import React from "react";
import { StyleSheet } from "react-native";
import {
  width,
  scale,
  verticalScale,
  moderateScale,
} from "../../../Utils/scaling";

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    marginBottom: verticalScale(10),
    elevation: 0,
  },
  closeIcon: {
    fontSize: moderateScale(14),
    color: "black",
  },
  contentContainer: {
    marginTop: verticalScale(35),
    paddingHorizontal: scale(28),
    flexDirection: "column",
    alignItems: "center",
  },
  contentTitle: {
    fontSize: moderateScale(12),
    fontWeight: "bold",
  },
  pinInfoContainer: {
    marginTop: verticalScale(23),
    marginBottom: verticalScale(33),
    height: verticalScale(50),
    flex: 1,
    flexDirection: "row",
  },
  pinInfoItem: {
    paddingVertical: verticalScale(8),
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  middleItem: {
    borderLeftWidth: verticalScale(0.4),
    borderRightWidth: verticalScale(0.4),
    borderColor: "#707070",
  },
  pinInfoPerformance: {
    fontSize: moderateScale(14),
    color: "#9B9797",
  },
  pinInfoDescription: {
    fontSize: moderateScale(8),
  },
  textGroup: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: verticalScale(20),
    width: "100%",
  },
  titleText: {
    fontSize: moderateScale(10),
  },
  contentText: {
    fontSize: moderateScale(12),
    color: "#9B9797",
  },
  m_progressbar: {
    marginTop: verticalScale(10),
    width: "100%",
    height: verticalScale(5),
    backgroundColor: "#EAE8E8",
    borderRadius: verticalScale(5),
    /*Shadow*/
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(3),
    },
    shadowOpacity: 0.16,
    // shadowRadius: 6,
    elevation: 1,
  },
  m_progressbar_inner: {
    height: verticalScale(5),
    backgroundColor: "#40EA31",
    borderRadius: verticalScale(5),
  },
  btnContainer: {
    marginTop: verticalScale(130),
    marginHorizontal: scale(15),
    marginBottom: verticalScale(15),
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
  btn: {
    marginBottom: verticalScale(15),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(3),
    },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 5,
  },
  btnDescriptionContainer: {
    paddingHorizontal: scale(40),
    alignItems: "center",
  },
  btnDescription: {
    fontSize: moderateScale(10),
    color: "#9B9797",
    textAlign: "center",
  },
});
