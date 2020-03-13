import React from "react";
import { StyleSheet } from "react-native";
import { verticalScale, scale, moderateScale } from "../../Utils/scaling";

export default StyleSheet.create({
  navigation: {
    backgroundColor: "#000",
    flexDirection: "row",
    paddingTop: verticalScale(5),
  },
  navigation_item: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: scale(5),
    marginVertical: verticalScale(5),
    flexDirection: "column",
    justifyContent: "center",
  },
  navigation_item_post: {
    backgroundColor: "#31af91",
    borderColor: "#000",
    flex: 0,
    height: verticalScale(80),
    width: verticalScale(80),
    borderWidth: verticalScale(5),
    borderRadius: verticalScale(40),
    marginTop: verticalScale(-20),
  },
  navigation_item_text: {
    color: "#fff",
    fontSize: moderateScale(10),
    paddingTop: verticalScale(3),
  },

  status: {
    position: "relative",
    top: verticalScale(-12),
    left: scale(9),
    backgroundColor: "grey",
    width: verticalScale(10),
    height: verticalScale(10),
    borderRadius: verticalScale(5),
    borderWidth: 2.1,
    borderColor: "#fff",
  },
  status_active: {
    backgroundColor: "red",
  },
});
