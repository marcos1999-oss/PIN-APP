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
import { successMessage, errorMessage } from '../../Utils/alerts';
import { Colors, Fonts } from "../../Themes";


/*Style*/
import style from "./style.js";
import { moderateScale } from "../../Utils/scaling";
const countryCode = "800";
const networkProvider = "923";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .label("Email"),
});


class ForgotPassword extends React.Component {
  form = {
    fields: {
      email: this.props.navigation.getParam('email', ''),
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
    const email = values['email'];

    this.props.authActions.resetPassword({
      email,
      userType,
      onSuccess: () => {
        this.setState({ isLoading: false });
        this.props.navigation.navigate('ForgotPasswordToken', { isUserLoginForm });
        successMessage({ message: "Successfully sent email ." })
      }, onFail: (error) => {
        this.setState({ isLoading: false });
        errorMessage({ message: 'Error when sending the email', description: error.errorMessage });
      }
    });
  };

  goToNextScreen = () => {
    const isUserLoginForm = this.props.navigation.getParam(
      "isUserLoginForm",
      false
    );

    this.props.navigation.navigate('ForgotPasswordToken', { isUserLoginForm });
  };

  render() {
    const deviceWidth = Dimensions.get("window").width;
    const { isLoading } = this.state;

    return (
      <SafeAreaView style={style.l_container}>
        <View style={{ marginTop: 5, alignItems: "center", marginBottom: 15 }}>
          <CustomIcon name="setting" size={40} color={"#fff"} />
        </View>

        <Formik
          onSubmit={this.onSubmit}
          validationSchema={validationSchema}
          initialValues={this.form.fields}
        >
          {(props) => (
            <React.Fragment>
              <FormContainer>
                <Text style={style.formTitle}>Email</Text>
                <View style={{ height: 5 }} />
                <View style={{ marginLeft: -5 }}>
                  <TextInput
                    style={{ fontSize: 16 }}
                    placeholder="example@email.com"
                    placeholderTextColor="#AFAFAF"
                    containerStyle={{ borderColor: "#fff", margin: 0 }}
                    inlineValidation={true}
                    form={props}
                    formKey="email"
                    value={props.values['email']}
                    setRef={(ref) => (this.form.refs.email = ref)}
                    onSubmitEditing={props.handleSubmit}
                  />
                </View>

                <Text style={style.formSubTitle} >
                  Please, enter your email id and you will receive an email with a link to reset
                  your password.
                </Text>
              </FormContainer>

              <Image style={style.l_bottom} source={city2} width={deviceWidth} />

              <View style={{ marginLeft: 20, marginRight: 20, marginTop: 50 }}>
                <Btn
                  color={'#FFFFFF'}
                  textColor={Colors.skyBlue}
                  block
                  rounded
                  disabled={isLoading}
                  isLoading={isLoading}
                  loadingColor={"rgba(19, 125, 145, 0.9)"}
                  title="Continue"
                  onPress={props.handleSubmit}
                />

                <Btn
                  small
                  transparent
                  title="I already have a code"
                  textColor="white"
                  style={{ marginTop: 20, alignSelf: 'center' }}
                  onPress={this.goToNextScreen}
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
