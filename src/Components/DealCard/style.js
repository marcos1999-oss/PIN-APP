import React from "react";
import { StyleSheet } from "react-native";
import {
  verticalScale,
  scale,
  normalizeSize,
  moderateScale,
} from "../../Utils/scaling";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: verticalScale(204.67),
  },
  dealImage: {
    flex: 1,
    resizeMode: "cover",
  },
  comboTextContainer: {
    height: verticalScale(247.67) - verticalScale(204.67),
    width: "100%",
    marginTop: verticalScale(8),
    paddingHorizontal: scale(4),
  },
  content: {
    color: "#6E6969",
  },
  titleText: {
    fontSize: moderateScale(12),
    alignSelf: "flex-start",
  },
  normalText: {
    fontSize: moderateScale(6),
  },

  dealPerformanceContainer: {
    marginTop: verticalScale(8),
    flexDirection: "row",
  },
  likeContainer: {
    flexDirection: "row",
    // flex: 1,
    marginRight: scale(10),
    alignItems: "flex-start",
  },
  likeIcon: {
    fontSize: moderateScale(8),
    color: "#DF0103",
    marginTop: verticalScale(2),
  },
  performanceText: {
    marginLeft: scale(5),
    fontSize: moderateScale(8),
    color: "#6E6969",
  },
  watchContainer: {
    flexDirection: "row",
    // flex: 1,
    alignItems: "flex-start",
  },
  watchIcon: {
    fontSize: moderateScale(8),
    color: "#000",
    marginTop: verticalScale(2),
  },
  distanceText: {
    marginLeft: scale(5),
    fontSize: 10,
    color: "#9F9C9C",
    fontWeight: "bold",
  },
});
