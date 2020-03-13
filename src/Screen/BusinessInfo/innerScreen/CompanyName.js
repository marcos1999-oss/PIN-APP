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


export default class CompanyName extends React.Component {
  state = {
    isSubmitting: false,
  };

  form = {
    companyId: this.props.navigation.getParam('me').company_id,
    companyName: this.props.navigation.getParam('me').company_name,
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
        name: values['companyName'],
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
        actions.setFieldError('companyName', get(error, 'response.data.errors.full_messages.0'));
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
                <Text style={style.formTitle}>Company Name</Text>
                <View
                  style={{marginLeft: scale(-5), marginTop: verticalScale(10)}}
                >
                  <TextInput
                    form={props}
                    formKey="companyName"
                    value={props.values.companyName}
                    placeholder="Write your company’s name"
                    placeholderTextColor="#AFAFAF"
                    containerStyle={{borderColor: "#fff", margin: 0}}
                    style={{fontSize: moderateScale(16)}}
                    setRef={() => {}}
                    autoCapitalize="words"
                  />
                  <Text style={style.error}>
                    {props.errors && props.errors.companyName}
                  </Text>
                </View>

                <View style={{height: verticalScale(100)}}/>

                <Text style={style.formSubTitle}>
                  Every Ad that you create will show {"\n"}company name and
                  profile picture
                </Text>
              </FormContainer>
            </React.Fragment>
          )}
        </Formik>
      </SafeAreaView>
    );
  }
};
