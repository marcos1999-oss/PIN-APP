import React from "react";
import { StyleSheet } from "react-native";
import {
  width,
  scale,
  verticalScale,
  moderateScale,
} from "../../Utils/scaling";

export const size12 = moderateScale(12);
const size10 = moderateScale(10);
const lightBlack = "#9B9797";
export default StyleSheet.create({
  headerContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    marginBottom: verticalScale(10),
  },
  closeIcon: {
    fontSize: moderateScale(14),
    color: "black",
  },
    closeButton: {
      marginLeft: verticalScale(8),
    },
  pinContainer: {
    marginTop: verticalScale(40),
    paddingHorizontal: scale(28),
    flexDirection: "column",
  },
  firstText: {
    fontSize: size12,
    fontWeight: "bold",
    marginBottom: verticalScale(20),
  },
  textGroup: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: verticalScale(20),
  },
  titleText: {
    fontSize: size10,
  },
  contentText: {
    fontSize: size12,
    color: lightBlack,
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
    backgroundColor: "#5F92F3",
    borderRadius: verticalScale(5),
  },
  usedAmountContainer: {
    marginTop: verticalScale(48),
    marginBottom: verticalScale(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  used: {
    fontSize: moderateScale(8),
    fontWeight: "bold",
    marginRight: scale(8),
  },
  currencySymbol: {
    fontSize: size12,
    color: "#9B9797",
  },
  amount: {
    fontSize: moderateScale(24),
    color: "#9B9797",
    marginLeft: scale(13),
  },
  btnContainer: {
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
  btnDescription: {
    fontSize: size10,
    color: lightBlack,
  },
  cardContainer: {
    width: verticalScale(234),
    alignSelf: "center",
  },
  btnDelete: {
    backgroundColor: "#E85858",
    width: scale(125),
    height: verticalScale(34),
  },
  textDelete: {
    color: "#fff",
    textAlign: "center",
    width: "100%",
    fontSize: moderateScale(16),
  },
  cancelText: {
    color: "#E85858",
    textAlign: "center",
    width: "100%",
    fontSize: moderateScale(14),
  },
});
