import React from "react";
import { Text, View, SafeAreaView, Dimensions } from "react-native";
import { Card, CardItem, Body } from "native-base";
import { Formik } from "formik";
import CustomIcon from "../../CustomIcon";
import { Btn, TextInput } from "../../Components/Common";
import { scale, moderateScale, verticalScale } from "../../Utils/scaling";
import Image from "react-native-auto-height-image";
import { city2 } from "../../Assets";
import { FormContainer } from "./Common";
import * as authActions from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as yup from "yup";
import { successMessage, errorMessage } from '../../Utils/alerts'
import { setCredentials } from '../../redux/services/api'

import style from "./style.js";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required()
    .min(6)
    .label("Password"),
  cpassword: yup
    .string()
    .required()
    .min(6)
    .oneOf([yup.ref("password")], "Passwords must match", function (value) {
      return this.parent.password === value;
    })
    .label("Repeat Password"),
});


class ForgotPasswordForm extends React.Component {
  form = {
    fields: {
      password: '',
      cpassword: '',
    },
    refs: {},
  };

  state = {
    isLoading: false,
  };

  onSubmit = (values, _actions) => {
    this.setState({ isLoading: true });

    // TODO, everywhere this param is set (ie: isUserLoginForm), replace with a proper store/redux solution
    const isUserLoginForm = this.props.navigation.getParam(
      "isUserLoginForm",
      false
    );

    const userType = isUserLoginForm ? 'user' : 'business';
    const token = this.props.navigation.getParam('token');
    const password = values['password'];

    this.props.authActions.resetPasswordSave({
      userType,
      token,
      password,
      onSuccess: (access_token, client, uid) => {
        this.setState({ isLoading: false });

        const { navigation } = this.props;

        setCredentials(access_token, client, uid);

        this.props.authActions.fetchMe({
          userType,
          onSuccess: (response) => {
            // TODO, review. this call should be on Saga?
            this.props.authActions.signInSuccess({ response, access_token, client, uid });

            if (userType === 'user') {
              navigation.navigate('User');
            } else {
              navigation.navigate('Business');
            }
          },
          onFail: (error) => {
            errorMessage({ message: 'Error fetching user information', description: error.message });

            this.props.authActions.signOut({
              onSuccess: () => {
                navigation.navigate('Login');
              },
              onFail: (error) => {
                errorMessage({ message: 'Sign out failed', description: error.message });
              }
            });
          }
        });
      }, onFail: (error) => {
        this.setState({ isLoading: false });
        errorMessage({ message: 'Error when changing the password', description: error.errorMessage });
      }
    });
  };

  render() {
    const deviceWidth = Dimensions.get("window").width;
    const { isLoading } = this.state;

    return (
      <SafeAreaView style={style.l_container}>
        <View style={{ marginTop: 5, alignItems: "center", marginBottom: 15 }}>
          <CustomIcon name="setting" size={40} color={"#fff"} />
        </View>

        <React.Fragment>
          <Card style={{ borderRadius: verticalScale(7), }}>
            <CardItem style={{ borderRadius: verticalScale(7), }}>
              <Body>
                <Formik onSubmit={this.onSubmit} validationSchema={validationSchema} initialValues={this.form.fields}>
                  {(props) => (
                    <React.Fragment>
                      <TextInput
                        style={style.fontSize14}
                        secureTextEntry
                        form={props}
                        formKey="password"
                        value={props.values.password}
                        placeholder="Password"
                        setRef={(ref) => (this.form.refs.password = ref)}
                        onSubmitEditing={() =>
                          this.form.refs.cpassword._root.focus()
                        }
                      />
                      <TextInput
                        style={style.fontSize14}
                        secureTextEntry
                        form={props}
                        formKey="cpassword"
                        value={props.values.cpassword}
                        placeholder="Repeat Password"
                        setRef={(ref) => (this.form.refs.cpassword = ref)}
                        onSubmitEditing={props.handleSubmit}
                      />
                      <Text style={style.error}>
                        {props.errors && props.errors[Object.keys(props.errors)[0]]}
                      </Text>
                      <Btn
                        block
                        rounded
                        title="Save"
                        disabled={isLoading}
                        isLoading={isLoading}
                        onPress={props.handleSubmit}
                        style={{ color: '#25B7D3' }}
                        textColor='white'
                        textStyle={{ fontSize: moderateScale(14), fontWeight: "bold" }}
                      />
                    </React.Fragment>
                  )}
                </Formik>
              </Body>
            </CardItem>
          </Card>
        </React.Fragment>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);
