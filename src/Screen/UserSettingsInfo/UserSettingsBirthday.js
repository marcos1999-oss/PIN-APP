import React from "react";
import { Text, View, SafeAreaView, Dimensions } from "react-native";
import { Formik } from "formik";
import CustomIcon from "../../CustomIcon";
import { DateInput } from "../../Components/Common";
import Image from "react-native-auto-height-image";
import { city2 } from "../../Assets";
import { FormContainer } from "./Common";
import moment from 'moment'

/*Style*/
import style from "./style.js";

const customStyles = {
  placeholderText: {
    fontSize: 16,
    color: "#AFAFAF",
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  dateInput: {
    borderWidth: 0,
    boderBottomWidth: 0,
    alignItems: "flex-start",
    padding: 5,
  },
  disabled: {
    backgroundColor: "white",
  }
};

export default class UserSettingsBirthday extends React.Component {

  form = {
    birthday: moment(this.props.navigation.getParam('me').birthday).format('DD MMMM YYYY'),
  };

  render() {
    const deviceWidth = Dimensions.get("window").width;

    return (
      <SafeAreaView style={style.l_container}>
        <View style={{ alignItems: "center", marginBottom: 15 }}>
          <CustomIcon name="setting" size={40} color={"#fff"} />
        </View>
        <Formik initialValues={this.form} ref={(ref) => this.formRef = ref}>
          {(props) => (
            <React.Fragment>
              <FormContainer>
                <Text style={style.formTitle}>When is your birthday</Text>
                <View style={{ height: 5 }} />
                <View style={{ marginLeft: -5, borderWidth: 0 }}>
                  <DateInput
                    disabled={!this.props.navigation.getParam('me').can_change_birthday}
                    form={props}
                    formKey="birthday"
                    format="DD MMMM"
                    placeholder="Jan 10"
                    customStyles={customStyles}
                    containerStyle={{ borderColor: "#fff", margin: 0 }}
                    inlineValidation={true}
                    setRef={() => { }}
                    onDateChange={(date) => {
                      props.setFieldValue('birthday', date);
                    }}
                    disabled
                  />
                  <Text style={style.error}>
                    {props.errors && props.errors.birthday}
                  </Text>
                </View>
                <View style={{ height: 100 }} />
                <Text style={style.formSubTitle}>
                  Get special deals on your birthday.
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
