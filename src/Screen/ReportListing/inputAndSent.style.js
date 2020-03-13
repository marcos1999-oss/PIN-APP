import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import {
  width,
  verticalScale,
  scale,
  moderateScale,
} from "../../Utils/scaling";

const style = StyleSheet.create({
  l_container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: verticalScale(47),
  },
  l_bottom: {
    width: width - scale(32),
    position: "absolute",
    bottom: verticalScale(-5),
    left: scale(32),
  },
  contentContainer: {
    marginTop: verticalScale(33),
    paddingHorizontal: scale(10),
  },
  formContainer: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    width: "100%",
  },
  formTitle: {
    fontSize: moderateScale(14),
    color: "#555555",
    marginBottom: verticalScale(10),
  },
  formTitle2: {
    fontSize: moderateScale(10),
    color: "#555555",
    fontWeight: "bold",
    marginBottom: verticalScale(30),
  },
  textInputWrapper: {
    marginLeft: verticalScale(-5),
  },
  textInputContainer: {
    borderColor: "#fff",
    margin: 0,
    height: verticalScale(120),
    alignItems: "flex-start",
  },
  bottomActions: {
    paddingHorizontal: scale(30),
  },
  formSubTitle: {
    fontSize: 10,
    color: "#AFAFAF",
    textAlign: "center",
  },
  sentContentStyle: {
    paddingHorizontal: scale(50),
    marginTop: scale(13),
  },
  supportTeamFormStyle: {
    paddingBottom: scale(22),
    justifyContent: "center",
    alignItems: "center",
  },
  btnDoneTextStyle: {
    color: Colors.white,
    fontSize: moderateScale(Fonts.size.medium),
  },
  adviceStyle: {
    marginTop: scale(10),
  },
  adviceTextStyle: {
    textAlign: "center",
    color: "#6E6969",
    fontSize: moderateScale(Fonts.size.tiny),
  },
});

export const IconSupportStyle = {
  name: "support",
  size: scale(33),
  color: "black",
};
export const btnDoneStyle = {
  color: "#25B7D3",
  textStyle: style.btnDoneTextStyle,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.16,
  shadowRadius: 6,
  elevation: 1,
};

export const titleTextStyle = {
  color: "#555555",
};

export const descriptionTextStyle = {
  color: "#555555",
  fontSize: moderateScale(10),
  fontWeight: "400",
};

export default style;
