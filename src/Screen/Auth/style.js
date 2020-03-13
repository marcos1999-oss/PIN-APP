import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "../../Utils/scaling";
import { Colors } from "../../Themes";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  branding: {
    alignItems: "center",
    marginBottom: verticalScale(40),
  },
  branding_text: {
    color: Colors.white,
    fontSize: moderateScale(20),
  },
  formContainer: {
    width: "90%",
    zIndex: 1,
    height: verticalScale(370),
  },
  input: {
    fontSize: moderateScale(14),
  },
  bottom: {
    position: "absolute",
    bottom: 0,
  },
  g_vsap: {
    height: verticalScale(10),
  },
  error: {
    color: "#FF0000",
    fontSize: moderateScale(8),
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(5),
  },
  front: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 999,
  },
  back: {
    position: "absolute",
    top: 30,
    width: "100%",
    zIndex: 2,
    opacity: 0.9,
    transform: [{ scale: 0.8 }],
  },
  viewHeight50: {
    height: verticalScale(50),
  },
});
