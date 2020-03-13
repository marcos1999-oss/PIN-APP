import React from "react";
import {
  Text,
  View,
  Image,
  Alert,
  Animated,
  Easing,
  Platform,
  StatusBar,
  PermissionsAndroid,
  Dimensions,
} from "react-native";
import { Container, Button } from "native-base";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Btn } from "../../../Components/Common";
import { greenPin, currentLocation, pinIcon, locationIcon } from "../../../Assets";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { map, min } from 'lodash'
import { errorMessage } from '../../../Utils/alerts'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import Geolocation from "@react-native-community/geolocation";
import firebase from 'react-native-firebase';

/*Style*/
import style, {
  btnStartNowStyle,
  LONGITUDE_DELTA,
  LATITUDE_DELTA,
} from "./style.js";
import { getDistance, convertDistance } from "geolib";
import { CustomMarker } from "./CustomMarker";
import { DraggablePin } from "./DraggablePin";

import {
  getIsProfileComplete,
  getHasCardOnFile,
  getHasHomePin,
  getHomePin,
  getHomePinCatalog,
  getMyAvailablePins,
  getMyActivatedPins, getHomeConnectedUsers, getPinsConnectedUsers,
  getPostsPagination,
  getPinCatalogPagination,
} from '../../../redux/selectors/index'
import * as authActions from '../../../redux/actions/authActions'
import * as pinActions from '../../../redux/actions/pinActions'
import * as pinCatalogActions from '../../../redux/actions/pinCatalogActions'
import * as postActions from '../../../redux/actions/postActions'
import * as holidayActions from '../../../redux/actions/holidayActions'
import * as featureActions from '../../../redux/actions/featureActions'
import * as firmReportActions from '../../../redux/actions/firmReportActions'
import AsyncStorage from "@react-native-community/async-storage";
import createNotificationListner from '../../../Components/Notifications';
import { verticalScale } from "../../../Utils/scaling";


class BusinessHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {},
      position: {},
      ready: true,
      filteredMarkers: [],
      pinSelected: 0,
      pixelsPerMile: 0,
      maxSize: 0,
      topBoxOpacity: new Animated.Value(1),
      showConnectedUsersBox: false,
      permissionGranted: false,
    };
  }
  // map = null;

  setRegion(region) {
    if (this.state.ready) {
      setTimeout(() => this.map && this.map.animateToRegion(region), 10);
    }
    //this.setState({ region });
  }

  componentWillMount() {
    this._preload();
  }

  async componentDidMount() {
    if (Platform.OS === 'ios') {
      this.setState({ permissionGranted: true });

      this.getCurrentPosition();
      this.watchPosition();
      Dimensions.addEventListener('change', () => this.map && this.map.animateToRegion(this.state.region));

      PushNotificationIOS.addEventListener('register', this._onRegister.bind(this));
      PushNotificationIOS.addEventListener('notification', this._onNotification.bind(this));
      PushNotificationIOS.requestPermissions();
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Get your location to drop pins on map',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({ permissionGranted: true });
        this.getCurrentPosition();
        this.watchPosition();
        Dimensions.addEventListener('change', () => this.map && this.map.animateToRegion(this.state.region));
        this.getToken();
      }
    }
    createNotificationListner(this.props);

  }

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

  _checkForConnectedUsers() {
    const {
      isProfileComplete,
      availablePins
    } = this.props;

    const hasPins = availablePins && availablePins.length > 0;

    if (isProfileComplete && !hasPins) {
      this.setState({
        showConnectedUsersBox: true
      });

      setTimeout(() => {
        this._fadeOutTopBox(() => {
          this.setState({
            showConnectedUsersBox: false
          });
        });
      }, 10000);
    }
  }

  _onRegister(token) {

    this.props.authActions.updateAccount({
      userType: 'business',
      params: { push_notification_token: token }
    });
  }

  _onNotification(notification) {
    console.log(`Message: ${notification.getMessage()};\n
      badge: ${notification.getBadgeCount()};\n
      sound: ${notification.getSound()};\n
      category: ${notification.getCategory()};\n
      content-available: ${notification.getContentAvailable()}.`);
  }

  _preload() {
    this.props.pinActions.fetchMyPins({
      onSuccess: () => {
        this._checkForConnectedUsers();
      },
      onFail: error => {
        errorMessage({ message: 'Could not load your pins', description: error.message });
      }
    });

    this.props.postActions.fetchMyPosts({
      currentPage: this.props.postPagination.currentPage,
      perPage: this.props.postPagination.perPage,
      onFail: error => {
        errorMessage({ message: 'Could not load your posts', description: error.message });
      }
    });

    this.props.pinCatalogActions.fetchPinCatalogs({
      currentPage: this.props.pinCatalogPagination.currentPage,
      perPage: this.props.pinCatalogPagination.perPage,
      onFail: error => {
        errorMessage({ message: 'Could not load the store', description: error.message });
      }
    });

    this.props.holidayActions.fetchHolidays({
      onFail: error => {
        errorMessage({ message: 'Could not load the holidays', description: error.message });
      }
    });

    this.props.featureActions.fetchFeatures({
      onFail: error => {
        errorMessage({ message: 'Could not load the features', description: error.message });
      }
    });

    this.props.firmReportActions.fetchCurrentFirmReport({
      onFail: error => {
        errorMessage({ message: 'Could not load the payment details', description: error.message });
      }
    });

    this.props.firmReportActions.fetchFirmReports({
      onFail: error => {
        errorMessage({ message: 'Could not load the payment history', description: error.message });
      }
    });
  }

  watchPosition() {
    try {
      navigator.geolocation.watchPosition(
        position => {
          this.setState({
            position: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });
        },
        e => {
        }
      );
    } catch (e) {

    }
  }

  moveToUserLocation() {
    const { position, ready } = this.state;
    if (ready) {
      const region = {
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      setTimeout(() => this.map && this.map.animateToRegion(region), 10);
    }
  }

  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          this.setState({
            position: position.coords
          });
          this.setRegion(region);
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
    } catch (e) {
      throw e;
    }
  }

  dropPin = (pin, location) => {
    const { x, y } = location;

    this.map && this.map
      .coordinateForPoint({ x, y })
      .then((coords) => {

        const { latitude, longitude } = coords;

        if (this.props.hasHomePin) {
          const homePinCoords = {
            latitude: this.props.homePin.lat,
            longitude: this.props.homePin.lng,
          };

          const distanceInMeters = getDistance(
            { latitude, longitude },
            homePinCoords,
          );
          const distance = convertDistance(distanceInMeters, 'mi');

          if (distance > pin.miles) {
            // TODO, show error message
            errorMessage({ message: 'Distance not allowed', description: `This Pin must placed within ${pin.miles} miles from your Company address` });
            return false;
          }
        }

        this.props.pinActions.activatePin({
          pin,
          latitude,
          longitude,
          onSuccess: () => {
            const { availablePins } = this.props;
            if (availablePins.length === 0) {
              this._fadeOutTopBox();
            }
          },
          onFail: error => {
            errorMessage({ message: 'Could not active this pin', description: error.message });
          }
        });
      })
      .catch((e) => alert(e));
  };

  movePin = (pin, latitude, longitude) => {
    this.props.pinActions.activatePin({
      pin,
      latitude,
      longitude,
      onFail: error => {
        errorMessage({ message: 'Could not move this pin', description: error.message });
      }
    });
  };

  _fadeOutTopBox = (callBack) => {
    const { topBoxOpacity } = this.state;

    Animated.timing(
      topBoxOpacity,
      {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear
      }
    ).start(callBack)
  };

  _renderAvailablePins = () => {
    return map(this.props.availablePins, (pin) => {
      return (
        <DraggablePin
          key={pin.id}
          pin={pin}
          locationListener={this.dropPin}
          positionPin={"center"}
        />
      );
    });
  };

  _renderConnectedUsersBox = () => {
    const { showConnectedUsersBox, topBoxOpacity } = this.state;
    const { homeConnectedUsers, pinsConnectedUsers } = this.props;
    if (showConnectedUsersBox) {
      return (
        <Animated.View style={[style.top, { opacity: topBoxOpacity }]}>
          <View style={style.topBoxContentStyle}>
            <View style={style.topBoxRowStyle}>
              <Image source={locationIcon} resizeMode={'contain'} style={style.imgLocationStyle} />
              <Text numberOfLines={2} style={style.topBoxLabelStyle}>{`Your location connected with ${homeConnectedUsers} users`}</Text>
            </View>
            <View style={style.topBoxRowStyle}>
              <Image source={pinIcon} resizeMode={'contain'} style={style.imgLocationStyle} />
              <Text style={style.topBoxLabelStyle}>{`Pins connected with ${pinsConnectedUsers} users`}</Text>
            </View>
          </View>
        </Animated.View>
      )
    }
    return null;
  };

  _renderActivatedPins = ({ homePinCoords }) => {
    return map(this.props.activatedPins, (pin, idx) => {
      const active = this.state.pinSelected === idx + 1;

      return (
        <CustomMarker
          pin={pin}
          pixelsPerMile={this.state.pixelsPerMile}
          maxSize={this.state.maxSize}
          title={`Pin ${idx + 1}`}
          coordinate={{ latitude: pin.lat, longitude: pin.lng }}
          key={idx}
          homePin={homePinCoords}
          maxDistance={5}
          isDraggable={pin.isDraggable}
          isHome={pin.isHome}
          isFixed={pin.isFixed}
          movePin={this.movePin}
        />
        // <Marker
        //   ref={marker => (this._marker = marker)}
        //   onLayout={this.onLoadMarker}
        //   coordinate={p}
        //   title={`Pin ${idx + 1}`}
        //   key={idx}
        //   onDragEnd={e => {
        //     pinPosition[idx] = e.nativeEvent.coordinate;
        //     this.setState({ pinPosition: cloneDeep(pinPosition) });
        //   }}
        //   onDrag={e => {
        //     const distanceMeter = getDistance(
        //       homePin,
        //       e.nativeEvent.coordinate
        //     );
        //   }}
        // >
        //   {active ? (
        //     <AnimatedPin>
        //       <CustomIcon
        //         name="pin2"
        //         size={normalPinSize}
        //         color="white"
        //       />
        //     </AnimatedPin>
        //   ) : (
        //     <TouchableOpacity
        //       style={style.normalPinContainer}
        //       onPress={() => this.setState({ pinSelected: idx + 1 })}
        //     >
        //       <CustomIcon
        //         name="pin2"
        //         size={normalPinSize}
        //         color="white"
        //       />
        //     </TouchableOpacity>
        //   )}
        // </Marker>
      );
    });
  };

  onRegionChangeComplete = (region) => {
    console.log("region: ", region);
    const distanceInMeters = getDistance(
      { latitude: region.latitude, longitude: region.longitude + (region.longitudeDelta / 2) },
      { latitude: region.latitude, longitude: region.longitude - (region.longitudeDelta / 2) },
    );
    const distance = convertDistance(distanceInMeters, 'mi');

    const { width } = Dimensions.get('window');

    const maxSize = min([Dimensions.get('window').width, Dimensions.get('window').height]);

    const pixelsPerMile = distance === 0 ? 0 : (width / distance);

    this.setState({ region, pixelsPerMile, maxSize });
  };

  startNow = () => {
    if (!this.props.isProfileComplete) {
      this.props.navigation.navigate("BusinessInfo");
      return;
    }

    if (!this.props.hasCardOnFile && this.props.homePinCatalog) {
      this.props.navigation.navigate("BusinessSettingPaymentCard", { isFromHome: true });
      return;
    }

    if (!this.props.hasHomePin) {
      if (this.props.homePinCatalog) {
        this.props.pinCatalogActions.viewPinCatalog({
          pinCatalog: this.props.homePinCatalog,
          callback: () => {
            this.props.navigation.navigate('PurchasePinsPay', { isFromHome: true });
          },
        });
      }
      else {
        this.props.navigation.navigate('PurchaseHomePin', { isFromHome: true });
      }
    }
  };

  renderTopBox = () => {
    const { availablePins } = this.props;
    const { topBoxOpacity } = this.state;

    if (this.props.isProfileComplete && this.props.hasCardOnFile && this.props.hasHomePin) {
      if (availablePins && availablePins.length > 0) {
        return (
          <Animated.View style={[style.top, { opacity: topBoxOpacity }]}>
            <Text style={style.top_title}>
              Here are your pins.{"\n"}Drag and Drop them on the map.
              </Text>
            <View style={style.wrapPinIconContainer}>
              {this._renderAvailablePins()}
            </View>
          </Animated.View>
        );
      } else {
        return this._renderConnectedUsersBox();
      }
    } else {
      return (
        <View style={style.top}>
          <Text style={{ ...style.top_title, fontWeight: "400" }}>
            {this.props.isProfileComplete ? this.props.hasHomePin ? 'Begin by placing your pin' : "Activate your home pin" : 'Complete your business account'}
          </Text>

          <View style={style.wrapViewBtnStartStyle}>
            <Btn
              block
              rounded
              title="Start Now"
              onPress={this.startNow}
              {...btnStartNowStyle}
            />
          </View>
        </View>
      );
    }
  };


  render() {
    const { navigation } = this.props;
    const homePinCoords = this.props.hasHomePin && {
      latitude: this.props.homePin.lat,
      longitude: this.props.homePin.lng,
    };

    return (
      <Container style={style.container}>
        <StatusBar barStyle="dark-content" />

        {this.state.permissionGranted &&
          <MapView
            provider={PROVIDER_GOOGLE}
            moveOnMarkerPress={false}
            showsUserLocation
            ref={(map) => {
              this.map = map;
            }}
            onRegionChangeComplete={this.onRegionChangeComplete}
            style={style.map}
            showsIndoors={false}
          >
            {this._renderActivatedPins({ homePinCoords })}
          </MapView>
        }

        {this.renderTopBox()}

        <View style={style.bottom}>
          <Button
            transparent
            onPress={() => {
              this.props.isProfileComplete ? navigation.navigate("PurchasePins", {
                from: navigation.state.routeName,
              }) : navigation.navigate("BusinessInfo")
            }}
          >
            <Image source={greenPin} style={style.btnLocationStyle} />
          </Button>

          <Button style={{ marginTop: verticalScale(5) }} transparent onPress={() => this.moveToUserLocation()}>
            <Image source={currentLocation} style={style.btnLocationStyle} />
          </Button>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activatedPins: getMyActivatedPins(state),
    availablePins: getMyAvailablePins(state),
    homePinCatalog: getHomePinCatalog(state),
    isProfileComplete: getIsProfileComplete(state),
    hasCardOnFile: getHasCardOnFile(state),
    hasHomePin: getHasHomePin(state),
    homePin: getHomePin(state),
    homeConnectedUsers: getHomeConnectedUsers(state),
    pinsConnectedUsers: getPinsConnectedUsers(state),
    postPagination: getPostsPagination(state),
    pinCatalogPagination: getPinCatalogPagination(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    pinActions: bindActionCreators(pinActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch),
    pinCatalogActions: bindActionCreators(pinCatalogActions, dispatch),
    holidayActions: bindActionCreators(holidayActions, dispatch),
    featureActions: bindActionCreators(featureActions, dispatch),
    firmReportActions: bindActionCreators(firmReportActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessHome);
