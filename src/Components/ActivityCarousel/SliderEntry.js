import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { ParallaxImage } from "react-native-snap-carousel";
import { CachedImage } from 'react-native-cached-images';
import styles from "./SliderEntry.style";

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  get image() {
    const {
      data: { banner },
      parallax,
      parallaxProps,
      even,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: banner.url }}
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
        <CachedImage source={{ uri: banner.url }} style={styles.image} />
    );
  }

  render() {
    const {
      data: { title, subtitle },
      even,
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          this.props.onPressItem(this.props.data);
        }}
      >
        <View style={styles.shadow} />
        <View style={styles.imageContainer}>
          {this.image}
          {/* <View
            style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}
          /> */}
        </View>
      </TouchableOpacity>
    );
  }
}
