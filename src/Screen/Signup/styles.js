import {StyleSheet} from "react-native";
import {moderateScale, scale, verticalScale} from "../../Utils/scaling";
import {Colors} from "../../Themes";

const style = StyleSheet.create({
    container: {
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(20),
    },
    formContainer: {
        height: verticalScale(60),
    },
    viewHeight20: {
        height: verticalScale(20),
    },
    viewHeight40: {
        height: verticalScale(40),
    },
    btnLoginPreTextStyle: {
        fontSize: moderateScale(12),
        color: Colors.black,
    },
    btnLoginStyle: {
        alignSelf: "center",
    },
    btnLoginTextStyle: {
        fontSize: moderateScale(12),
        fontWeight: "bold",
    },
    btnSignupTextStyle: {
        fontSize: moderateScale(12),
    },
});
export const btnLoginStyle = {
    textColor: Colors.black,
    preTextStyle: style.btnLoginPreTextStyle,
    style: style.btnLoginStyle,
    textStyle: style.btnLoginTextStyle,
};
export const btnSignUpStyle = {
    textColor: Colors.white,
    textStyle: style.btnSignupTextStyle,
};

export default style;