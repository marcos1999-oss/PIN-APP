import React from "react";
import { Text, View, Dimensions, ScrollView, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { showMessage } from 'react-native-flash-message'
import { _ } from 'lodash';
import * as EmailValidator from 'email-validator';

import {
  CardContainer,
  ScreenLoading,
  ListLink,
  ListLinkHeader,
  Btn,
} from "../../Components/Common";
import CustomIcon from "../../CustomIcon";

/*Style*/
import style from "./style.js";
import { verticalScale, moderateScale, scale } from "../../Utils/scaling";
import { ScrollableComponent } from "../../Components/ScrollableComponent";

import { getMe } from '../../redux/selectors/index'
import * as authActions from '../../redux/actions/authActions'
import AsyncStorage from "@react-native-community/async-storage";


class UserSettings extends React.Component {
  state = {
    isReady: false,
    isShowLogoutAlert: false,
    isShowDeleteAlert: false,
  };

  constructor(props) {
    super(props);
  }

  // TODO, what is this?
  componentDidMount() {
    setTimeout(() => this.setState({ isReady: true }), 0); //1500
  }

  setPage = (page) => {
    this.props.navigation.navigate(page, { me: this.props.me, authActions: this.props.authActions });
  };

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
      userType: 'user',
      onSuccess: () => {
        this.props.navigation.navigate('Login');
      },
      onFail: (_error) => {
        showMessage({
          message: 'Delete account failed',
          type: 'danger',
        });
      },
    });
  };

  render() {
    const { isShowLogoutAlert, isShowDeleteAlert } = this.state;
    const { me } = this.props;
    const deviceHeight = Dimensions.get("window").height;
    const isNameIncorrect = _.isEmpty(me.first_name) || _.isEmpty(me.last_name);
    const isUsernameIncorrect = _.isEmpty(me.username);
    const isEmailIncorrect = _.isEmpty(me.email) || !EmailValidator.validate(me.email);
    const isDobIncorrect = _.isEmpty(me.birthday);
    const isPhoneIncorrect = _.isEmpty(me.phone);
    if (this.state.isReady) {
      return (
        <SafeAreaView style={style.l_container}>
          <View style={{ alignItems: "center" }}>
            <CustomIcon
              name="setting"
              size={verticalScale(39)}
              color={"#fff"}
            />
          </View>
          <View
            style={{
              paddingTop: verticalScale(20),
              // paddingBottom: verticalScale(50),
            }}
          >
            <ListLink
              title="Name"
              onPress={() => this.setPage("UserSettingsName")}
              style={style.listLink}
              isIncorrect={isNameIncorrect}
            />
            <ListLink
              title="Username"
              onPress={() => this.setPage("UserSettingsUsername")}
              style={style.listLink}
              isIncorrect={isUsernameIncorrect}
            />
            <ListLink
              title="Email"
              onPress={() => this.setPage("UserSettingsEmail")}
              style={style.listLink}
              isIncorrect={isEmailIncorrect}
            />
            <ListLink
              title="Phone Number"
              onPress={() => this.setPage("UserSettingsPhone")}
              style={style.listLink}
              isIncorrect={isPhoneIncorrect}
            />
            <ListLink
              title="Birthday"
              onPress={() => this.setPage("UserSettingsBirthday")}
              last={true}
              style={{ ...style.listLink, marginBottom: verticalScale(7) }}
              isIncorrect={isDobIncorrect}
            />
            <ListLinkHeader
              title="Account Settings"
              textStyle={{
                paddingLeft: 0,
                fontSize: moderateScale(12),
                fontWeight: "bold",
              }}
              style={{ paddingHorizontal: scale(38), backgroundColor: "#5F92F3" }}
            />
            <ListLink
              title="Notifications"
              onPress={() => this.setPage("UserSettingsNotifications")}
              style={{ ...style.listLink, marginTop: verticalScale(10) }}
            />
            <ListLink
              title="Change Password"
              onPress={() => this.setPage("UserSettingChangePassword")}
              style={style.listLink}
            />
            <ListLink
              title="Delete Account"
              onPress={() => {
                this.setState({ isShowDeleteAlert: true });
              }}
              last={true}
              style={style.listLink}
            />
            <Btn
              onPress={() => {
                this.setState({ isShowLogoutAlert: true });
              }}
              block
              rounded
              color="#fff"
              textStyle={{ color: "#FF0000", fontSize: moderateScale(14) }}
              title="Sign Out"
              style={{
                zIndex: 0,
                marginHorizontal: scale(30),
                marginTop: verticalScale(38),
              }}
            />
          </View>
          {/* <View style={{ padding: 20, marginTop: 20 }}>
              <Btn
                onPress={() => {this.setState({isShowLogoutAlert: true}) }}
                block
                rounded
                color="#fff"
                textStyle={{ color: "#FF0000", fontSize: 14 }}
                title="Sign Out"
                style={{ zIndex: 0 }}
              />
            </View> */}
          <Modal isVisible={isShowLogoutAlert}>
            <CardContainer style={style.cardContainer}>
              <View style={style.cardWrapper}>
                <Text style={style.cardTitle}>
                  Are you sure you want to sign out?
                </Text>
                <View style={style.actionBtnContainer}>
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
                <Text style={style.cardTitle}>
                  Are you sure you want to delete your account?
                </Text>
                <View style={style.actionBtnContainer}>
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
        </SafeAreaView>
      );
    }
    return <ScreenLoading bgcolor="#5F92F3" color="#fff" />;
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

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
