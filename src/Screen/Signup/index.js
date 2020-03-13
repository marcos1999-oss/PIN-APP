import React, { Component, Fragment } from "react";
import { StyleSheet, View, ScrollView, Platform } from "react-native";
import { Container } from "native-base";
import { Formik } from "formik";
import moment from "moment";
import { get } from "lodash";
import { scale, verticalScale, moderateScale } from "../../Utils/scaling";
import { Colors } from "../../Themes";
import { TextInput, DateInput, Btn } from "../../Components/Common";
import {
  userValidationSchema,
  businessValidationSchema
} from "./validation";
import CustomIcon from "../../CustomIcon";
import style, { btnLoginStyle, btnSignUpStyle } from './styles';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { showMessage } from "react-native-flash-message";

import { getMe } from '../../redux/selectors/index'
import * as authActions from '../../redux/actions/authActions'


class SignupScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Sign Up",
      headerStyle: {
        borderBottomWidth: 0,
        height: verticalScale(60),
        elevation: 0,
        shadowOpacity: 0
      },

      headerTitleStyle: {
        fontSize: moderateScale(13),
        fontWeight: "bold",
        fontFamily: "Helvetica",
      },
      headerRight: <View />,
      headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: 12 }} color={"black"} />,
    };
  };

  state = {
    isLoading: false,
  };

  form = {
    fields: {
      cname: "",
      username: "",
      email: "",
      dob: "",
      password: "",
      cpassword: "",
      company_phone_number: '',
    },
    refs: {},
  };

  onSignUpSuccess = (data) => {
    const { navigation } = this.props;

    this.setState({ isLoading: false });

    // return this.state.userType === 'user'
    //   ? navigation.navigate('User')
    //   : navigation.navigate('Business');

    return navigation.navigate('Login');
  };

  onSignUpFail = (error, actions) => {
    this.setState({ isLoading: false });

    const errors = get(error, 'response.data.errors', {});

    actions.setErrors({
      email: errors['email'],
      password: errors['password'],
      username: errors['username'],
      dob: errors['birthday'],
      cname: errors['company_name'],
      company_phone_number: errors['company_phone_number'],
    });
  };

  onSignUp = (values, actions) => {
    const isUserLoginForm = this.props.navigation.getParam(
      'isUserLoginForm',
      false
    );
    const type = isUserLoginForm ? 'user' : 'business';

    const params = type === 'user' ? {
      type: type,
      email: values['email'],
      password: values['password'],
      username: values['username'],
      birthday: moment(values['dob']).format('YYYY-MM-DD'),
    } : {
        type: type,
        email: values['email'],
        password: values['password'],
        company_name: values['cname'],
        company_phone_number: values['company_phone_number'],
      };

    this.setState({ isLoading: true, userType: type }, () => {
      this.props.authActions.signUp({
        params: params,
        onSuccess: this.onSignUpSuccess,
        onFail: (error) => this.onSignUpFail(error, actions),
      });
    });

    // actions.setSubmitting(true);
    // const isUserLoginForm = this.props.navigation.getParam(
    //   "isUserLoginForm",
    //   false
    // );
    //
    // this.props.actions.signUp.login({ email: 'business15523@gmail.com',
    //   password: '12345678' },
    //     this.onSuccess, this.onError)

    // if (isUserLoginForm) {
    //   this.props.navigation.navigate("User");
    // } else {
    //   this.props.navigation.navigate("Business");
    // }

    // call signup
    // onSignUp(values)
    //   .then(() => alert('Registration Success'))
    //   .catch(error => actions.setFieldError('main', error.message))
    //   .finally(() => actions.setSubmitting(false));
  };

  render() {
    const isUserLoginForm = this.props.navigation.getParam(
      "isUserLoginForm",
      false
    );

    const {
      isLoading
    } = this.state;

    return (
      <Container>
        <ScrollView>
          <View style={style.container}>
            <Formik
              initialValues={this.form.fields}
              onSubmit={this.onSignUp}
              validationSchema={isUserLoginForm ? userValidationSchema : businessValidationSchema}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {(props) => (
                <Fragment>
                  {isUserLoginForm ? (
                    <TextInput
                      style={{ color: "black", fontSize: moderateScale(12) }}
                      placeholder="Username"
                      containerStyle={style.formContainer}
                      inlineValidation={true}
                      form={props}
                      formKey="username"
                      value={props.values}
                      setRef={(ref) => (this.form.refs.username = ref)}
                      onSubmitEditing={() =>
                        this.form.refs.email._root.focus()
                      }
                    />
                  ) : (
                      <TextInput
                        placeholder="Company Name"
                        form={props}
                        containerStyle={style.formContainer}
                        value={props.values}
                        formKey="cname"
                        setRef={(ref) => (this.form.refs.cname = ref)}
                        inlineValidation={true}
                        onSubmitEditing={() =>
                          this.form.refs.email._root.focus()
                        }
                      />
                    )}

                  <TextInput
                    placeholder="Email"
                    inlineValidation={true}
                    form={props}
                    containerStyle={style.formContainer}
                    formKey="email"
                    value={props.values}
                    setRef={(ref) => (this.form.refs.email = ref)}
                    onSubmitEditing={() =>
                      this.form.refs.password._root.focus()
                    }
                  />

                  {isUserLoginForm && (
                    <DateInput
                      form={props}
                      formKey="dob"
                      value={props.values}
                      placeholder="Birthday"
                      format="YYYY-MM-DD"
                      containerStyle={style.formContainer}
                      inlineValidation={true}
                      setRef={(ref) => (this.form.refs.dob = ref)}
                    />
                  )}

                  <TextInput
                    placeholder="Password"
                    inlineValidation={true}
                    secureTextEntry
                    form={props}
                    containerStyle={style.formContainer}
                    formKey="password"
                    value={props.values}
                    setRef={(ref) => (this.form.refs.password = ref)}
                    onSubmitEditing={() =>
                      this.form.refs.cpassword._root.focus()
                    }
                  />
                  <TextInput
                    placeholder="Repeat Password"
                    inlineValidation={true}
                    secureTextEntry
                    form={props}
                    containerStyle={style.formContainer}
                    formKey="cpassword"
                    value={props.values}
                    setRef={(ref) => (this.form.refs.cpassword = ref)}
                    onSubmitEditing={() => {
                      if (isUserLoginForm) {
                        props.handleSubmit();
                      } else {
                        this.form.refs.company_phone_number._root.focus()
                      }
                    }}
                  />

                  {!isUserLoginForm && (
                    <TextInput
                      placeholder="Phone Number"
                      form={props}
                      containerStyle={style.formContainer}
                      value={props.values}
                      formKey="company_phone_number"
                      setRef={(ref) => (this.form.refs.company_phone_number = ref)}
                      inlineValidation={true}
                      onSubmitEditing={props.handleSubmit}
                      keyboardType={'numeric'}
                    />
                  )}

                  <View style={style.viewHeight40} />

                  <Btn
                    block
                    rounded
                    disabled={isLoading}
                    isLoading={isLoading}
                    title="Sign Up"
                    color={Colors.skyBlue}
                    onPress={props.handleSubmit}
                    {...btnSignUpStyle}
                    style={{ backgroundColor: "" }}

                  />
                </Fragment>
              )}
            </Formik>

            <View style={style.viewHeight20} />

            <View style={{ alignItems: "center" }}>
              <Btn
                transparent
                title="Log In"
                preText="Not the first time here? &nbsp;&nbsp;"
                onPress={() => this.props.navigation.goBack()}
                {...btnLoginStyle}
              />
            </View>
          </View>
        </ScrollView>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
