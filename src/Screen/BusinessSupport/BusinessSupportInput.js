import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Formik } from "formik";
import { Card, CardItem, Body } from "native-base";
import Image from "react-native-auto-height-image";
import { Btn, TextInput } from "../../Components/Common";
import CustomIcon from "../../CustomIcon";
import {
  width,
  verticalScale,
  scale,
  moderateScale,
} from "../../Utils/scaling";
import { city2 } from "../../Assets";
import style, { IconSupportStyle } from "./style.js";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { errorMessage } from '../../Utils/alerts'

import * as supportTicketActions from '../../redux/actions/supportTicketActions'


class BussinessSupportInput extends React.Component {
  form = {
    fields: {
      query: '',
    },
  };

  onSubmit = (values, _actions) => {
    this.props.supportTicketActions.createSupportTicket({
      userType: 'business',
      params: {
        query: values['query'],
      },
      onSuccess: () => {
        this.props.navigation.navigate('BusinessSupportSent');
      },
      onFail: (error) => {
        errorMessage({ message: 'Error when submitting the ticket', description: error.message });
      },
    });
  };

  render() {
    return (
      <SafeAreaView style={style.l_container}>
        <View
          style={{ alignItems: "center", paddingBottom: verticalScale(19) }}
        >
          <CustomIcon {...IconSupportStyle} />
        </View>
        <Formik onSubmit={this.onSubmit}>
          {(props) => (
            <View
              style={{
                paddingHorizontal: scale(10),
                marginTop: verticalScale(-10),
                zIndex: 1,
              }}
            >
              <Card style={{ borderRadius: verticalScale(20) }}>
                <CardItem style={{ borderRadius: verticalScale(20) }}>
                  <Body>
                    <View
                      style={{
                        paddingHorizontal: scale(10),
                        paddingVertical: verticalScale(10),
                        width: "100%",
                      }}
                    >
                      <Text style={style.formTitle}>Support Team</Text>
                      <View style={{ height: verticalScale(11) }} />
                      <Text style={style.formTitle2}>
                        Please write on detail your issue so our team can better
                        assist you.
                      </Text>
                      <View style={{ height: verticalScale(10) }} />
                      <View style={{ marginLeft: scale(-5) }}>
                        <TextInput
                          form={props}
                          formKey="query"
                          value={props.values}
                          placeholder="Support team is always here for you"
                          placeholderTextColor="#AFAFAF"
                          containerStyle={{
                            borderColor: "#fff",
                            margin: 0,
                            height: scale(120),
                            alignItems: "flex-start",
                          }}
                          style={{ fontSize: moderateScale(16) }}
                          setRef={(ref) => (this.form.fields.query = ref)}
                          multiline={true}
                          numberOfLines={6}
                          textAlignVertical="top"
                        />
                      </View>
                    </View>
                  </Body>
                </CardItem>
              </Card>
              <View
                style={{
                  paddingVertical: verticalScale(20),
                  paddingHorizontal: scale(44),
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: moderateScale(10),
                    textAlign: "center",
                    fontFamily: "Helvetica",
                  }}
                >
                  Our support team will email you within the next 24 hours.
                </Text>
                <View style={{ height: verticalScale(30) }} />
                <Btn
                  block
                  rounded
                  color="#fff"
                  textStyle={{
                    color: "#000",
                    fontSize: moderateScale(14),
                    fontWeight: "bold",
                  }}
                  title="Send"
                  onPress={props.handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
        <Image style={style.l_bottom} source={city2} width={width} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

const mapDispatchToProps = (dispatch) => {
  return {
    supportTicketActions: bindActionCreators(supportTicketActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BussinessSupportInput);
