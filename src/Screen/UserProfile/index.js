import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  findNodeHandle,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  Container,
  Card,
  CardItem,
  Body,
  Left,
  Button,
  Header,
  Icon,
  Right,
} from "native-base";
import { get } from 'lodash';
import moment from 'moment';
import { Btn } from "../../Components/Common";
import {
  addProfile,
  bSettings,
  bSuppourt,
  bPrivacy,
  bTerms,
} from "../../Assets";
/*Style*/
import style from "./style.js";
import ImagePicker from "react-native-image-picker";
import { BlurView } from "@react-native-community/blur";
import CustomIcon from "../../CustomIcon";
import { verticalScale, moderateScale, scale } from "../../Utils/scaling";
import { CachedImage } from 'react-native-cached-images';
import { _ } from 'lodash';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { getMe } from '../../redux/selectors/index'
import * as authActions from '../../redux/actions/authActions'

const IS_ANDROID = Platform.OS === "android";

const options = {
  title: "Select Avatar",
  storageOptions: {
    skipBackup: true,
    path: "images",
    quality: 0.6,
  },
};

const Link = (props) => (
  <TouchableOpacity style={style.linkContainer} onPress={props.onPress}>
    <View
      style={{
        width: verticalScale(24),
        height: verticalScale(24),
        marginRight: scale(20),
      }}
    >
      <Image
        source={props.icon}
        style={{ flex: 1, width: "100%", resizeMode: "contain" }}
      />
    </View>
    <Text style={{ color: "#555", fontSize: moderateScale(12) }}>
      {props.title}
    </Text>
  </TouchableOpacity>
);

class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
    };
  }

  _setAvatar = () => {
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      }
      // else if (response.error) {
      //   console.log("ImagePicker Error: ", response.error);
      // }
      // else if (response.customButton) {
      //   console.log("User tapped custom button: ", response.customButton);
      // }
      else {
        // const source = { uri: response.uri };
        // You can also display the image using data:
        const source = { uri: "data:image/jpeg;base64," + response.data };

        const formData = new FormData();

        formData.append('photo', {
          uri: response.uri,
          type: 'image/jpeg',
          name: `${moment().unix()}.jpg`,
        });

        this.props.authActions.updateAccount({ userType: 'user', params: formData });
      }
    });
  };

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.profileImage) });
  }

  renderBlurView() {
    return (
      <View style={{ ...style.profile, backgroundColor: null }}>
        <CachedImage
          source={{ uri: this.props.me.photo.url }}
          style={{
            flex: 1,
            resizeMode: "cover",
            opacity: 0.4,
          }}
          ref={(img) => {
            this.profileImage = img;
          }}
          onLoadEnd={this.imageLoaded.bind(this)}
        />
        <View style={style.blurViewWrapper}>
          <BlurView
            style={style.blurView}
            viewRef={this.state.viewRef}
            blurType="light"
            blurAmount={7}
            blurRadius={7}
            downsampleFactor={5}
          />
        </View>
      </View>
    );
  }

  render() {
    const photoUrl = get(this.props.me.photo, 'url', null);
    const { me } = this.props;
    const isProfileIncomplete = _.some(me, _.isEmpty);
    return (
      <Container>
        {photoUrl != null ? (
          this.renderBlurView()
        ) : (
            <View style={style.profile} />
          )}

        <Header style={style.headerStyle}>
          <Left>
            <Button
              transparent
              style={{ marginLeft: 10 }}
              onPress={() => this.props.navigation.navigate("UserHome")}
            >
              <CustomIcon
                name="close"
                style={{ color: photoUrl ? "black" : "white" }}
              />
            </Button>
          </Left>

          <Body />

          <Right />
        </Header>

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

          <Card style={{ ...style.main, borderRadius: verticalScale(15) }}>
            <CardItem style={{ flex: 1, borderRadius: verticalScale(15) }}>
              <Body>
                <View style={style.brandName}>
                  <Text style={style.brandName_text}>{this.props.me.username}</Text>
                </View>
                <View style={{ height: verticalScale(20) }} />
                {
                  isProfileIncomplete && (
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: "#F40100",
                        borderRadius: 50,
                        position:"absolute",
                        marginTop: 38,
                        marginLeft: 32,
                        zIndex: 9,
                      }}
                    />
                  )
                }
                <Link
                  title="Settings"
                  icon={bSettings}
                  onPress={() => this.props.navigation.navigate("UserSettings")}
                />
                <Link
                  title="Support"
                  icon={bSuppourt}
                  onPress={() => this.props.navigation.navigate("UserSupport")}
                />
                <Link
                  title="Privacy Policy"
                  icon={bPrivacy}
                  onPress={() =>
                    this.props.navigation.navigate("UserLegal", {
                      type: "privacy",
                      mode: 'user',
                      title: "Privacy Policy",
                    })
                  }
                />
                <Link
                  title="Terms and Conditions"
                  icon={bTerms}
                  onPress={() =>
                    this.props.navigation.navigate("UserLegal", {
                      type: "terms",
                      mode: 'user',
                      title: "Terms And Conditions",
                    })
                  }
                />
              </Body>
            </CardItem>
          </Card>
          <Btn
            block
            rounded
            title="About Scopin"
            color="#5F92F3"
            textColor="white"
            style={{ height: verticalScale(50) }}
            textStyle={{
              fontFamily: IS_ANDROID
                ? "SignPainter_HouseScript"
                : "SignPainter", fontSize: moderateScale(18)
            }}
            onPress={() =>
              this.props.navigation.navigate("UserLegal", {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
