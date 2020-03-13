import { StyleSheet } from "react-native";
import { verticalScale, scale, moderateScale } from "../../Utils/scaling";
import {responsiveHeight} from "../../Utils/dimensions";

const style = StyleSheet.create({
  profile: {
    width: "100%",
    height: "50%",
    backgroundColor: "#bdbdbd",
    position: "absolute",
    top: 0,
    left: 0,
  },
  headerStyle: {

    backgroundColor: "transparent",
    borderBottomWidth: 0,
    elevation: 0,
  },
  blurViewWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: verticalScale(60),
    overflow: "hidden",
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: verticalScale(60),
  },
  container: {
    justifyContent: "center",
    paddingTop: verticalScale(120),
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  brandName: {
    minWidth: "50%",
    maxWidth: "80%",
    height: verticalScale(20),
    borderRadius: verticalScale(20),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(-30),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 1,
  },
  brandName_text: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: "center",
    color: "#484646",
    fontSize: moderateScale(10),
    fontWeight: "bold",
  },
  main: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    height: verticalScale(295),
    marginBottom: verticalScale(20),
  },
  linkContainer: {
    width: "100%",
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(10),
    flexDirection: "row",
    alignItems: "center",
  },
});

export default style;
