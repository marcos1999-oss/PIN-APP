import React from "react";
import { Text, View, Dimensions, ScrollView, SafeAreaView } from "react-native";
import { Button } from "native-base";
import Image from "react-native-auto-height-image";
import { ScreenLoading, ListLink } from "../../Components/Common";
import { _, map } from 'lodash';
import {
  city2,
  profile,
  alcohol,
  baby,
  driveThrough,
  heart,
  music,
  parking,
  party,
  pet,
  reservation,
  wifi,
  valetParking,
} from "../../Assets";
import * as EmailValidator from 'email-validator';

const featureIcons = {
  alcohol,
  baby,
  driveThrough,
  heart,
  music,
  parking,
  party,
  pet,
  reservation,
  wifi,
  valetParking,
};

/*Style*/
import style from "./style.js";
import { verticalScale, scale, moderateScale } from "../../Utils/scaling";
import { ScrollableComponent } from "../../Components/ScrollableComponent";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { getMe } from '../../redux/selectors/index'
import * as authActions from '../../redux/actions/authActions'
import { setProfilePercentage } from '../../Navigation/AppNavigation'

const ProgressBar = (props) => {
  return (
    <View style={style.m_progressbar}>
      <View
        style={{
          ...style.m_progressbar_inner,
          width: (props.progess || 0) + "%",
        }}
      />
    </View>
  );
};

const CircleBtn = (props) => (
  <Button
    disabled={props.disabled}
    onPress={props.onPress}
    style={{ backgroundColor: "#fff", width: 30, height: 30, borderRadius: 50 }}
  >
    <View style={{ width: "100%", alignItems: "center" }}>
      {props.children}
    </View>
  </Button>
);

class BusinessInfo extends React.Component {
  state = {
    isReady: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isReady: true }), 0); //1500
  }

  setPage = (page) => {
    this.props.navigation.navigate(page, { me: this.props.me, authActions: this.props.authActions });
  };

  goBack() {
    if (this.currentPage != 0) {
      this.pager.setPage(0);
      this.currentPage = 0;
    } else {
      this.props.navigation.goBack();
    }
  }

  render() {
    const { me } = this.props;
    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;
    const isCompanyNameCorrect = _.isEmpty(me.company_name); 
    const isTobCorrect = _.isEmpty(me.company_business_type); 
    const isCompanyAboutCorrect = _.isEmpty(me.company_about); 
    const isContactCorrect =
    _.isEmpty(me.company_street)
    || _.isEmpty(me.company_city)
    || _.isEmpty(me.company_state)
    || _.isEmpty(me.company_zip)
    || _.isEmpty(me.company_phone_number); 
    const isEmailCorrect = _.isEmpty(me.email) || !EmailValidator.validate(me.email);
    const isCompanyWebsiteCorrect = _.isEmpty(me.company_website); 
    const isCompanyScheduleCorrect = _.isEmpty(me.company_schedules);
    if (this.props.navigation.getParam('profile_percentage', 0) !== me.profile_percentage ) {
      this.props.navigation.setParams({profile_percentage: me.profile_percentage});
      setProfilePercentage(me.profile_percentage);
    }
    return this.state.isReady ? (
      <SafeAreaView style={style.l_container}>
        <React.Fragment>
          <View
            style={{
              paddingLeft: scale(35),
              paddingRight: scale(23),
              paddingTop: verticalScale(10),
              flexDirection: "row",
            }}
          >
            <View style={{ flexGrow: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: moderateScale(10), color: "#fff" }}>
                  Profile Completed
                </Text>
                <Text style={{ fontSize: moderateScale(12), color: "#fff" }}>
                  {this.props.me.profile_percentage}%
                </Text>
              </View>
              <View style={{ height: verticalScale(5) }} />
              <ProgressBar progess={this.props.me.profile_percentage} />
              <View style={{ height: verticalScale(10) }} />
              {(this.props.me.profile_percentage < 100) && <Text
                style={{
                  fontSize: moderateScale(10),
                  color: "#fff",
                  textAlign: "left",
                  fontFamily: "Helvetica",
                  paddingLeft: scale(10),
                  paddingBottom: verticalScale(10),
                }}
              >
                Complete 100% your profile information to be able to post.
              </Text>}
            </View>
            <View style={{ paddingLeft: scale(10) }}>
              <CircleBtn disabled={true}>
                <Image style={{ tintColor: "#3865BA" }} source={profile} width={scale(14)} />
              </CircleBtn>
            </View>
          </View>
          {/* <View style={{ height: deviceHeight - verticalScale(240) }}> */}
          {/* <ScrollView>

            </ScrollView> */}
          <ScrollableComponent>
            <View style={{ paddingLeft: scale(35) }}>
              <ListLink
                title="Company Name"
                onPress={() => this.setPage("CompanyNameScreen")}
                style={{ width: "85%" }}
                isIncorrect={isCompanyNameCorrect}
              />
              <ListLink
                title="Type of Business"
                onPress={() => this.setPage("TypeOfBusinessScreen")}
                style={{ width: "85%" }}
                isIncorrect={isTobCorrect}
              />
              <ListLink
                title="Company About Us"
                onPress={() => this.setPage("AboutUsScreen")}
                style={{ width: "85%" }}
                isIncorrect={isCompanyAboutCorrect}
              />
              <ListLink
                title="Address & Phone Number"
                onPress={() => this.setPage("AddressAndPhoneScreen")}
                style={{ width: "85%" }}
                isIncorrect={isContactCorrect}
              />
              <ListLink
                title="Email"
                onPress={() => this.setPage("EmailScreen")}
                style={{ width: "85%" }}
                isIncorrect={isEmailCorrect}
              />
              <ListLink
                title="Add Your Website"
                onPress={() => this.setPage("WebsiteScreen")}
                style={{ width: "85%" }}
                isIncorrect={isCompanyWebsiteCorrect}
              />
              <ListLink
                title="Business Hours"
                onPress={() => this.setPage("BusinessHourScreen")}
                last={true}
                style={{ width: "85%" }}
                isIncorrect={isCompanyScheduleCorrect}
              />
              <View
                style={{
                  paddingRight: scale(30),
                  marginTop: verticalScale(22),
                }}
              >
                <Button
                  transparent
                  style={[style.l_featureBar, { backgroundColor: "#3865BA", opacity: 0.9 }, this.props.me.company_features.length >= 1 && { flexDirection: 'row', flexWrap: 'wrap', height: 'auto', paddingLeft: 10 }]}
                  onPress={() => this.setPage("FeatureScreen")}
                >
                  <View style={this.props.me.company_features.length >= 1 && { marginBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={style.l_featureBar_title}>Features</Text>
                  </View>
                  <View style={{ flexDirection: "row", height: 'auto', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {map(this.props.me.company_features, (feature, idx) => {
                      return featureIcons[feature.icon] && (
                        <View
                          key={idx}
                          style={[style.l_featureBar_iconContainer, this.props.me.company_features && { marginBottom: 5 }]}
                        >
                          <CircleBtn>
                            <Image
                              source={featureIcons[feature.icon]}
                              width={scale(14)}
                            />
                          </CircleBtn>
                        </View>
                      )
                    })}
                  </View>
                </Button>
              </View>
            </View>
          </ScrollableComponent>
          {/* </View> */}

          <Image style={style.l_bottom} source={city2} width={deviceWidth} />
        </React.Fragment>
      </SafeAreaView>
    ) : (
        <ScreenLoading bgcolor="#5F92F3" color="#fff" />
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

export default connect(mapStateToProps, mapDispatchToProps)(BusinessInfo);
