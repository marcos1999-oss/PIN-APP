import React from "react";
import { StyleSheet, Platform } from "react-native";
import {
  width,
  scale,
  verticalScale,
  moderateScale,
} from "../../../Utils/scaling";

export const size12 = moderateScale(12);
const size10 = moderateScale(10);
const lightBlack = "#9B9797";
const IS_IOS = Platform.OS === "ios";
export default StyleSheet.create({
  headerContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    marginBottom: verticalScale(10),
    elevation: 0,
  },
  contentContainer: {
    // marginTop: verticalScale(40),
    paddingHorizontal: scale(28),
    flexDirection: "column",
  },
  pinContainer: {
    height: verticalScale(130),
    marginBottom: verticalScale(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(3),
    },
    shadowOpacity: 0.16,
    // shadowRadius: 6,
    borderRadius: verticalScale(10),
    elevation: IS_IOS ? 1 : 5,
    backgroundColor: IS_IOS ? "transparent" : "white",
  },
  pinImage: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    borderRadius: verticalScale(10),
  },
  firstText: {
    fontSize: size12,
    fontWeight: "bold",
    marginBottom: verticalScale(20),
  },
  textGroup: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: verticalScale(12),
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
    backgroundColor: "#40EA31",
    borderRadius: verticalScale(5),
  },
  usedCardContainer: {
    position: "relative",
    width: width,
    marginTop: verticalScale(12),
    marginBottom: verticalScale(15),
    left: scale(-28),
  },
  usedCardItem: {
    borderTopWidth: 0.5,
    marginLeft: 0,
    paddingLeft: scale(16),
  },
  cardInUse: {
    fontSize: moderateScale(10),
    fontWeight: "bold",
    color: "#6E6969",
    textTransform: "uppercase",
  },
  balanceContainer: {
    position: "relative",
    left: scale(-28),
    width,
    paddingLeft: scale(26),
    paddingRight: scale(42),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  currentBalanceContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
  },
  totalBalanceContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "baseline",
  },
  balanceTitle: {
    fontSize: moderateScale(10),
    fontWeight: "bold",
    marginRight: scale(15),
  },
  balanceAmount: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
  btnContainer: {
    marginTop: verticalScale(25),
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
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    color: "#6E6969",
    fontSize: moderateScale(16),
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: verticalScale(10),
  },
  cardSubText: {
    color: "#6E6969",
    fontSize: moderateScale(14),
    textAlign: "center",
    // marginVertical: verticalScale(10),
  },
});
