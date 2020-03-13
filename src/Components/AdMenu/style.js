import { StyleSheet } from "react-native";
import {
  width,
  verticalScale,
  moderateScale,
  scale,
} from "../../Utils/scaling";

const blackText = "#6E6969";
const green = "#3FC94F";
export const purpleText = "#A338FF";

const styles = StyleSheet.create({
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
    flex: 4,
  },
  rightText: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    alignSelf: "center",
    marginRight: 5,
  },
  time: {
    fontSize: moderateScale(10),
    fontWeight: "bold",
    color: "#5F92F3",
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
