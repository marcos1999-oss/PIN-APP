import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CodeInput from "react-native-confirmation-code-field";
import { scale } from "../../Utils/scaling";
import { Colors } from "../../Themes";
import { Btn } from "../../Components/Common";

class SmsValidate extends React.Component {
  state = {
    isWrongCode: false,
  };

  handleCode = (code) => {
    // console.log(typeof code);
    // if (code == '11111') {
    //   this.setState({ isUseCode: false })
    //   setTimeout(() => { this.setState({ isCodeVerified: true }) }, 500)
    // } else { this.setState({ isWrongCode: true }) }
  };

  onPressCancel = () => {
    this.props.navigation.navigate("Login");
  };
  onPressConfirm = () => {};

  render() {
    const { isWrongCode } = this.state;

    return (
      <View
        style={{ flex: 1, paddingLeft: scale(20), paddingRight: scale(20) }}
      >
        <View style={{ marginBottom: scale(250), marginTop: scale(100) }}>
          <View style={{ marginBottom: scale(50) }}>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: scale(20),
              }}
            >
              Confirm your phone number
            </Text>
            <Text>
              Check your phone for the text containing the 4-digit verification
              number, and insert it below.
            </Text>
          </View>
          <CodeInput
            autoFocus
            codeLength={4}
            onFulfill={this.handleCode}
            variant="border-b"
            inactiveColor="#707070"
            activeColor="#707070"
          />
          {isWrongCode && (
            <Text
              style={{
                color: "#FF0000",
                fontSize: 14,
                fontWeight: "bold",
                textAlign: "center",
                marginVertical: 5,
              }}
            >
              Wrong Code
            </Text>
          )}
        </View>
        <View style={{ alignItems: "center", marginBottom: scale(50) }}>
          <Btn
            block
            rounded
            title="Confirm"
            color={Colors.btnBusinessBackground}
            onPress={this.onPressConfirm}
            {...btnSignUpStyle}
          />
          <View style={{ alignItems: "center" }}>
            <Btn
              transparent
              title="Cancel Registration"
              onPress={this.onPressCancel}
              {...btnLoginStyle}
            />
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    padding: scale(20),
  },
  viewHeight20: {
    height: scale(20),
  },
  viewHeight40: {
    height: scale(40),
  },
  btnLoginPreTextStyle: {
    fontSize: scale(12),
    color: Colors.black,
  },
  btnLoginStyle: {
    alignSelf: "center",
  },
  btnLoginTextStyle: {
    fontSize: scale(12),
    fontWeight: "bold",
  },
  btnSignupTextStyle: {
    fontSize: scale(12),
  },
});
const btnLoginStyle = {
  textColor: Colors.black,
  preTextStyle: style.btnLoginPreTextStyle,
  style: style.btnLoginStyle,
  textStyle: style.btnLoginTextStyle,
};
const btnSignUpStyle = {
  style: style.container,
  textColor: Colors.white,
  textStyle: style.btnSignupTextStyle,
};

export default SmsValidate;
