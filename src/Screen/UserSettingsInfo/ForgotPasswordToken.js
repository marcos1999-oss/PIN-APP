import React from "react";
import { Text, View, SafeAreaView, Dimensions } from "react-native";
import { Formik } from "formik";
import CustomIcon from "../../CustomIcon";
import { Btn, TextInput } from "../../Components/Common";
import Image from "react-native-auto-height-image";
import { city2 } from "../../Assets";
import { FormContainer } from "./Common";
import * as authActions from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as yup from "yup";
import { successMessage, errorMessage } from '../../Utils/alerts'

import style from "./style.js";

const validationSchema = yup.object().shape({
  token: yup
    .string()
    .required()
    .label("Code"),
});


class ForgotPasswordToken extends React.Component {
  form = {
    fields: {
      token: '',
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
    const token = values['token'];

    this.props.authActions.resetPasswordVerify({
      userType,
      token,
      onSuccess: () => {
        this.setState({ isLoading: false });
        this.props.navigation.navigate('ForgotPasswordForm', { isUserLoginForm, token });
      }, onFail: (error) => {
        this.setState({ isLoading: false });
        errorMessage({ message: 'Error when sending the code', description: error.errorMessage });
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

        <Formik onSubmit={this.onSubmit} validationSchema={validationSchema} initialValues={this.form.fields}>
          {(props) => (
            <React.Fragment>
              <FormContainer>
                <Text style={style.formTitle}>Code</Text>
                <View style={{ height: 5 }} />
                <View style={{ marginLeft: -5 }}>
                  <TextInput
                    style={{ fontSize: 16 }}
                    placeholder="123456"
                    placeholderTextColor="#AFAFAF"
                    containerStyle={{ borderColor: "#fff", margin: 0 }}
                    inlineValidation={true}
                    form={props}
                    formKey="token"
                    value={props.values.token}
                    setRef={(ref) => (this.form.refs.token = ref)}
                    onSubmitEditing={props.handleSubmit}
                  />
                </View>

                <Text style={style.formSubTitle} >
                  Please, enter the code your received on your email.
                </Text>
              </FormContainer>

              <Image style={style.l_bottom} source={city2} width={deviceWidth} />

              <View style={{ marginLeft: 20, marginRight: 20, marginTop: 50 }}>
                <Btn
                  color={'#FFFFFF'}
                  textColor={"#5F92F3"}
                  block
                  rounded
                  disabled={isLoading}
                  isLoading={isLoading}
                  loadingColor={"rgba(19, 125, 145, 0.9)"}
                  title="Continue"
                  onPress={props.handleSubmit}
                />
              </View>
            </React.Fragment>
          )}
        </Formik>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordToken);
