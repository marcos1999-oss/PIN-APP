import React from "react";
import { SafeAreaView, View, Text, Dimensions, ScrollView, Keyboard } from "react-native";
import Modal from "react-native-modal";
import { TextInput, Btn, CardContainer } from "../../Components/Common";
import CustomIcon from "../../CustomIcon";
import Image from "react-native-auto-height-image";
import { city2 } from "../../Assets";
import CodeInput from "react-native-confirmation-code-field";
import { Formik } from "formik";
import { changePasswordSchema } from "./validationSchema";
import { errorMessage } from '../../Utils/alerts'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { getMe } from '../../redux/selectors/index'
import * as authActions from '../../redux/actions/authActions'

import style from "./notiAndChangePasswordStyle";
import { verticalScale, scale, moderateScale } from "../../Utils/scaling";
const deviceWidth = Dimensions.get("window").width;

class UserSettingChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      isPasswordChanged: false,
      isPasswordForgot: false,
      isUseCode: false,
      isWrongCode: false,
      isCodeVerified: false,
      isSubmitting: false,
    };
    this.validationSchema = changePasswordSchema();
  }

  form = {
    fields: {
      newPassword: "",
      cNewPassword: "",
    },
    refs: {},
  };
  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit });
  }

  onSuccessUpdate = () => {
    this.updateSavingStatus({ isSubmitting: false });
    this.setState({ isPasswordChanged: true });
  }
  updateSavingStatus({ isSubmitting }) {
    this.setState({ isSubmitting });
    this.props.navigation.setParams({ isSubmitting });
  }


  submit = () => {
    Keyboard.dismiss();
    if (this.formRef) {
      this.formRef.handleSubmit();
    }
  };
  onSubmit = (values, actions) => {

    if (this.state.isSubmitting) return;

    this.updateSavingStatus({ isSubmitting: true });
    this.props.authActions.updateAccount({
      userType: 'user',
      params: { password: values["newPassword"], password_confirmation: values["cNewPassword"] },
      onSuccess: this.onSuccessUpdate,
      onFail: (error) => {
        // errorMessage({ message: 'Error while changing password', description: error.message });
        this.updateSavingStatus({ isSubmitting: false });
        actions.setFieldError("password", error.message);
      }
    });
  };

  forgotPassword = () => {
    this.setState({ isPasswordForgot: true });
  };

  handleCode = (code) => {
    // code is string type
    if (code === "11111") {
      this.setState({ isUseCode: false });
      setTimeout(() => {
        this.setState({ isCodeVerified: true });
      }, 500);
    } else {
      this.setState({ isWrongCode: true });
    }
  };

  render() {

    const {
      isPasswordChanged,
      isPasswordForgot,
      isUseCode,
      isWrongCode,
      isCodeVerified,
    } = this.state;
    return (
      <SafeAreaView style={style.l_container}>
        <View style={{ alignItems: "center" }}>
          <CustomIcon name="setting" size={verticalScale(40)} color={"#fff"} />
        </View>
        <View
          style={{
            paddingHorizontal: scale(20),
            paddingVertical: verticalScale(20),
          }}
        >
          <CardContainer>
            <Formik
              initialValues={this.form.fields}
              onSubmit={this.onSubmit}
              validationSchema={this.validationSchema}
              ref={(ref) => this.formRef = ref}
            >
              {(props) => (
                <React.Fragment>


                  <TextInput
                    form={props}
                    value={props.values['newPassword']}
                    formKey="newPassword"
                    placeholder="New Password"
                    placeholderTextColor="#555555"
                    containerStyle={{
                      borderColor: "#fff",
                      margin: 0,
                      borderBottomWidth: 1,
                      borderBottomColor: "#eee",
                    }}
                    style={{ fontSize: moderateScale(14) }}
                    inlineValidation={true}
                    setRef={(ref) => (this.form.refs.newPassword = ref)}
                    secureTextEntry
                  />
                  <TextInput
                    form={props}
                    value={props.values['cNewPassword']}
                    formKey="cNewPassword"
                    placeholder="Repeat New Password"
                    placeholderTextColor="#555555"
                    containerStyle={{ borderColor: "#fff", margin: 0 }}
                    style={{ fontSize: moderateScale(14) }}
                    inlineValidation={true}
                    secureTextEntry
                    setRef={(ref) => (this.form.refs.cNewPassword = ref)}
                    onSubmitEditing={props.handleSubmit}
                  />
                  {props.error && (
                    <Text
                      style={{
                        fontSize: moderateScale(10),
                        color: "#FF0000",
                        textAlign: "right",
                        width: "100%",
                        paddingVertical: verticalScale(20),
                        paddingHorizontal: scale(20),
                      }}
                    >
                      {props.errors}
                    </Text>
                  )}
                  <Btn
                    transparent
                    title="Forgot your password?"
                    textStyle={{
                      fontSize: moderateScale(10),
                      color: "#2B2B2B",
                    }}
                    style={{ alignSelf: "center" }}
                    onPress={this.forgotPassword}
                  />
                </React.Fragment>
              )}
            </Formik>
          </CardContainer>
        </View>
        <Modal isVisible={isPasswordChanged} onBackButtonPress={() => {
          this.setState({ isPasswordChanged: false }, () => {
            this.props.navigation.goBack(null);
          })
        }}>
          <CardContainer style={style.cardContainer}>
            <View style={style.cardWrapper}>
              <CustomIcon
                name="confirmCircle"
                size={verticalScale(32)}
                color={"#5F92F3"}
              />
              <Text
                style={{ ...style.cardTitle, marginTop: verticalScale(10) }}
              >
                Password Changed Successfully
              </Text>
              <View style={style.actionBtnContainer}>
                <Btn
                  rounded
                  title="Close"
                  style={{
                    backgroundColor: "#5F92F3",
                    width: scale(125),
                    height: verticalScale(34),
                  }}
                  textStyle={{
                    color: "#fff",
                    textAlign: "center",
                    width: "100%",
                    fontSize: moderateScale(16),
                  }}
                  onPress={() => {

                    this.setState({ isPasswordChanged: false }, () => {
                      this.props.navigation.goBack(null);
                    });
                  }}
                />
              </View>
            </View>
          </CardContainer>
        </Modal>

        <Modal isVisible={isPasswordForgot}>
          <CardContainer style={style.cardContainer}>
            <View style={style.cardWrapper}>
              <Text
                style={{ ...style.cardTitle, marginTop: verticalScale(10) }}
              >
                Choose how you want to reset your password
              </Text>
              <View style={style.actionBtnContainer}>
                <Btn
                  rounded
                  title="Text"
                  style={{
                    backgroundColor: "#ffffff",
                    width: scale(125),
                    height: verticalScale(34),
                    borderColor: "#5F92F3",
                    borderWidth: scale(2),
                  }}
                  textStyle={{
                    color: "#5F92F3",
                    textAlign: "center",
                    width: "100%",
                    fontSize: moderateScale(14),
                    fontWeight: "600",
                  }}
                  onPress={() => {
                    this.setState({ isPasswordForgot: false });
                    setTimeout(() => {
                      this.setState({ isUseCode: true });
                    }, 500);
                  }}
                />
                <Btn
                  rounded
                  title="Email"
                  style={{
                    backgroundColor: "white",
                    width: scale(125),
                    height: verticalScale(34),
                    borderColor: "#5F92F3",
                    borderWidth: scale(2),
                    marginVertical: verticalScale(10),
                  }}
                  textStyle={{
                    color: "#5F92F3",
                    textAlign: "center",
                    width: "100%",
                    fontSize: moderateScale(14),
                    fontWeight: "600",
                  }}
                  onPress={() => {
                    this.setState({ isPasswordForgot: false });
                  }}
                />
                <Btn
                  transparent
                  title="Cancel"
                  style={{
                    paddingRight: 0,
                    width: scale(125),
                    height: verticalScale(34),
                  }}
                  textStyle={{
                    color: "#5F92F3",
                    textAlign: "center",
                    width: "100%",
                    fontSize: moderateScale(14),
                    fontWeight: "600",
                  }}
                  onPress={() => {
                    this.setState({ isPasswordForgot: false });
                  }}
                />
              </View>
            </View>
          </CardContainer>
        </Modal>

        <Modal isVisible={isUseCode}>
          <CardContainer
            style={{ width: deviceWidth - scale(112), alignSelf: "center" }}
          >
            <View style={style.cardWrapper}>
              <Text
                style={{ ...style.cardTitle, marginTop: verticalScale(10) }}
              >
                Enter the code we sent to 808 913 4023
              </Text>
              <Text
                style={{
                  ...style.cardTitle,
                  marginTop: verticalScale(10),
                  fontSize: moderateScale(14),
                }}
              >
                Enter Confirmation Code
              </Text>
              <View
                style={{
                  height: verticalScale(50),
                  paddingHorizontal: scale(20),
                  marginTop: verticalScale(10),
                }}
              >
                <CodeInput
                  onFulfill={this.handleCode}
                  autoFocus
                  variant="border-b"
                  inactiveColor="#707070"
                  activeColor="#707070"
                />
              </View>
              {isWrongCode && (
                <Text
                  style={{
                    color: "#FF0000",
                    fontSize: moderateScale(14),
                    fontWeight: "bold",
                    textAlign: "center",
                    marginVertical: verticalScale(5),
                  }}
                >
                  Wrong Code
                </Text>
              )}
              <View>
                <Btn
                  rounded
                  title="Resend"
                  style={{
                    backgroundColor: "#5F92F3",
                    width: scale(125),
                    height: verticalScale(34),
                  }}
                  textStyle={{
                    color: "#fff",
                    textAlign: "center",
                    width: "100%",
                    fontSize: moderateScale(16),
                    fontWeight: "600",
                  }}
                  onPress={() => {
                    this.setState({ isUseCode: false });
                  }}
                />
              </View>
            </View>
          </CardContainer>
        </Modal>

        <Modal isVisible={isCodeVerified}>
          <CardContainer style={style.cardContainer}>
            <View style={style.cardWrapper}>
              <CustomIcon
                name="confirm"
                size={verticalScale(32)}
                color={"#31AF91"}
              />
              <Text
                style={{
                  color: "#6E6969",
                  fontSize: moderateScale(16),
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: verticalScale(10),
                }}
              >
                Password has been changed successfully
              </Text>
              <View style={style.actionBtnContainer}>
                <Btn
                  rounded
                  title="Done"
                  style={{
                    backgroundColor: "#31AF91",
                    width: scale(125),
                    height: verticalScale(34),
                  }}
                  textStyle={{
                    color: "#fff",
                    textAlign: "center",
                    width: "100%",
                    fontSize: moderateScale(14),
                    fontWeight: "600",
                  }}
                  onPress={() => {
                    this.setState({ isCodeVerified: false });
                  }}
                />
              </View>
            </View>
          </CardContainer>
        </Modal>
        <Image style={style.l_bottom} source={city2} width={deviceWidth} />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    me: getMe(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingChangePassword);
