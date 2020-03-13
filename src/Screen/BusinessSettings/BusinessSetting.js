import React from "react";
import { SafeAreaView, View, Text, Dimensions } from "react-native";
import Modal from "react-native-modal";
import Image from "react-native-auto-height-image";
import CustomIcon from "../../CustomIcon";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { showMessage } from 'react-native-flash-message'
import {
  ScreenLoading,
  Btn,
  ListLink,
  CardContainer,
} from "../../Components/Common";
import { city2 } from "../../Assets";

import style from "./style";
import { verticalScale, scale, moderateScale } from "../../Utils/scaling";

import { errorMessage } from '../../Utils/alerts'

import * as authActions from '../../redux/actions/authActions'
import AsyncStorage from "@react-native-community/async-storage";


class BusinessSettings extends React.Component {
  state = {
    isReady: false,
    isShowLogoutAlert: false,
    isShowDeleteAlert: false,
  };
  pageTitles = [
    "Settings",
    "Payments",
    "Notifications",
    "Change Password",
    "Payment Card",
    "Payment History",
  ];

  // TODO, what is this?
  componentDidMount() {
    setTimeout(() => this.setState({ isReady: true }), 0); //1500
  }

  signOut = () => {
    this.setState({ isShowLogoutAlert: false });

    this.props.authActions.signOut({
      onSuccess: () => {
        AsyncStorage.clear();
        this.props.navigation.navigate('Login');
      },
      onFail: (_error) => {
        showMessage({
          message: 'Sign out failed',
          type: 'danger',
        });
      }
    });
  };

  deleteAccount = () => {
    this.setState({ isShowDeleteAlert: false });

    this.props.authActions.deleteAccount({
      userType: 'business',
      onSuccess: () => {
        this.props.navigation.navigate('Login');
      },
      onFail: (_error) => {
        showMessage({
          message: 'Delete account failed',
          type: 'danger',
        });
      }
    });
  };

  render() {
    const { isShowLogoutAlert, isShowDeleteAlert } = this.state;
    const deviceWidth = Dimensions.get("window").width;

    return this.state.isReady ? (
      <SafeAreaView style={style.l_container}>
        <View style={{ alignItems: "center" }}>
          <CustomIcon name="setting" size={40} color={"#fff"} />
        </View>
        <View
          style={{
            paddingTop: verticalScale(40),
            // paddingHorizontal: scale(20),
            paddingLeft: scale(35),
          }}
        >
          <ListLink
            title={this.pageTitles[1]}
            onPress={() =>
              this.props.navigation.navigate("BusinessSettingPayment")
            }
            style={{ width: "85%" }}
          />
          <ListLink
            title={this.pageTitles[2]}
            onPress={() =>
              this.props.navigation.navigate("BusinessSettingNotification")
            }
            style={{ width: "85%" }}
          />
          <ListLink
            title={this.pageTitles[3]}
            onPress={() =>
              this.props.navigation.navigate("BusinessSettingChangePassword")
            }
            style={{ width: "85%" }}
          />
          <ListLink
            title="Delete Account"
            onPress={() => {
              this.setState({ isShowDeleteAlert: true });
            }}
            style={{ width: "85%" }}
            last={true}
          />
        </View>
        <View
          style={{ paddingHorizontal: scale(30), marginTop: verticalScale(27) }}
        >
          <Btn
            onPress={() => {
              this.setState({ isShowLogoutAlert: true });
            }}
            block
            rounded
            color="#fff"
            textStyle={{ color: "#FF0000", fontSize: moderateScale(14) }}
            title="Sign Out"
            style={{ zIndex: 0 }}
          />
        </View>
        <Modal isVisible={isShowLogoutAlert}>
          <CardContainer style={style.cardContainer}>
            <View style={style.cardWrapper}>
              <Text style={style.popupTitle}>
                Are you sure you want to sign out?
              </Text>
              <View>
                <Btn
                  rounded
                  title="Sign Out"
                  style={{
                    backgroundColor: "#E85858",
                    width: scale(125),
                    height: verticalScale(34),
                  }}
                  textStyle={{
                    color: "#fff",
                    textAlign: "center",
                    width: "100%",
                    fontSize: moderateScale(16),
                  }}
                  onPress={this.signOut}
                />
                <Btn
                  transparent
                  title="CANCEL"
                  style={{ width: scale(125), paddingRight: 0 }}
                  textStyle={{
                    color: "#E85858",
                    textAlign: "center",
                    width: "100%",
                    fontSize: moderateScale(14),
                  }}
                  onPress={() =>
                    this.setState({ isShowLogoutAlert: !isShowLogoutAlert })
                  }
                />
              </View>
            </View>
          </CardContainer>
        </Modal>
        <Modal isVisible={isShowDeleteAlert}>
          <CardContainer style={style.cardContainer}>
            <View style={style.cardWrapper}>
              <Text style={style.popupTitle}>
                Are you sure you want to delete your account?
              </Text>
              <View>
                <Btn
                  rounded
                  title="Cancel"
                  style={{
                    backgroundColor: "#E85858",
                    width: scale(125),
                    height: verticalScale(34),
                  }}
                  textStyle={{
                    color: "#fff",
                    textAlign: "center",
                    width: "100%",
                    fontSize: moderateScale(16),
                  }}
                  onPress={() =>
                    this.setState({ isShowDeleteAlert: !isShowDeleteAlert })
                  }
                />
                <Btn
                  transparent
                  title="Delete"
                  style={{ width: scale(125), paddingRight: 0 }}
                  textStyle={{
                    color: "#E85858",
                    textAlign: "center",
                    width: "100%",
                    fontSize: moderateScale(14),
                  }}
                  onPress={() =>
                    this.deleteAccount()
                  }
                />
              </View>
            </View>
          </CardContainer>
        </Modal>
        <Image style={style.l_bottom} source={city2} width={deviceWidth} />
      </SafeAreaView>
    ) : (
        <ScreenLoading bgcolor="#5F92F3" color="#fff" />
      );
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessSettings);
