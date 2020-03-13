import React from "react";
import { SafeAreaView, View, Text, Dimensions } from "react-native";
import { ListLink } from "../../Components/Common";
import CustomIcon from "../../CustomIcon";
import Image from "react-native-auto-height-image";
import { city2 } from "../../Assets";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import numeral from 'numeral';
import moment from 'moment';

import style from "./style";
import { verticalScale, scale } from "../../Utils/scaling";

import { getMe, getCurrentFirmReport, getFirmReportsMeta } from '../../redux/selectors/index'
import * as paymentActions from '../../redux/actions/paymentActions'
import * as firmReportActions from '../../redux/actions/firmReportActions'
import { black } from "ansi-colors";


class BusinessSettingPayment extends React.Component {
  componentWillMount() {
    if (!this.props.firmReportsMeta.loadingCurrent && !this.props.firmReportsMeta.loadedCurrent) {
      this.props.firmReportActions.fetchCurrentFirmReport({
        onFail: error => {
          errorMessage({ message: 'Could not load the payment details', description: error.message });
        }
      });
    }

    if (!this.props.firmReportsMeta.loading && !this.props.firmReportsMeta.loaded) {
      this.props.firmReportActions.fetchFirmReports({
        onFail: error => {
          errorMessage({ message: 'Could not load the payment history', description: error.message });
        }
      });
    }
  }

  render() {
    const deviceWidth = Dimensions.get("window").width;

    return (
      <SafeAreaView style={style.l_container}>
        <View style={{ alignItems: "center" }}>
          <CustomIcon name="setting" size={verticalScale(40)} color={"#fff"} />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={style.payments_text1}>{moment().format('MMMM')}</Text>
          <View style={{ height: verticalScale(20) }} />
          <Text style={style.payments_text2}>{numeral(this.props.me.company_available_balance / 100.0).format('$0,0.00')}</Text>
          <View style={{ height: verticalScale(10) }} />
          <Text style={style.payments_text1}>Current Balance</Text>
        </View>

        <View style={{ height: verticalScale(20) }} />
        <View
          style={{
            paddingHorizontal: scale(50),
            paddingVertical: verticalScale(50),
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={style.payments_text3}>{this.props.firmReport.totalLikes}</Text>
              <Text style={style.payments_text4}>Total Likes</Text>
            </View>

            <View style={style.payments_vertical_border} />

            <View style={{ alignItems: "center" }}>
              <Text style={style.payments_text3}>{this.props.firmReport.pinsPurchased}</Text>
              <Text style={style.payments_text4}>Pins Purchased</Text>
            </View>

            <View style={style.payments_vertical_border} />

            <View style={{ alignItems: "center" }}>
              <Text style={style.payments_text3}>{this.props.firmReport.peopleReached}</Text>
              <Text style={style.payments_text4}>People Reached</Text>
            </View>
          </View>

          <View style={{ height: verticalScale(50) }} />

          <View>
            <ListLink
              title="Add A Card"
              last
              style={{ marginLeft: '-4%' }}
              onPress={() =>
                this.props.navigation.navigate("BusinessSettingPaymentCard")
              }
            />

            <ListLink
              title="Payment History"
              last
              style={{ marginTop: -5, marginLeft: '-4%' }}
              onPress={() =>
                this.props.navigation.navigate("BusinessSettingPaymentHistory")
              }
            />
          </View>
        </View>
        <Image style={style.l_bottom} source={city2} width={deviceWidth} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firmReportsMeta: getFirmReportsMeta(state),
    me: getMe(state),
    firmReport: getCurrentFirmReport(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    paymentActions: bindActionCreators(paymentActions, dispatch),
    firmReportActions: bindActionCreators(firmReportActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessSettingPayment);
