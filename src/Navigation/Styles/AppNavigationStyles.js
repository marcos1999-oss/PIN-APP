import { StyleSheet } from "react-native";
import { Colors } from "../../Themes";
import { scale, verticalScale } from "../../Utils/scaling";

const style = StyleSheet.create({
  btnPostStyle: {
    backgroundColor: Colors.btnPostBackground,
    borderColor: Colors.black,
    top: verticalScale(-7.5),
    height: verticalScale(70),
    width: verticalScale(70),
    borderWidth: scale(5),
    borderRadius: verticalScale(35),
    alignItems: "center",
    justifyContent: "center",
  },
  businessTabStyle: {
    height: verticalScale(60),
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(2),
    backgroundColor: Colors.black,
  },
  businessTabLabelStyle: {
    color: Colors.white,
    fontSize: scale(10),
    fontWeight: "bold",
    paddingTop: scale(3),
  },
  btnNewsStyle: {
    position: "absolute",
    bottom: scale(15),
    right: scale(0),
    backgroundColor: "grey",
    width: scale(10),
    height: scale(10),
    borderRadius: scale(10 / 2),
    borderWidth: scale(2.1),
    borderColor: Colors.white,
  },
  btnMeStyle: {
    position: "absolute",
    bottom: scale(12),
    right: scale(0),
    backgroundColor: "grey",
    width: scale(10),
    height: scale(10),
    borderRadius: scale(10 / 2),
    borderWidth: scale(2.1),
    borderColor: Colors.white,
  },
  btnNewsActiveStyle: {
    backgroundColor: Colors.red,
  },
});

export const businessBackgroundTabActive = Colors.skyBlue;
export const businessBackgroundTabInactive = Colors.white;

export default style;
