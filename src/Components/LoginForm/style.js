import { StyleSheet } from "react-native";
import { scale, moderateScale, verticalScale } from "../../Utils/scaling";
import { Colors } from "../../Themes";

const style = StyleSheet.create({
  input: {
    fontSize: moderateScale(10),
  },
  error: {
    color: Colors.error,
    fontSize: moderateScale(8),
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(5),
  },
  boderCard: {
    borderRadius: verticalScale(7),
  },
  viewHeight: {
    height: verticalScale(20),
  },
  btnTextStyle: {
    color: Colors.black,
    fontSize: moderateScale(8),
    textAlign: "right",
  },
  btnLoginTextStyle: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
  btnForgotPasswordStyle: {
    marginTop: verticalScale(-20),
    alignSelf: "flex-end",
    marginBottom: verticalScale(20),
  },
  btnForgotPasswordTextStyle: {
    color: Colors.black,
    fontSize: moderateScale(12),
    textAlign: "right",
  },
  btnRegisterTextStyle: {
    fontSize: moderateScale(12),
    fontWeight: "bold",
  },
  btnRegisterStyle: {
    alignSelf: "center",
  },
  btnFacebookRegisterTextStyle: {
    fontSize: moderateScale(12),
    fontWeight: "bold",
    color: Colors.text,
  },
  btnSwitchLoginStyle: {
    top: verticalScale(10),
  },
  btnSwitchLoginTextStyle: {
    fontSize: moderateScale(18),
  },
  fontSize14: {
    fontSize: moderateScale(14),
  },
});

export const btnBusinessLoginStyle = {
  color: Colors.skyBlue,
  textColor: Colors.white,
  textStyle: style.btnLoginTextStyle,
};
export const btnUserLoginStyle = {
  ...btnBusinessLoginStyle,
  color: Colors.skyBlue,
};
export const btnForgotPasswordStyle = {
  textColor: Colors.black,
  style: style.btnForgotPasswordStyle,
  textStyle: style.btnRegisterTextStyle,
};
export const btnRegisterStype = {
  textColor: Colors.black,
  style: style.btnRegisterStyle,
  textStyle: style.btnRegisterTextStyle,
};
export const btnFacebookRegisterStyle = {
  textColor: Colors.text,
  style: style.btnRegisterStyle,
  textStyle: style.btnFacebookRegisterTextStyle,
};
export const btnSwitchLoginStyle = {
  textColor: Colors.black,
  style: style.btnSwitchLoginStyle,
  textStyle: style.btnSwitchLoginTextStyle,
};

export default style;
