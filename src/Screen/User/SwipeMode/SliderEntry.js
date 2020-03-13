import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ParallaxImage } from "react-native-snap-carousel";
import numeral from 'numeral'
import { isUndefined, isNull } from 'lodash'
import styles from "./SliderEntry.style";
import CustomIcon from "../../../CustomIcon";
import { FeatureList } from '../../../Components/Common'
import { CachedImage } from 'react-native-cached-images';

export default class SliderEntry extends Component {
  constructor(props) {
    super(props);
  }

  get image() {
    const {
      data: { photo },
      parallax,
      parallaxProps,
      even,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: photo.url }}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {},
        ]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.25)"}
        {...parallaxProps}
      />
    ) : (
        <CachedImage
          source={{ uri: photo.url }}
          style={styles.image}
        />
      );
  };

  render() {
    const {
      data: { title, likesCount, viewsCount, firm },
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          this.props.onPressItem(this.props.data);
        }}
      >
        {/* <View style={styles.shadow} /> */}
        <View style={styles.imageContainer}>
          {this.image}
          <View style={styles.radiusMask} />
        </View>
        <View style={styles.dealInfoContainer}>
          <View style={styles.dealLogoContainer}>
            <View style={styles.dealLogoWrapper}>
              <CachedImage source={{ uri: firm.photo.url }} style={styles.dealLogo} />
            </View>
            <Text numberOfLines={1} style={styles.dealBranch}>{firm.name}</Text>
          </View>
          <View style={styles.dealTextContainer}>
            <Text style={styles.subtitle} numberOfLines={1}>
              {title}
            </Text>

            <FeatureList
              features={firm.features}
              containerStyle={styles.features}
              style={{ padding: 4 }}
              imageStyle={styles.featureIcons}
            />

            <View style={styles.dealPerformanceContainer}>
              <View style={styles.likeContainer}>
                <CustomIcon name="heart" style={styles.likeIcon} />
                <Text style={styles.performanceText}>{numeral(likesCount).format('0,0')} Likes</Text>
              </View>
              <View style={styles.watchContainer}>
                <CustomIcon name="eye" />
                <Text style={styles.performanceText}>{numeral(viewsCount).format('0,0')} Views </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
