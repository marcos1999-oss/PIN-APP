import React from "react";
import { Text, View, SafeAreaView, Dimensions } from "react-native";
import { Formik } from "formik";
import { get } from 'lodash';
import CustomIcon from "../../CustomIcon";
import { TextInput } from "../../Components/Common";
import Image from "react-native-auto-height-image";
import { city2 } from "../../Assets";
import { FormContainer } from "./Common";
import { Item } from "native-base";
import { TextInputMask } from 'react-native-masked-text';



/*Style*/
import style from "./style.js";


export default class UserSettingsPhone extends React.Component {
  state = {
    isSubmitting: false,
  };

  form = {
    phone: this.props.navigation.getParam('me').phone,
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
      phone: values['phone'],
    };

    this.props.navigation.getParam('authActions').updateAccount({
      userType: 'user',
      params,
      onSuccess: () => {
        this.updateSavingStatus({ isSubmitting: false });
        this.props.navigation.goBack();
      },
      onFail: (error) => {
        actions.setFieldError('phone', get(error, 'response.data.errors.full_messages.0'));
        this.updateSavingStatus({ isSubmitting: false });
      }
    });
  };

  render() {
    const deviceWidth = Dimensions.get("window").width;
    return (
      <SafeAreaView style={style.l_container}>
        <View style={{ alignItems: "center", marginBottom: 15 }}>
          <CustomIcon name="setting" size={40} color={"#fff"} />
        </View>

        <Formik onSubmit={this.onSubmit} initialValues={this.form} ref={(ref) => this.formRef = ref}>
          {(props) => (
            <React.Fragment>
              <FormContainer>
                <Text style={style.formTitle}>Write your phone number</Text>
                <View style={{ height: 5 }} />
                <View style={{ marginLeft: -5 }}>
                  <Item style={{ borderColor: "#fff", margin: 0 }}>
                    <TextInputMask
                      onChangeText={props.handleChange("phone")}
                      value={props.values.phone}
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
                    formKey="phone"
                    value={props.values.phone}
                    placeholder=""
                    placeholderTextColor="#AFAFAF"
                    containerStyle={{ borderColor: "#fff", margin: 0 }}
                    style={{ fontSize: 16 }}
                    setRef={() => {}}
                    {...props}
                  /> */}
                  <Text style={style.error}>
                    {props.errors && props.errors.phone}
                  </Text>
                </View>
                <View style={{ height: 100 }} />
                <Text style={style.formSubTitle} numberOfLines={3}>
                  Please, enter your mobile number to receive an SMS to verify
                  your identity. Rates and charges may apply
                </Text>
              </FormContainer>
            </React.Fragment>
          )}
        </Formik>
        <Image style={style.l_bottom} source={city2} width={deviceWidth} />
      </SafeAreaView>
    );
  }
}
