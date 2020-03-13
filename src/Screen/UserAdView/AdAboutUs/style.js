import { StyleSheet } from "react-native";
import {
  width,
  verticalScale,
  moderateScale,
  scale,
} from "../../../Utils/scaling";
import {responsiveHeight} from "../../../Utils/dimensions";

const blackText = "#6E6969";
const green = "#3FC94F";
export const purpleText = "#A338FF";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  title: {
    marginBottom:responsiveHeight(1),
    color: blackText,
    fontSize: moderateScale(12),
    fontWeight: "bold",
  },
  summary: {
    color: blackText,
    fontSize: moderateScale(14),
    marginBottom: verticalScale(33),
  },
  featuresTable: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: verticalScale(18),
  },
  featuresContainer: {
    flexDirection: "row",
    flexGrow: 0,
    flexBasis: "33%",
    marginBottom: verticalScale(10),
  },
  featureImageContainer: {
    width: scale(15),
    height: verticalScale(15),
    justifyContent: "flex-start",
    alignItems: "center",
  },
  featureImage: {
    flex: 1,
    resizeMode: "contain",
  },
  featureTextContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  featureText: {
    marginLeft: scale(12),
    fontSize: moderateScale(10),
    color: blackText,
  },
  scheduleContainer: {
    marginTop: verticalScale(10),
  },
  schedule: {
    flexDirection: "row",
    marginBottom: verticalScale(17),
  },
  dateContainer: {
    flex: 7,
    justifyContent: "flex-start",
  },
  date: {
    color: blackText,
    fontSize: moderateScale(14),
  },
  timeContainer: {
    flex: 3,
    justifyContent: "flex-start",
  },
  time: {
    color: blackText,
    fontSize: moderateScale(12),
    fontWeight: "bold",
  },
  bottomList: {
    position: "relative",
    width,
    left: scale(-20),
    marginBottom: verticalScale(30),
  },
  listItem: {
    marginLeft: 0,
    paddingLeft: scale(25),
  },
});

export default styles;
