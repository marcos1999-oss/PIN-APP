import React from "react";
import { SafeAreaView, View, Text, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { TextInput, Btn, CardContainer } from "../../Components/Common";
import CustomIcon from "../../CustomIcon";
import Image from "react-native-auto-height-image";
import { city2 } from "../../Assets";
import { Formik } from "formik";
import validation from "./validationSchema";

import style from "./style";
import { verticalScale, scale, moderateScale } from "../../Utils/scaling";

class BusinessSettingChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordChanged: false,
    };
    this.validationSchema = validation();
  }

  form = {
    fields: {
      currentPassword: "",
      newPassword: "",
      cNewPassword: "",
    },
  };
  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit });
  }

  submit = (values, actions) => {
    this.setState({ isPasswordChanged: true });
  };

  render() {
    const deviceWidth = Dimensions.get("window").width;
    const { isPasswordChanged } = this.state;
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
              onSubmit={this.submit}
              validationSchema={this.validationSchema}
            >
              {props => (
                <React.Fragment>
                  <TextInput
                    form={props}
                    formKey="currentPassword"
                    placeholder="Current Password"
                    placeholderTextColor="#555555"
                    containerStyle={{
                      borderColor: "#fff",
                      margin: 0,
                      borderBottomWidth: 1,
                      borderBottomColor: "#eee",
                    }}
                    style={{ fontSize: moderateScale(14) }}
                    inlineValidation={true}
                    setRef={ref => (this.form.fields.currentPassword = ref)}
                    secureTextEntry
                  />
                  <TextInput
                    form={props}
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
                    setRef={ref => (this.form.fields.newPassword = ref)}
                    secureTextEntry
                  />
                  <TextInput
                    form={props}
                    formKey="cNewPassword"
                    placeholder="Repeat New Password"
                    placeholderTextColor="#555555"
                    containerStyle={{ borderColor: "#fff", margin: 0 }}
                    style={{ fontSize: moderateScale(14) }}
                    inlineValidation={true}
                    setRef={ref => (this.form.fields.cNewPassword = ref)}
                    secureTextEntry
                  // onSubmitEditing={props.handleSubmit}
                  />
                  {/* <Text
                    style={{
                      fontSize: moderateScale(10),
                      color: "#FF0000",
                      textAlign: "right",
                      width: "100%",
                      paddingHorizontal: scale(20),
                      paddingVertical: verticalScale(20),
                    }}
                  >
                    Wrong Username or Password
                  </Text>
                  <Btn
                    transparent
                    title="Forgot your password?"
                    textStyle={{
                      fontSize: moderateScale(10),
                      color: "#2B2B2B",
                    }}
                    style={{ alignSelf: "center" }}
                  /> */}
                </React.Fragment>
              )}
            </Formik>
          </CardContainer>
        </View>
        <Modal isVisible={isPasswordChanged}>
          <CardContainer style={style.cardContainer}>
            <View style={{ ...style.cardWrapper, alignSelf: "center" }}>
              <CustomIcon
                name="confirmCircle"
                size={verticalScale(32)}
                color={"#2BB673"}
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
                Password Changed Successfully
              </Text>
              <View style={{ height: 10 }} />
              <View>
                <Btn
                  rounded
                  title="Close"
                  style={{
                    backgroundColor: "#2BB673",
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
                    this.setState({ isPasswordChanged: false });
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

export default BusinessSettingChangePassword;
