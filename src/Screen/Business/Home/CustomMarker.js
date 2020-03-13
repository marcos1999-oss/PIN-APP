import React, { memo, useEffect } from "react";
import { Animated, Easing, View } from "react-native";
import { Marker } from "react-native-maps";
import { SvgUri } from 'react-native-svg';
import style, { normalPinSize, homePinSize } from "./style";
import Pulse from "./Pulse";
import CustomIcon from "../../../CustomIcon";

export const CustomMarker = memo(({ pixelsPerMile,
  pin,
  maxSize,
  coordinate,
  title,
  isDraggable,
  isFixed,
  isHome }) => {
  const animation = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        easing: Easing.out(Easing.sin),
        useNativeDriver: true,
        duration: 3000,
      })
    ).start();
  }, []);

  const onDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    movePin(pin, latitude, longitude);
  };

  const convertHex = (hex, opacity) => {
    hex = hex.replace("#", "");
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);

    result = "rgba(" + r + ',' + g + ',' + b + ',' + opacity / 100 + ")";
    return result;
  };

  const renderPin = () => {

    let diameter = pixelsPerMile * (pin.range * 2);

    if (isHome) {
      if (this.props && this.props.maxSize && diameter > this.props.maxSize) {
        diameter = 0;
      }

      const homeStyle = {
        ...style.homePinContainer,
        width: diameter,
        height: diameter,
        borderRadius: diameter,
        borderColor: pin.colour,
      };

      return (
        <View style={isDraggable && homeStyle}>
          <CustomIcon name="home-pin" size={homePinSize} />
        </View>
      );
    } else {
      let pinContainerStyle = {
        ...style.normalPinContainer,
        width: diameter,
        height: diameter,
        borderRadius: diameter,
        backgroundColor: convertHex(pin.colour, 50)
      };

      if (diameter > maxSize) {
        diameter = 0;


        pinContainerStyle = {
          ...pinContainerStyle,
          width: normalPinSize * 2,
          height: normalPinSize * 2,
          borderRadius: normalPinSize,
          backgroundColor: 'transparent',
          borderColor: 'transparent'
        };
      }

      let iconUrl = pin.iconUrl;
      if (!iconUrl || !iconUrl.endsWith('.svg')) {
        iconUrl = 'https://storage.googleapis.com/pin-app-production/pin.svg';
      }

      return (
        <Animated.View style={isDraggable && pinContainerStyle}>
          {isDraggable && <Pulse color={(this.props && this.props.color) && this.props.pin.colour} diameter={Math.round(diameter)} />}
          <SvgUri width={normalPinSize} height={normalPinSize} fill={(this.props && this.props.color) && this.props.pin.colour} uri={iconUrl} />
        </Animated.View>
      );
    }
  };

  return (
    <Marker
      key={`${pin.id}-${Date.now()}`}
      coordinate={coordinate}
      title={title}
      draggable={isDraggable && !isFixed && !isHome}
      onDragEnd={(e) => onDragEnd(e)}
      anchor={{ x: 0.5, y: 0.5 }}
      tracksViewChanges={false}
    >
      {renderPin()}
    </Marker>
  );
})
