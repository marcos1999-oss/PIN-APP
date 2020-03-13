import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import { Formik } from "formik";
import { get } from 'lodash';
import validationSchema from "../validationSchema";
import { TextInput } from "../../../Components/Common";
import { FormContainer } from "../Common";

/*Style*/
import style from "../style.js";
import { verticalScale, scale, moderateScale } from "../../../Utils/scaling";

export default class CompanyAboutUs extends React.Component {
  state = {
    isSubmitting: false,
  };

  form = {
    companyId: this.props.navigation.getParam('me').company_id,
    companyAbout: this.props.navigation.getParam('me').company_about,
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
      owned_firm_attributes: {
        id: this.form.companyId,
        about: values['companyAbout'],
      }
    };

    this.props.navigation.getParam('authActions').updateAccount({
      userType: 'business',
      params,
      onSuccess: () => {
        this.updateSavingStatus({ isSubmitting: false });
        this.props.navigation.goBack();
      },
      onFail: (error) => {
        actions.setFieldError('companyAbout', get(error, 'response.data.errors.full_messages.0'));
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
                <Text style={style.formTitle}>Company’s About Us</Text>
                <View style={{height: verticalScale(5)}}/>
                <Text style={style.formTitle2}>
                  Let people know about your company
                </Text>
                <View style={{height: verticalScale(10)}}/>
                <View style={{marginLeft: scale(-5)}}>
                  <TextInput
                    form={props}
                    formKey="companyAbout"
                    value={props.values.companyAbout}
                    placeholder="Describe your company in a few words…"
                    placeholderTextColor="#AFAFAF"
                    containerStyle={{borderColor: "#fff", margin: 0}}
                    style={{fontSize: moderateScale(16)}}
                    multiline={true}
                    setRef={() => {}}
                  />
                  <Text style={style.error}>
                    {props.errors && props.errors.companyAbout}
                  </Text>
                </View>
                <View style={{height: verticalScale(100)}}/>
                <Text style={style.formSubTitle}>
                  Every AD created will have “About Us” Section.
                </Text>
              </FormContainer>
            </React.Fragment>
          )}
        </Formik>
      </SafeAreaView>
    );
  }
};
