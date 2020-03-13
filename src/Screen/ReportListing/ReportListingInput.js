import React from "react";
import { SafeAreaView, View, Text,Keyboard } from "react-native";
import { Formik } from "formik";
import Image from "react-native-auto-height-image";
import { Btn, TextInput } from "../../Components/Common";
import { width, moderateScale } from "../../Utils/scaling";
import { city3 } from "../../Assets";
import style, { btnDoneStyle } from "./inputAndSent.style";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {showMessage} from "react-native-flash-message";

import validation from './validation'
import { getReport, getViewingPost } from '../../redux/selectors/index'
import * as reportActions from '../../redux/actions/reportActions'


class ReportListingInput extends React.Component {
  form = {
    fields: {
      description: '',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      keyboardState: false
    };

    this.validationSchema = validation();
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      keyboardState: true
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      keyboardState: false
    });
  };

  completeReport = (values, _actions) => {
    this.props.reportActions.createReport({
      params: {
        post_id: this.props.post.id,
        description: values['description'],
        wrong_location: this.props.report.wrongLocation,
        false_offers: this.props.report.falseOffers,
        incorrect_open_hours: this.props.report.incorrectOpenedHour,
        wrong_phone_number: this.props.report.notWorkingPhone,
        different_business_name: this.props.report.differentBusinessName,
        other_reason: this.props.report.other,
      },
      onSuccess: () => {
        this.props.navigation.navigate('ReportListingSent');
      },
      onFail: (_error) => {
        showMessage({
          message: 'Failed to report this post',
          type: 'danger',
        });
      },
    });
  };

  render() {
    return (
      <SafeAreaView style={style.l_container}>
        <Formik
          initialValues={this.form.fields}
          onSubmit={this.completeReport}
          validationSchema={this.validationSchema}>
          {(props) => (
            <View style={style.contentContainer}>
              <View style={style.formContainer}>
                <Text style={style.formTitle}>Support Team</Text>
                <Text style={style.formTitle2}>
                  Please write on detail the issue.
                </Text>

                <View style={style.textInputWrapper}>
                  <TextInput
                    form={props}
                    formKey="description"
                    value={props.values}
                    setRef={(ref) => (this.form.fields.description = ref)}
                    onSubmitEditing={props.handleSubmit}
                    placeholder="Report this listing and our team will take actions…"
                    placeholderTextColor="#AFAFAF"
                    containerStyle={style.textInputContainer}
                    style={{ fontSize: moderateScale(16) }}
                    multiline={true}
                    numberOfLines={6}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              <View style={style.bottomActions}>
                <Btn
                  block
                  rounded
                  title="Complete Report"
                  onPress={props.handleSubmit}
                  {...btnDoneStyle}
                />
                <View style={style.adviceStyle}>
                  <Text style={style.adviceTextStyle}>
                    Our support team will email you within the next 24 hours.
                  </Text>
                </View>
              </View>
            </View>
          )}
        </Formik>

        { !this.state.keyboardState &&
          <Image
            style={style.l_bottom}
            source={city3}
            width={style.l_bottom.width}
          />
        }
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    report: getReport(state),
    post: getViewingPost(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    reportActions: bindActionCreators(reportActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportListingInput);
