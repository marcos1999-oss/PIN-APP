import React from "react";
import { Text, View, SafeAreaView, Dimensions } from "react-native";
import { Formik } from "formik";
import { get } from 'lodash';
import CustomIcon from "../../CustomIcon";
import { TextInput } from "../../Components/Common";
import Image from "react-native-auto-height-image";
import { city2 } from "../../Assets";
import { FormContainer } from "./Common";

/*Style*/
import style from "./style.js";

export default class UserSettingsEmail extends React.Component {
  state = {
    isSubmitting: false,
  };

  form = {
    email: this.props.navigation.getParam('me').email,
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
      email: values['email'],
    };

    this.props.navigation.getParam('authActions').updateAccount({
      userType: 'user',
      params,
      onSuccess: () => {
        this.updateSavingStatus({ isSubmitting: false });
        this.props.navigation.goBack();
      },
      onFail: (error) => {
        actions.setFieldError('email', get(error, 'response.data.errors.full_messages.0'));
        this.updateSavingStatus({ isSubmitting: false });
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={style.l_container}>
        <View style={{ alignItems: "center", marginBottom: 15 }}>
          <CustomIcon name="setting" size={40} color={"#fff"} />
        </View>

        <Formik onSubmit={this.onSubmit} initialValues={this.form} ref={(ref) => this.formRef = ref}>
          {(props) => (
            <React.Fragment>
              <FormContainer>
                <Text style={style.formTitle}>Write your email</Text>
                <View style={{ height: 5 }} />
                <View style={{ marginLeft: -5 }}>
                  <TextInput
                    form={props}
                    formKey="email"
                    value={props.values.email}
                    placeholder="example@email.com"
                    placeholderTextColor="#AFAFAF"
                    containerStyle={{ borderColor: "#fff", margin: 0 }}
                    style={{ fontSize: 16 }}
                    setRef={() => {}}
                  />
                  <Text style={style.error}>
                    {props.errors && props.errors.email}
                  </Text>
                </View>
                <View style={{ height: 100 }} />
              </FormContainer>
            </React.Fragment>
          )}
        </Formik>
        <Image style={style.l_bottom} source={city2} width={Dimensions.get("window").width} />
      </SafeAreaView>
    );
  }
};
