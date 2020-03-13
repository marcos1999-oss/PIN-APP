import React from "react";
import { SafeAreaView, View, Text, Dimensions } from "react-native";
import { CardContainer } from "../../Components/Common";
import CustomIcon from "../../CustomIcon";
import Image from "react-native-auto-height-image";
import { city2 } from "../../Assets";
import Switch from "react-native-switch-pro";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import style from "./style";
import { moderateScale, verticalScale, scale } from "../../Utils/scaling";
import { thisExpression } from "@babel/types";
import { errorMessage } from '../../Utils/alerts'

import { getMe } from '../../redux/selectors/index'
import * as authActions from '../../redux/actions/authActions'


const SwitchList = ({ store, label, text, onChange }) => {
  return (
    <View style={{ ...style.m_SwitchList, width: "100%" }}>
      <View style={{ width: "70%" }}>
        <Text
          style={{
            color: "#555555",
            fontSize: moderateScale(14),
            marginBottom: verticalScale(5),
          }}
        >
          {label}
        </Text>
        <Text style={{ color: "#AFAFAF", fontSize: moderateScale(13) }}>
          {text}
        </Text>
      </View>
      <View>
        {/* <View style={{ height: 10 }}></View> */}
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

class BusinessSettingNotification extends React.Component {
  updateSettings = (params) => {
    this.props.authActions.updateAccount({
      userType: 'business',
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
            paddingHorizontal: scale(20),
            paddingVertical: verticalScale(20),
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
                onChange={(value) => this.updateSettings({ settings_new_deals: value })}
              />

              <View style={{ height: verticalScale(10) }} />

              <SwitchList
                store={this.props.me.settings_likes_and_views}
                label="Likes & Views"
                text="Get notified when you reach multiple likes and views."
                onChange={(value) => this.updateSettings({ settings_likes_and_views: value })}
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

export default connect(mapStateToProps, mapDispatchToProps)(BusinessSettingNotification);
