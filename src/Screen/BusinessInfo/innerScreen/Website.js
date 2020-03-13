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

export default class CompanyWebsite extends React.Component {
  state = {
    isSubmitting: false,
  };

  form = {
    companyId: this.props.navigation.getParam('me').company_id,
    companyWebsite: this.props.navigation.getParam('me').company_website,
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
        website: values['companyWebsite'],
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
        actions.setFieldError('companyWebsite', get(error, 'response.data.errors.full_messages.0'));
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
                <Text style={style.formTitle}>Website</Text>
                <View
                  style={{marginLeft: scale(-5), marginTop: verticalScale(5)}}
                >
                  <TextInput
                    form={props}
                    formKey="companyWebsite"
                    value={props.values.companyWebsite}
                    placeholder="Write your company’s website"
                    placeholderTextColor="#AFAFAF"
                    containerStyle={{borderColor: "#fff", margin: 0}}
                    style={{fontSize: moderateScale(16)}}
                    setRef={() => {}}
                  />
                  <Text style={style.error}>
                    {props.errors && props.errors.companyWebsite}
                  </Text>
                </View>
                <View style={{height: verticalScale(100)}}/>
                <Text style={style.formSubTitle}>
                  example.com {"\n"} Allow users to visit your website
                </Text>
              </FormContainer>
            </React.Fragment>
          )}
        </Formik>
      </SafeAreaView>
    );
  }
};
