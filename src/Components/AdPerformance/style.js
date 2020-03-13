import { StyleSheet } from "react-native";
import {
  width,
  verticalScale,
  moderateScale,
  scale,
} from "../../Utils/scaling";

const blackText = "#6E6969";

const styles = StyleSheet.create({
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
    color: "#5F92F3",
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
});

export default styles;
