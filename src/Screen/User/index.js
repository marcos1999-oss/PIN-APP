import React from "react"
import {
  View,
  SafeAreaView,
  TouchableOpacity, Animated,
  Easing,
  Platform,
  PermissionsAndroid,
} from "react-native"
import { connect } from "react-redux"
import { Button } from "native-base"
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import SwipeMode from "./SwipeMode"
import GridMode from "./GridMode"
const SIZE = responsiveHeight(7);
import { bindActionCreators } from 'redux'
import { map } from 'lodash'
import regionMonitor from '@hkpuits/react-native-region-monitor';
import Geolocation from 'react-native-geolocation-service';
import { setData, getData } from '../../redux/utils/storage';
import { CachedImage } from 'react-native-cached-images';
import { _ } from 'lodash';
import firebase from 'react-native-firebase';

import {
  getMe,
  getUserCoordinates,
  getPosts,
  getSearchedPosts,
  getViewingPost,
  getPostsMeta,
  getNearestPins,
  getPinsMeta,
  getPostsPagination,
} from '../../redux/selectors/index'
import * as authActions from "../../redux/actions/authActions"
import * as postActions from "../../redux/actions/postActions"
import * as pinActions from "../../redux/actions/pinActions"

/*Style*/
import style from "./style.js"
import { verticalScale } from "../../Utils/scaling"
import CustomIcon from "../../CustomIcon"
import { responsiveHeight } from "../../Utils/dimensions"
import AsyncStorage from "@react-native-community/async-storage";


class UserScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeControl: 1,
      isClick: false,
      hasLocationPermission: false,
      shownLocationPermission: false,
      pendingNotifications: false,
    };

    this.growAnimated = new Animated.Value(0);
  }

  componentWillMount() {

    this.preload();

    getData('pending_notifications').then((pendingNotifications) => {
      this.setState({ pendingNotifications: pendingNotifications });
    });
  }

  componentDidMount = async () => {

    if (Platform.OS === 'ios') {
      regionMonitor.onRegionChange((event) => {
        const { didEnter, didExit, region, location } = event;
        const { identifier } = region;

        if (didEnter) {
          // const { latitude, longitude } = location;

          Geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;

            this.props.pinActions.visitPin({ id: identifier, latitude, longitude });
          });
        }
      });
    }

    this.getToken();
    await this.requestLocationPermission();
  };

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
        this._onRegister(fcmToken);
      }
    }
  }

  _onRegister(token) {

    this.props.authActions.updateAccount({
      userType: 'user',
      params: { push_notification_token: token }
    });
  }

  _onNotification(notification) {
    console.log(`Message: ${notification.getMessage()};\n
      badge: ${notification.getBadgeCount()};\n
      sound: ${notification.getSound()};\n
      category: ${notification.getCategory()};\n
      content-available: ${notification.getContentAvailable()}.`);

    if (Platform.OS === 'ios') {
      PushNotificationIOS.getApplicationIconBadgeNumber((n) => {
        PushNotificationIOS.setApplicationIconBadgeNumber(n + 1);
      });
    }

    this.setState({ pendingNotifications: true }, () => {
      setData('pending_notifications', true);
    });
  }

  preload() {
    if (!this.props.postsMeta.loading && !this.props.postsMeta.loaded) {
      this.props.postActions.fetchPosts({
        currentPage: this.props.pagination.currentPage,
        perPage: this.props.pagination.perPage
      });
    }
  }

  trackLocation() {

    if (this.state.hasLocationPermission) {

      Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.props.authActions.locationSuccess({ latitude, longitude });
          this.props.authActions.updateAccount({
            userType: 'user',
            params: { latitude: latitude, longitude: longitude }
          });

          if (!this.props.pinsMeta.loadingNear) {
            this.props.pinActions.fetchNearestPins({
              params: {
                lat: latitude,
                lng: longitude,
              },
              onSuccess: this.setupRegions,
            });
          }
        },
        (error) => {
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          distanceFilter: 100,
        }
      );
    }
  }

  requestLocationPermission = async () => {
    try {
      if (Platform.OS === "android" && Platform.Version >= 23) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Scopin needs access to your location',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.setState(
            { hasLocationPermission: true, shownLocationPermission: true },
            this.trackLocation
          );
        } else {
          this.setState({ hasLocationPermission: false, shownLocationPermission: true });
        }
      } else {
        this.setState(
          { hasLocationPermission: true },
          this.trackLocation
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  setupRegions = () => {
    const pins = this.props.pins;

    regionMonitor.clearRegions().then(() => {

      map(pins, (pin) => {
        const center = {
          latitude: pin.lat,
          longitude: pin.lng,
        };
        const radius = pin.range * 1609.344;
        const identifier = pin.id;
        regionMonitor.addCircularRegion(center, radius, identifier).then(() => {
        }).catch((error) => {
          console.log(error);
        });
      });
    });
  };

  searchPosts = (query) => {
    this.props.postActions.searchPosts({ params: { params: { q: query } } });
  };

  renderContent = () => {
    switch (this.state.activeControl) {
      case 1:
        return <SwipeMode data={this.props.posts} initialCardIndex={0} {...this.props} />;
      case 2:
        return <GridMode {...this.props} />;
      default:
        return <GridMode hasSearch {...this.props} posts={this.props.searchedPosts} onSearch={this.searchPosts} />;
    }
  };

  pressHeartIcon() {
    this.setState({ isClick: true });

    this.growAnimated = new Animated.Value(0);
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this.props.navigation.navigate("UserFavorites", { onDidFocus: () => { this.setState({ isClick: false }) } });
    }, 300);

    if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
      this.setState({ pendingNotifications: false }, () => {
        setData('pending_notifications', false);
      });
    }
  }

  render() {
    const { activeControl, pendingNotifications } = this.state;
    const { me } = this.props;
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, SIZE],
    });

    if (this.state.isClick) {
      return (
        <View style={{
          flex: 1,
          alignItems: 'flex-end',
          backgroundColor: 'white',
        }}>
          <Animated.View
            style={[{
              height: SIZE,
              width: SIZE,
              marginTop: -SIZE,
              borderRadius: responsiveHeight(10),
            }, { backgroundColor: this.state.isClick ? '#5F92F3' : 'transparent' },
            { transform: [{ scale: changeScale }] }]}
          />
        </View>
      )
    }
    const isProfileIncomplete = _.some(me, _.isEmpty);
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView>
          <View style={style.header}>
            {
              isProfileIncomplete && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#F40100",
                    borderRadius: 50,
                    position: "absolute",
                    marginTop: 10,
                    marginLeft: 50,
                    zIndex: 9,
                  }}
                />
              )
            }
            <TouchableOpacity
              // transparent
              style={{
                width: verticalScale(35),
                height: verticalScale(35),
                borderRadius: verticalScale(17.5),
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                this.props.navigation.navigate("UserProfile")
              }
            >
              <CachedImage
                source={{ uri: this.props.me.photo.url }}
                style={{
                  // flex: 1,
                  width: verticalScale(37),
                  height: verticalScale(37),
                }}
              />
            </TouchableOpacity>

            <Button
              rounded
              onPress={this.pressHeartIcon.bind(this)}
              style={{
                ...style.headerIcon,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#5F92F3",
              }}
            >
              {/* <Animated.View style={{ ...style.heartBufferLayer, transform }} /> */}
              <CustomIcon
                name="heart3"
                size={verticalScale(13)}
                color="white"
              />
              {pendingNotifications === true ? <View style={style.blueDot} /> : <View />}
            </Button>

          </View>
        </SafeAreaView>
        <View style={style.controlPanel}>
          <Button
            transparent
            style={style.controlButton}
            onPress={() => this.setState({ activeControl: 1 })}
          >
            <CustomIcon
              name="layoutBlock"
              style={
                activeControl == 1
                  ? style.activeControlIcon
                  : style.inactiveControlIcon
              }
            />
          </Button>
          <Button
            transparent
            style={style.middleControlButton}
            onPress={() => this.setState({ activeControl: 2 })}
          >
            <CustomIcon
              name="list"
              style={
                activeControl == 2
                  ? style.activeControlIcon
                  : style.inactiveControlIcon
              }
            />
          </Button>
          <Button
            transparent
            style={style.controlButton}
            onPress={() => this.setState({ activeControl: 3 })}
          >
            <CustomIcon
              name="magnifyingGlass"
              style={
                activeControl == 3
                  ? style.activeControlIcon
                  : style.inactiveControlIcon
              }
            />
          </Button>
        </View>

        {this.renderContent()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    me: getMe(state),
    userCoordinates: getUserCoordinates(state),
    posts: getPosts(state),
    searchedPosts: getSearchedPosts(state),
    post: getViewingPost(state),
    postsMeta: getPostsMeta(state),
    pins: getNearestPins(state),
    pinsMeta: getPinsMeta(state),
    pagination: getPostsPagination(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch),
    pinActions: bindActionCreators(pinActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
