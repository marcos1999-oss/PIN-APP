import React from "react";
import { SafeAreaView, View, Text, Dimensions } from "react-native";
import { CardContainer } from "../../Components/Common";
import CustomIcon from "../../CustomIcon";
import Image from "react-native-auto-height-image";
import { city2 } from "../../Assets";
import Switch from "react-native-switch-pro";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import style from "./notiAndChangePasswordStyle";
import { moderateScale, verticalScale, scale } from "../../Utils/scaling";
import { errorMessage } from '../../Utils/alerts'

import { getMe } from '../../redux/selectors/index'
import * as authActions from '../../redux/actions/authActions'


const SwitchList = ({ store, label, text, onChange }) => {
  return (
    <View style={{ ...style.m_SwitchList, width: "100%" }}>
      <View style={{ width: "70%" }}>
        <Text style={{ color: "#555555", fontSize: moderateScale(14) }}>
          { label }
        </Text>
        <View style={{ height: verticalScale(5) }} />
        <Text style={{ color: "#AFAFAF", fontSize: moderateScale(8) }}>
          { text }
        </Text>
      </View>

      <View>
        {store && (
          <Text
            style={{
              fontSize: moderateScale(10),
              color: "gray",
              position: "absolute",
              top: verticalScale(-18),
              right: 0,
            }}
          >
            Yes
          </Text>
        )}
        <Switch
          width={scale(40)}
          height={verticalScale(22)}
          value={store}
          backgroundActive="#56D926"
          onAsyncPress={(callback) =>
            callback(true, (value) => onChange(value))
          }
        />
      </View>
    </View>
  );
};

class UserSettingsNotifications extends React.Component {
  updateSettings = (params) => {
    this.props.authActions.updateAccount({
      userType: 'user',
      params,
      onFail: (error) => {
        errorMessage({ message: 'Could not update your settings', description: error.message });
      }
    });
  };

  render() {
    const deviceWidth = Dimensions.get("window").width;

    return (
      <SafeAreaView style={style.l_container}>
        <View style={{ alignItems: "center" }}>
          <CustomIcon name="setting" size={verticalScale(40)} color={"#fff"} />
        </View>

        <View
          style={{
            paddingVertical: verticalScale(20),
            paddingHorizontal: scale(20),
          }}
        >
          <CardContainer>
            <View
              style={{
                paddingTop: verticalScale(15),
                paddingBottom: verticalScale(30),
              }}
            >
              <SwitchList
                store={this.props.me.settings_new_deals}
                label="New Deals"
                text="Get occasional notifications when there are new pins. So, you don’t miss any opportunities."
                onChange={ (value) => this.updateSettings({ settings_new_deals: value }) }
              />

              <View style={{ height: verticalScale(10) }} />

              <SwitchList
                store={this.props.me.settings_timer}
                label="Timer"
                text="Get notified for your favorite deals an hour before timer ends."
                onChange={ (value) => this.updateSettings({ settings_timer: value }) }
              />
            </View>
          </CardContainer>
        </View>

        <Image style={style.l_bottom} source={city2} width={deviceWidth} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    me: getMe(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsNotifications);
