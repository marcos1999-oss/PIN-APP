import React from "react";
import { StyleSheet } from "react-native";
import {
  width,
  height,
  scale,
  verticalScale,
  moderateScale,
} from "../../Utils/scaling";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4E4E4",
  },
  submitButton: {
    marginRight: scale(5),
    alignSelf: "flex-end",
  },
  submitText: {
    fontSize: moderateScale(12),
    fontWeight: "bold",
    color: "white",
    textTransform: "capitalize",
  },
  bgSelection: {
    paddingVertical: verticalScale(15),
    paddingLeft: scale(35),
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  imageContainer: {
    width: verticalScale(60),
    height: verticalScale(60),
    borderRadius: verticalScale(10),
  },
  image: {
    flex: 1,
    borderRadius: verticalScale(10),
    resizeMode: "cover",
  },
  inputContainer: {
    backgroundColor: "white",
    marginBottom: verticalScale(14),
  },
  wordCountContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    justifyContent: "flex-end",
  },
  wordCount: {
    fontSize: moderateScale(8),
    color: "#959595",
  },
  offerContainer: {
    // paddingRight: scale(9),
  },
  sectionContainer: {
    paddingLeft: scale(9),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    color: "#6E6969",
  },
  sectionSubText: {
    fontSize: moderateScale(10),
    fontWeight: "bold",
    color: "#959595",
    marginBottom: verticalScale(20),
  },
  offerIconContainer: {
    paddingHorizontal: scale(20),
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(12),
  },
  offerButton: {
    width: scale(56.33),
    height: verticalScale(37.55),
    borderRadius: verticalScale(10),
    justifyContent: "center",
  },
  offerIcon: {
    color: "white",
  },
  activeOfferIcon: {
    color: "white",
    borderBottomWidth: scale(2),
    borderColor: "white",
  },
  vipText: {
    fontSize: moderateScale(12),
    fontWeight: "bold",
  },
  availabilityContainer: {
    // paddingTop: verticalScale(10),
    // paddingBottom: verticalScale(15),
  },
  dayPickerContainer: {
    marginTop: verticalScale(6),
    paddingTop: verticalScale(9),
    paddingLeft: scale(9),
    marginBottom: verticalScale(10),
    backgroundColor: "white",
  },
  formTitle: {
    fontSize: 10,
    color: "black",
  },
  ckBoxContainer: {
    paddingRight: scale(25),
    marginTop: verticalScale(7),
    marginBottom: verticalScale(13),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkbox: {
    width: verticalScale(40),
    height: verticalScale(40),
    borderWidth: 0.4,
    borderColor: "#a7a7a7",
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox_active: {
    backgroundColor: "#5F92F3",
  },
  checkbox_label: {
    fontWeight: "bold",
    fontSize: moderateScale(18),
    color: "#959595",
  },
  hoursFormContainer: {
    flexDirection: "row",
    marginTop: verticalScale(6),
    marginBottom: verticalScale(14),
    paddingRight: scale(45),
    justifyContent: "space-between",
    alignItems: "center",
  },
  hourLabel: {
    color: "#000",
    fontSize: moderateScale(10),
    fontWeight: "bold",
  },
  dateInputContainer: {
    borderWidth: 0.4,
    borderBottomWidth: 0,
  },
  closeDateInputContainer: { marginRight: scale(-10) },
  dateInput: { borderWidth: 0, width: 110 },
  offerPriceContainer: {
    marginBottom: verticalScale(10),
  },
  priceContainer: {
    marginTop: verticalScale(7),
    paddingHorizontal: scale(10),
    height: verticalScale(58),
    backgroundColor: "white",
    flexDirection: "row",
  },
  leftPriceContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  priceText: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: "#5F92F3",
    textAlign: "center",
  },
  disablePriceText: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: "#959595",
    textAlign: "center",
  },
  middleDivider: {
    position: "absolute",
    top: verticalScale(5),
    left: scale(width / 2),
    height: verticalScale(50),
    borderWidth: 0.4,
    borderColor: "#7070704C",
    zIndex: 1,
  },
  middleTextContainer: {
    position: "absolute",
    zIndex: 999,
    left: scale(width / 2 - scale(10)),
    top: verticalScale(verticalScale(58) / 2 - verticalScale(7)),
    width: scale(20),
    height: verticalScale(14),
    backgroundColor: "white",
  },
  middleText: {
    position: "absolute",
    fontSize: moderateScale(10),
    left: scale(5),
  },
  rightPriceContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dollarSymbol: {
    marginHorizontal: scale(23),
    fontSize: moderateScale(15),
  },
  postingTypeContainer: {
    // marginBottom: verticalScale(10),
  },
  typeContainer: {
    paddingTop: verticalScale(15),
    marginBottom: verticalScale(15),
    paddingHorizontal: scale(10),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  typeButton: {
    width: verticalScale(90),
    height: verticalScale(90),
    borderRadius: verticalScale(15),
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  activeTypeButton: {
    borderWidth: verticalScale(2),
    borderColor: "#5F92F3",
  },
  typeIcon: {
    fontSize: moderateScale(40),
    marginBottom: verticalScale(10),
  },
  typeText: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
  buttonGroup: {
    marginTop: verticalScale(43),
    marginBottom: verticalScale(29),
    marginHorizontal: scale(12),
    height: verticalScale(90),
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonBlock: {
    height: verticalScale(40),
    borderRadius: verticalScale(5),
    flexDirection: "column",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(3),
    },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 5,
  },
  btnMainText: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: "white",
  },
  btnSubText: {
    fontSize: moderateScale(8),
    fontWeight: "bold",
    color: "white",
  },
  cardContainer: { width: scale(255), alignSelf: "center" },
  cardWrapper: {
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(10),
    alignItems: "center",
    justifyContent: 'center'
  },
  actionBtnContainer: { marginTop: verticalScale(20) },
  cardTitle: {
    color: "#6E6969",
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
});

export const timeInputStyle = {
  placeholderText: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: "#959595",
    textAlign: "center",
  },
  dateText: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: "#959595",
    textAlign: "center",
    alignSelf: "center",
  },
  dateInput: {
    borderColor: "#A7A7A7",
    borderWidth: 0.4,
    alignItems: "center",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  m_error_msg: {
    color: "#FF0000",
    fontSize: 10,
    padding: 5,
  },
};
