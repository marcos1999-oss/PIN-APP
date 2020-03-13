import React from "react";
import { Text, View, Image, Platform } from "react-native";
import { Container, Card, CardItem, Body, Button } from "native-base";
import { Btn } from "../../../Components/Common";
import { CachedImage } from 'react-native-cached-images';
import {
  addProfile,
  bInfo,
  bSettings,
  bSuppourt,
  bPrivacy,
  bTerms,
} from "../../../Assets";
import { get } from 'lodash';
import moment from 'moment';
import ImagePicker from "react-native-image-picker";
import { _ } from 'lodash';
/*Style*/
import style from "./style.js";
import { verticalScale, scale, moderateScale } from "../../../Utils/scaling";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { getMe } from '../../../redux/selectors/index'
import * as authActions from '../../../redux/actions/authActions'
import { setProfilePercentage } from '../../../Navigation/AppNavigation';

const IS_ANDROID = Platform.OS === "android";

const Link = (props) => (
  <Button
    transparent
    style={{ marginVertical: verticalScale(5) }}
    onPress={props.onPress}
  >
    <View style={style.linkContainer}>
      {
        props.isProfileIncomplete && (
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: "#F40100",
              borderRadius: 50,
              position:"absolute",
              marginLeft: 35,
              top: 10,
              zIndex: 9,
            }}
          />
        )
      }
      <Image
        source={props.icon}
        style={[{
          width: verticalScale(24),
          height: verticalScale(24),
          marginRight: scale(20),

        }]}
      />
      <Text style={{ color: "#555", fontSize: moderateScale(12) }}>
        {props.title}
      </Text>
    </View>
  </Button>
);

const options = {
  title: "Select Avatar",
  storageOptions: {
    skipBackup: true,
    path: "images",
    quality: 0.6,
  },
};

class BusinessMe extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setProfilePercentage(this.props.me.profile_percentage)
  }

  _setAvatar = () => {
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        // console.log("User cancelled image picker");
      } else if (response.error) {
        // console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        // console.log("User tapped custom button: ", response.customButton);
      } else {
        // const source = { uri: response.uri };
        // You can also display the image using data:
        const source = { uri: "data:image/jpeg;base64," + response.data };

        const formData = new FormData();

        formData.append('owned_firm_attributes[id]', this.props.me.company_id);

        formData.append('owned_firm_attributes[photo]', {
          uri: response.uri,
          type: 'image/jpeg',
          name: `${moment().unix()}.jpg`,
        });

        this.props.authActions.updateAccount({ userType: 'business', params: formData });
      }
    });
  };

  renderBlurView() {
    return (
      <View style={{ ...style.profile, backgroundColor: null }}>
        <CachedImage
          source={{ uri: this.props.me.company_photo.url }}
          blurRadius={10}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: null,
          }}
        />
      </View>
    );
  }

  render() {
    const { me } = this.props;
    const photoUrl = get(this.props.me.company_photo, 'url', null);
    let companyName = this.props.me.company_name;
    let fontSize    =  14;
    if (this.props.me.company_name.length > 18) {
      fontSize = 10;

      if (this.props.me.company_name.length > 28) {
        companyName = `${this.props.me.company_name.slice(0, 28)}...`;
      }
    }
    const isProfileIncomplete = me.profile_percentage !== 100;
    return (
      <Container style={{ justifyContent: "center" }}>
        {photoUrl != null ? (
          this.renderBlurView()
        ) : (
            <View style={style.profile} />
          )}

        <View style={style.container}>
          <View style={{ alignSelf: "center" }}>
            <Button transparent onPress={this._setAvatar}>
              {photoUrl ? (
                <CachedImage
                  source={{ uri: photoUrl }}
                  style={{
                    height: verticalScale(80),
                    width: verticalScale(80),
                    borderRadius: verticalScale(40),
                  }}
                />
              ) : (
                  <Image
                    source={addProfile}
                    style={{
                      height: verticalScale(80),
                      width: verticalScale(80),
                      borderRadius: 0,
                    }}
                  />
                )}
            </Button>
          </View>
          <View style={{ height: verticalScale(40) }} />
          <Card style={[style.main, { borderRadius: verticalScale(15) }]}>
            <CardItem style={{ borderRadius: verticalScale(15) }}>
              <Body>
                <View style={style.brandName}>
                  <Card style={{ borderRadius: verticalScale(20) }}>
                    <Text style={{ ...style.brandName_text, fontSize: fontSize }}>{ companyName }</Text>
                  </Card>
                </View>
                <View style={{ height: verticalScale(20) }} />
                <Link
                  title="Business Information"
                  icon={bInfo}
                  onPress={() => this.props.navigation.navigate("BusinessInfo", { me })}
                  isProfileIncomplete={isProfileIncomplete}
                />
                <Link
                  title="Settings"
                  icon={bSettings}
                  onPress={() =>
                    this.props.navigation.navigate("BusinessSettings")
                  }
                />
                <Link
                  title="Support"
                  icon={bSuppourt}
                  onPress={() =>
                    this.props.navigation.navigate("BusinessSupport")
                  }
                  color="#5F92F3"
                />
                <Link
                  title="Privacy Policy"
                  icon={bPrivacy}
                  onPress={() =>
                    this.props.navigation.navigate("BusinessLegal", {
                      type: "privacy",
                      title: "Privacy Policy",
                    })
                  }
                />
                <Link
                  title="Terms and Conditions"
                  icon={bTerms}
                  onPress={() =>
                    this.props.navigation.navigate("BusinessLegal", {
                      type: "terms",
                      title: "Terms And Conditions",
                    })
                  }
                />
              </Body>
            </CardItem>
          </Card>
          <View style={{ height: verticalScale(20) }} />
          <Btn
            block
            rounded
            title="About Scopin"
            color="#5F92F3"
            textColor="white"
            style={{
              height: verticalScale(50)
            }}
            textStyle={{
              fontFamily: IS_ANDROID
                ? "SignPainter_HouseScript"
                : "SignPainter", fontSize: moderateScale(18)
            }}
            onPress={() =>
              this.props.navigation.navigate("BusinessLegal", {
                type: "about",
                title: "About Us",
              })
            }
          />
        </View>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(BusinessMe);