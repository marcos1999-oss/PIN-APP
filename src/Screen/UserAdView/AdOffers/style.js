import { StyleSheet } from "react-native";
import {
  width,
  verticalScale,
  moderateScale,
  scale,
} from "../../../Utils/scaling";

const blackText = "#6E6969";
const green = "#3FC94F";
export const purpleText = "#A338FF";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  eventContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(15),
  },
  eventButton: {
    width: verticalScale(30),
    height: verticalScale(30),
    marginRight: scale(10),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 1,
    justifyContent: "center",
  },
  eventIcon: {
    color: "#AD378C",
    fontSize: moderateScale(13),
  },
  eventText: {
    color: "#AD378C",
    fontSize: moderateScale(10),
    fontWeight: "bold",
  },
  adPerformance: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(23),
  },
  adStatusText: {
    color: blackText,
    fontSize: moderateScale(12),
    fontWeight: "bold",
  },
  performanceContainer: {
    flexDirection: "row",
    marginLeft: scale(22),
    alignItems: "center",
  },
  likeIcon: {
    fontSize: moderateScale(6),
    color: "#DF0103",
  },
  performanceText: {
    marginLeft: scale(5),
    fontSize: moderateScale(10),
    color: blackText,
  },
  watchIcon: {
    fontSize: moderateScale(6),
    color: "#000",
  },
  menuContainer: {
    flexDirection: "column",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: verticalScale(16),
  },
  menuName: {
    fontSize: moderateScale(14),
    color: blackText,
    flex: 6,
  },
  rightText: {
    flex: 2,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    alignSelf: "center",
  },
  time: {
    fontSize: moderateScale(10),
    fontWeight: "bold",
    color: green,
  },
  cost: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: blackText,
  },
  percentageIcon: {
    color: green,
    fontSize: moderateScale(14),
  },
  off: {
    fontSize: moderateScale(8),
    fontWeight: "bold",
    color: green,
  },
  horizontalDivider: {
    position: "relative",
    left: scale(-20),
    width,
    height: 0,
    borderBottomWidth: 0.5,
    borderColor: "#707070",
    marginBottom: verticalScale(8),
  },
  vipTitle: {
    fontSize: moderateScale(8),
    fontWeight: "bold",
    color: purpleText,
    marginBottom: verticalScale(7),
  },
});

export default styles;
