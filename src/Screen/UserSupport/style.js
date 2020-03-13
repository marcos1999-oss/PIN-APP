import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { scale, moderateScale } from "../../Utils/scaling";

const style = StyleSheet.create({
  l_container: {
    flex: 1,
    backgroundColor: Colors.skyBlue,
  },
  l_bottom: {
    position: "absolute",
    bottom: 0,
  },
  formTitle: {
    fontSize: moderateScale(14),
    color: "#555555",
  },
  formTitle2: {
    fontSize: moderateScale(10),
    color: "#555555",
    fontWeight: "bold",
  },
  formSubTitle: {
    fontSize: moderateScale(10),
    color: "#AFAFAF",
    textAlign: "center",
  },
  sentContentStyle: {
    padding: scale(50),
    marginTop: scale(25),
  },
  supportTeamFormStyle: {
    paddingBottom: scale(50),
  },
  btnDoneTextStyle: {
    color: Colors.black,
    fontSize: Fonts.size.medium,
    fontWeight: "bold",
  },
  adviceStyle: {
    marginTop: scale(10),
  },
  adviceTextStyle: {
    textAlign: "center",
    color: Colors.white,
    fontSize: Fonts.size.tiny,
  },
});

export const IconSupportStyle = {
  name: "support",
  size: scale(33),
  color: Colors.white,
};
export const btnDoneStyle = {
  color: Colors.white,
  textStyle: style.btnDoneTextStyle,
};

export default style;
