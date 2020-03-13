import React, { Component, Fragment } from "react";
import { View, Text } from "react-native";
import { Card, CardItem, Body } from "native-base";
import { Formik } from "formik";
import { moderateScale } from "../../Utils/scaling";

import {
  userValidationSchema,
  businessValidationSchema
} from "./validationSchema";
import { TextInput, Btn } from "../Common";
import style, {
  btnRegisterStype,
  btnUserLoginStyle,
  btnSwitchLoginStyle,
  btnBusinessLoginStyle,
  btnForgotPasswordStyle,
  btnFacebookRegisterStyle,
} from "./style";
import { showMessage } from "react-native-flash-message";

class LoginFormComponent extends Component {
  form = {
    fields: {
      email: '',
      password: '',
    },
    refs: {},
  };

  onSubmit = (values, actions) => {
    const { type } = this.props;
    this.props.onSignIn(
      type,
      values['email'],
      values['password'],
      (error) => {
        actions.setFieldError('email', error.errorMessage);
      });
  };

  //   actions.setSubmitting(true);
  //   const { dispatch, type, navigation } = this.props;
  //   dispatch({
  //     type: CALL_LOGIN,
  //     payload: values,
  //     cb: (resp, error) => {
  //       if (error) {
  //         return actions.setFieldError("main", error);
  //       }
  //       actions.setSubmitting(false);
  //       showMessage({
  //         message: "Login success",
  //         type: "success",
  //       });
  //       return type === "user"
  //         ? navigation.navigate("User")
  //         : navigation.navigate("Business");
  //     },
  //   });
  // };

  render() {
    const {
      type,
      isFront,
      onSwitchLogin,
      onForgotPassword,
      onShowSignupScreen,
      onFacebookRegister,
      isLoading,
    } = this.props;
    const btnLoginStyle = (type === 'user') ? btnUserLoginStyle : btnBusinessLoginStyle;

    return (
      <Card style={style.boderCard}>
        <CardItem style={style.boderCard}>
          <Body>
            <Formik
              onSubmit={this.onSubmit}
              validationSchema={type === 'user' ? userValidationSchema : businessValidationSchema}
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={this.form.fields}
            >
              {(props) => (
                <Fragment>
                  <TextInput
                    style={style.fontSize14}
                    form={props}
                    formKey="email"
                    value={props.values.email}
                    placeholder={
                      type === "user" ? "Username or Email" : "Email"
                    }
                    keyboardType="email-address"
                    setRef={(ref) => (this.form.refs.email = ref)}
                    onSubmitEditing={() =>
                      this.form.refs.password._root.focus()
                    }
                  />
                  <TextInput
                    style={style.fontSize14}
                    secureTextEntry
                    form={props}
                    formKey="password"
                    value={props.values.password}
                    placeholder="Password"
                    setRef={(ref) => (this.form.refs.password = ref)}
                    onSubmitEditing={props.handleSubmit}
                  />
                  <Text style={style.error}>
                    {props.errors && props.errors[Object.keys(props.errors)[0]]}
                  </Text>
                  <Btn
                    small
                    transparent
                    title="Forgot your password?"
                    onPress={() => onForgotPassword(props.values['email'])}
                    {...btnForgotPasswordStyle}
                    textStyle={{ fontWeight: '300', fontSize: moderateScale(13) }}
                  />
                  <Btn
                    block
                    rounded
                    title="Log In"
                    disabled={isLoading}
                    isLoading={isLoading}
                    onPress={props.handleSubmit}
                    {...btnLoginStyle}
                    textStyle={{ fontWeight: 'normal' }}
                  />
                </Fragment>
              )}
            </Formik>
            <View style={{ alignItems: 'center', width: '100%', left: 7 }}>
              <Btn
                transparent
                title="Register Now"
                onPress={onShowSignupScreen}
                {...btnRegisterStype}
              />
              <Btn
                transparent
                title={type === "user" ? "Login with Facebook" : ""}
                disabled={type !== "user"}
                onPress={onFacebookRegister}
                {...btnFacebookRegisterStyle}
              />
            </View>
            {!isFront && (
              <Btn
                block
                transparent
                title={type === "user" ? "User Login" : "Business Login"}
                onPress={onSwitchLogin}
                {...btnSwitchLoginStyle}
              />
            )}
          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default LoginFormComponent;
