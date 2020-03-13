import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import { Formik } from "formik";
import { get } from 'lodash';
import validationSchema from "../validationSchema";
import { TextInput } from "../../../Components/Common";
import { FormContainer } from "../Common";

/*Style*/
import style from "../style.js";
import { scale, verticalScale, moderateScale } from "../../../Utils/scaling";

export default class CompanyEmail extends React.Component {
  state = {
    isSubmitting: false,
  };

  form = {
    companyEmail: this.props.navigation.getParam('me').email,
  };

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit });
  }

  updateSavingStatus({ isSubmitting }) {
    this.setState({ isSubmitting });
    this.props.navigation.setParams({ isSubmitting });
  }

  submit = () => {
    if (this.formRef) {
      this.formRef.handleSubmit();
    }
  };

  onSubmit = (values, actions) => {
    if (this.state.isSubmitting) return;

    this.updateSavingStatus({ isSubmitting: true });

    const params = {
      email: values['companyEmail'],
    };

    this.props.navigation.getParam('authActions').updateAccount({
      userType: 'business',
      params,
      onSuccess: () => {
        this.updateSavingStatus({ isSubmitting: false });
        this.props.navigation.goBack();
      },
      onFail: (error) => {
        actions.setFieldError('companyEmail', get(error, 'response.data.errors.full_messages.0'));
        this.updateSavingStatus({ isSubmitting: false });
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={style.l_container}>
        <Formik onSubmit={this.onSubmit} initialValues={this.form} ref={(ref) => this.formRef = ref}>
          {props => (
            <React.Fragment>
              <FormContainer>
                <Text style={style.formTitle}>Email</Text>
                <View
                  style={{marginLeft: scale(-5), marginTop: verticalScale(10)}}
                >
                  <TextInput
                    form={props}
                    formKey="companyEmail"
                    value={props.values.companyEmail}
                    placeholder="Company’s email address"
                    placeholderTextColor="#AFAFAF"
                    containerStyle={{borderColor: "#fff", margin: 0}}
                    style={{fontSize: moderateScale(16)}}
                    setRef={() => {}}
                  />
                  <Text style={style.error}>
                    {props.errors && props.errors.companyEmail}
                  </Text>
                </View>
                <View style={{height: verticalScale(100)}}/>
                <Text style={style.formSubTitle}>example@email.com</Text>
              </FormContainer>
            </React.Fragment>
          )}
        </Formik>
      </SafeAreaView>
    );
  }
};
