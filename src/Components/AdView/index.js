import React from "react"
import {
  Image,
  SafeAreaView,
  ScrollView,
  findNodeHandle,
  Platform,
  TouchableOpacity,ImageBackground,
  View, RefreshControl, Animated,
  Share,
  Linking,
  Dimensions
} from "react-native"
import { isNull, isEmpty, get } from 'lodash'
import { CachedImage } from 'react-native-cached-images';
import { getDistance, convertDistance } from 'geolib';
import open from 'react-native-open-maps';
import { Text, Button, Icon } from "native-base"
import { HeaderBackButton } from "react-navigation-stack"
import numeral from 'numeral';
import CustomIcon from "../../CustomIcon"
import HeaderImageScrollView, { TriggeringView } from '../ImageHeaderScroll/ImageHeaderScroller';
import styles, { likedIconSize } from "./style"
import { moderateScale, verticalScale, scale } from "../../Utils/scaling"
import {
  mcDonald,
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
} from "../../Assets"
import { BlurView } from "@react-native-community/blur"
const IS_ANDROID = Platform.OS === "android";

import { FeatureList } from '../Common'


const ScrollableComponent = (props) => (
    <HeaderImageScrollView
        useNativeDriver
        minHeight={0}
        maxHeight={250}
        renderHeader={() => (
                <View style={{ height: 250, width: Dimensions.get('window').width, backgroundColor: 'black' }} >
                  {
                    props.image ? props.renderPhoto(props.image) : props.theme()
                  }
                </View>
        )}
    renderForeground={props.header}
        showsHorizontalScrollIndicator={props.showsHorizontalScrollIndicator}
        showsVerticalScrollIndicator={props.showsVerticalScrollIndicator}
    >
      <TouchableOpacity activeOpacity={1}>{props.children}</TouchableOpacity>
    </HeaderImageScrollView>
);


export default class AdView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLiked: this.props.post.liked,
      viewRef: null,
      refreshing: false,
      distance: 0,
      calculatedDistance: false,
    };
  }

  componentDidMount() {
    const { userCoordinates, postCoordinates } = this.props;

    if (
      (userCoordinates.latitude !== null && userCoordinates.latitude !== 0) &&
      (userCoordinates.longitude !== null && userCoordinates.longitude !== 0) &&
      (postCoordinates.latitude !== null && postCoordinates.latitude !== 0) &&
      (postCoordinates.longitude !== null && postCoordinates.longitude !== 0)) {

      const distance = convertDistance(getDistance(userCoordinates, postCoordinates), 'mi');
      this.setState({ distance: Math.round(distance * 10) / 10.0, calculatedDistance: true });
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(() => {

      this.setState({refreshing: false});
    }, 300);
  };

  toggleLike = () => {
    this.setState({ isLiked: !this.state.isLiked });
    this.props.pressLiked(!this.state.isLiked);
  };

  renderHeader = () => {
    const { isLiked } = this.state;
    const { params } = this.props.navigation.state;
    if (this.props.skipHeader) {
      return <View />;
    }

    if (this.props.header) {
      return this.props.header;
    }
    let isUser = false;
    if(params !== undefined && params.isUser !== undefined) isUser = params.isUser;
    return (
      <ImageBackground style={{flex: 1}} blurRadius={70}>
        <SafeAreaView style={
          [
            styles.headerContainer,
            IS_ANDROID && { height: verticalScale(60) },
          ]
        }>
          <Button
            transparent
            onPress={() => this.props.navigation.goBack()}
            style={{ marginLeft: scale(15), alignSelf: "center" }}
          >
            <CustomIcon name="arrow" color="white" size={verticalScale(15)} />
          </Button>
          {
            isUser && (
              <View style={styles.heartButton}>
                <TouchableOpacity onPress={this.toggleLike}>
                  <Icon
                    name="heart"
                    style={{ color: "#FFF", right: 3.5, fontSize: likedIconSize + 1.5, position: "absolute", zIndex: 0 }}
                  />
                  <Icon
                    name="heart"
                    style={{ color: isLiked ? "#5F92F3" : "#FFF", right: 2, top: 1.5, zIndex: 9, fontSize: likedIconSize-1 }}
                  />
                </TouchableOpacity>
              </View>
            )
          }
        </SafeAreaView>
      </ImageBackground>
    );
  };

  _renderPhoto = (image) => {
    let photoUrl = get(this.props.post.photo, 'normal.url', null) || this.props.post.photo.url;
    if (photoUrl.startsWith('/uploads')) {
      photoUrl = this.props.editingPost.photo.url;
    }
    return (
      <View style={styles.adImageContainer}>
        <CachedImage
          source={{ uri: image.uri }}
          style={[ styles.adImage, IS_ANDROID && { resizeMode: "stretch" } ]}
          ref={(img) => this.adImage = img }
          onLoadEnd={this.imageLoaded.bind(this)}
        />
        <View style={styles.blurHeaderWrapper}>
          <BlurView
            style={styles.blurHeader}
            viewRef={this.state.viewRef}
            blurType="light"
            blurAmount={7}
            blurRadius={7}
            downsampleFactor={5}
            // overlayColor={"rgba(255, 255, 255, .25)"}
          />
        </View>
      </View>
    );
  };

  _renderTheme = () => {
    return (
      <View style={{  flex: 1 , backgroundColor: this.props.post.colorCode, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>{this.props.post.description }</Text>
      </View>
    );
  };

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.adImage) });
  }

  phoneCall = () => {
    const phoneNumber = this.props.post.firm.phoneNumber;

    if (isEmpty(phoneNumber)) {
      return;
    }

    Linking.openURL(`tel:${phoneNumber}`);
  };

  openLocation = () => {
    const { post: { firm: { city, state } } } = this.props;

    if (city && state) {
      const end = `${city + ',' + state}`;
      open({ end, zoom: 20 });
    }
  };

  share = () => {
    const shareLink = this.props.post.shareLink !== null ? this.props.post.shareLink : '';
    Share.share({
      message: shareLink,
      title: `${this.props.post.firm.name}'s Offer`
    }, {
      // Android only:
      dialogTitle: 'Share this offer',
      // iOS only:
      excludedActivityTypes: [
      ]
    });
  };

  render() {
    if (isEmpty(this.props.post)) {
      return (<View></View>);
    }

    // let photoUrl = get(this.props.post.photo, 'normal.url', null) || this.props.post.photo.url;
    // if (photoUrl.startsWith('/uploads')) {
    //   photoUrl = this.props.editingPost.photo.url;
    // }

    return (
      <ScrollableComponent
          image={ this.props.post.photo.url ? { uri: this.props.post.photo.url } : undefined }
          header={this.renderHeader}
          theme={this._renderTheme}
          renderPhoto={this._renderPhoto}
      >

        {/*{this.renderHeader()}*/}

        <View style={styles.content}>
          {/*{this.props.post.photo.url ? this._renderPhoto() : this._renderTheme()}*/}

          <View style={styles.branchActionsContainer}>
            <View style={{ flexDirection: "column", ...styles.rearActions }}>
              <Button
                style={{ ...styles.actionButton, backgroundColor: "#6FD454" }}
                onPress={this.phoneCall}
              >
                <CustomIcon
                  name="phone"
                  style={{ color: "white", fontSize: moderateScale(18) }}
                />
              </Button>
            </View>

            <View style={{ flexDirection: "column", ...styles.middleActions }}>
              <CachedImage source={{ uri: this.props.post.firm.photo.url }} style={styles.branchLogo} />
              <Text numberOfLines={2} style={styles.branchText}>{this.props.post.firm.name}</Text>
            </View>

            <View style={{ flexDirection: "column", ...styles.rearActions }}>
              <Button
                style={{ ...styles.actionButton, backgroundColor: "#69B4ED" }}
                onPress={this.openLocation}
              >
                <CustomIcon
                  name="map"
                  size={verticalScale(32)}
                  style={{ color: "white" }}
                />
              </Button>

              <Button transparent style={styles.shareButton} onPress={this.share}>
                <CustomIcon
                  name="share"
                  size={verticalScale(17)}
                  // style={{ fontSize: moderateScale(15) }}
                />
              </Button>
            </View>
          </View>

          <View
            style={[
              styles.branchInfo,
              this.props.extended && { paddingBottom: 0 },
            ]}
          >
            <FeatureList
              features={ this.props.post.firm.features }
              containerStyle={ styles.features }
              style={ styles.featureIconsContainer }
              imageStyle={ styles.featureIcons }
            />

            <Text numberOfLines={1} style={styles.firstLine}>
              { this.props.post.firm.businessType }
            </Text>

            <Text numberOfLines={1} style={styles.secondLine}>
              { this.props.post.firm.city }, { this.props.post.firm.state } { this.state.calculatedDistance && this.state.distance && numeral(this.state.distance).format('0.0') } mi
            </Text>

            <Text numberOfLines={1} style={styles.thirdLine}>
              { this.props.post.title }
            </Text>

            {this.props.extended && (
              <View style={styles.extendedGroup}>
                <Button transparent style={styles.extendedButton}>
                  <Text style={{ ...styles.extendedText, color: "#000000" }}>
                    OFFERS
                  </Text>
                </Button>

                <View style={styles.verticalDivider} />

                <Button transparent style={styles.extendedButton}>
                  <Text style={{ ...styles.extendedText, color: "#6E6969" }}>
                    ABOUT US
                  </Text>
                </Button>
              </View>
            )}
          </View>

          {React.cloneElement(this.props.children, {
            isLiked: this.state.isLiked,
          })}
        </View>
      </ScrollableComponent>
    );
  }
}
