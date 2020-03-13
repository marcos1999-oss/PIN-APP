import React from "react";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import { Formik } from "formik";
import { Item } from "native-base";

import { get } from 'lodash';
import validationSchema from "../validationSchema";
import { TextInput } from "../../../Components/Common";
import { FormContainer } from "../Common";
import { TextInputMask } from 'react-native-masked-text'
/*Style*/
import style from "../style.js";
import { verticalScale, scale, moderateScale } from "../../../Utils/scaling";

export default class CompanyAddressAndPhone extends React.Component {
  state = {
    isSubmitting: false,
  };

  form = {
    companyId: this.props.navigation.getParam('me').company_id,
    companyStreet: this.props.navigation.getParam('me').company_street,
    companyCity: this.props.navigation.getParam('me').company_city,
    companyState: this.props.navigation.getParam('me').company_state,
    companyZip: this.props.navigation.getParam('me').company_zip,
    companyPhoneNumber: this.props.navigation.getParam('me').company_phone_number,
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
        street: values['companyStreet'],
        city: values['companyCity'],
        state: values['companyState'],
        zip: values['companyZip'],
        phone_number: values['companyPhoneNumber'],
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
        actions.setFieldError('companyPhoneNumber', get(error, 'response.data.errors.full_messages.0'));
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
              <ScrollView>
                <FormContainer>
                  <Text style={style.formTitle}>Company Address</Text>
                  <View style={{ height: verticalScale(20) }} />
                  <View style={{ marginLeft: scale(-5) }}>
                    <TextInput
                      form={props}
                      formKey="companyStreet"
                      value={props.values.companyStreet}
                      placeholder="Street Address"
                      placeholderTextColor="#AFAFAF"
                      containerStyle={{ borderColor: "#fff", margin: 0 }}
                      style={{ fontSize: moderateScale(16) }}
                      setRef={() => { }}
                      autoCapitalize='words'
                    />
                    <TextInput
                      form={props}
                      formKey="companyCity"
                      value={props.values.companyCity}
                      placeholder="City"
                      placeholderTextColor="#AFAFAF"
                      containerStyle={{ borderColor: "#fff", margin: 0 }}
                      style={{ fontSize: moderateScale(16) }}
                      setRef={() => { }}
                      autoCapitalize='words'
                    />

                    <TextInput
                      form={props}
                      formKey="companyState"
                      value={props.values.companyState}
                      placeholder="State"
                      placeholderTextColor="#AFAFAF"
                      containerStyle={{ borderColor: "#fff", margin: 0 }}
                      style={{ fontSize: moderateScale(16) }}
                      setRef={() => { }}
                      autoCapitalize='words'
                    />

                    <TextInput
                      form={props}
                      formKey="companyZip"
                      value={props.values.companyZip}
                      placeholder="Zip Code"
                      placeholderTextColor="#AFAFAF"
                      containerStyle={{ borderColor: "#fff", margin: 0 }}
                      style={{ fontSize: moderateScale(16) }}
                      setRef={() => { }}
                    />
                  </View>
                  <Text style={style.formSubTitle}>
                    Address needed for customers to get easily {"\n"}directions to
                    your location.
                  </Text>

                  <View style={{ height: verticalScale(30) }} />

                  <Text style={style.formTitle}>Phone Number</Text>
                  <View style={{ height: verticalScale(20) }} />
                  <View style={{ marginLeft: scale(-5) }}>
                    <Item style={{ borderColor: "#fff", margin: 0 }}>
                      <TextInputMask
                        onChangeText={props.handleChange("companyPhoneNumber")}
                        value={props.values.companyPhoneNumber}
                        placeholder="+1 (111) 111-1111"
                        placeholderTextColor="#AFAFAF"
                        keyboardType="phone-pad"
                        type={'cel-phone'}
                        options={{
                          maskType: 'BRL',
                          withDDD: true,
                          dddMask: '+9 (999) 999-9999'
                        }}
                        maxLength={17} />
                    </Item>
                    {/* <TextInput
                      form={props}
                      formKey="companyPhoneNumber"
                      value={props.values.companyPhoneNumber}
                      keyboardType="phone-pad"
                      placeholder="800 - 923"
                      placeholderTextColor="#AFAFAF"
                      containerStyle={{ borderColor: "#fff", margin: 0 }}
                      style={{ fontSize: moderateScale(16) }}
                      setRef={() => { }}
                    /> */}
                    <Text style={style.error}>
                      {props.errors && props.errors.companyPhoneNumber}
                    </Text>
                  </View>

                  <Text style={style.formSubTitle}>
                    Make it convenient for customers to call you
                  </Text>
                </FormContainer>
              </ScrollView>
            </React.Fragment>
          )}
        </Formik>
      </SafeAreaView>
    );
  }
};
