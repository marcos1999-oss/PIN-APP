import React from "react";
import { StyleSheet, Platform } from "react-native";
import {
  verticalScale,
  scale,
  normalizeSize,
  moderateScale,
} from "../../../Utils/scaling";

const IS_IOS = Platform.OS === "ios";
export const endedIconSize = verticalScale(100);

export default StyleSheet.create({
  endedContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    paddingTop: verticalScale(120),
  },
  endedText: {
    marginTop: verticalScale(20),
    fontFamily: "Helvetica",
    fontSize: moderateScale(14),
    textAlign: "center",
  },
  container: {
    paddingTop: verticalScale(20),
    paddingHorizontal: scale(15),
    flex: 1,
  },
  cardContainer: {
    width: scale(167.6),
    height: verticalScale(247.67),
    marginBottom: verticalScale(13),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(3) },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: IS_IOS ? 1 : 5,
  },
  evenCardContainer: {
    marginLeft: verticalScale(5),
  },
  oddCardContainer: {
    marginRight: verticalScale(5),
  },
  dealsContainer: {
    marginBottom: verticalScale(13),
  },
  searchContainer: {
    alignSelf: "center",
    height: verticalScale(40),
    width: scale(311),
    marginHorizontal: scale(15),
    marginBottom: verticalScale(30),
    borderRadius: verticalScale(10),
    borderWidth: 0,
    borderColor: "white",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(3) },
    shadowOpacity: 0.16,
    // shadowRadius: 6,
    elevation: IS_IOS ? 1 : 9,
  },
  searchInput: {
    fontSize: moderateScale(12),
    color: "black",
  },
});
