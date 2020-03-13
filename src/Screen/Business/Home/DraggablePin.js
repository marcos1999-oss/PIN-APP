import React from "react";
import {Animated, PanResponder, Platform,View, Easing, Image} from "react-native";
import { SvgUri } from 'react-native-svg';
import {boundary, pinSize} from "./style";
import { shadow } from "../../../Assets";
import {verticalScale} from "../../../Utils/scaling";
import CustomIcon from "../../../CustomIcon";
import {Colors} from "../../../Themes";
const IS_IOS = Platform.OS === "ios";

export class DraggablePin extends React.Component {
  constructor(props) {
    super(props);

    let isUsed = false;
    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gesture) => true,
      onPanResponderGrant: (event, gesture) => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
        position.setValue({ x: 0, y: 0 });

        this.setState({
          panStart: true,
          width: new Animated.Value(0)
        });

        this._expandAnimation();
      },
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {

        this.setState({
          panStart: false,
          width: new Animated.Value(0)
        });

        position.flattenOffset();
        const { moveX, moveY, y0, dy } = gesture;
        const { locationY } = event.nativeEvent;

        if (moveX && moveY) {
          //check if inside boundary
          if (IS_IOS) {
            if (
                moveX > boundary.x0 &&
                moveX < boundary.x1 &&
                moveY + (verticalScale(40) - locationY) < boundary.y1
            ) {
              position.setValue({ x: 0, y: 0 });
            } else {

              const success = this.props.locationListener(this.props.pin, {
                x: moveX,
                y: moveY + (verticalScale(40) - locationY) + 40,
              });

              if (success) {
                this.setState({ isUsed });
              } else {
                position.setValue({ x: 0, y: 0 });
              }
            }
          } else {
            if (
              moveX > boundary.x0 &&
              moveX < boundary.x1 &&
              dy + verticalScale(114) < boundary.y1
            ) {
              position.setValue({ x: 0, y: 0 });
            } else {

              const success = this.props.locationListener(this.props.pin, {
                x: moveX,
                y: dy + verticalScale(114),
              });

              if (success) {
                this.setState({ isUsed });
              } else {
                position.setValue({ x: 0, y: 0 });
              }
            }
          }
        }
      },
    });

    this.state = {
      panResponder,
      position,
      isUsed,
      panStart: false,
      width: new Animated.Value(0)
    };
  }

// <Animated.View
//   // style={[style.pin, this.state.position.getLayout()]}
// style={[this.state.position.getLayout()]}
// {...handles}
// >
// <CustomIcon name="pin" size={pinSize} />
// {/* <Image source={pinIcon} style={style.pinIcon} /> */}
// </Animated.View>

  _expandAnimation() {
    Animated.timing(this.state.width, {
      toValue: 1,
      duration: 500,
      delay: 100,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      if (this.state.panStart) {
        this._shrinkAnimation()
      }
    });
  }

  _shrinkAnimation() {
    Animated.timing(this.state.width, {
      toValue: 0,
      duration: 500,
      delay: 100,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      if (this.state.panStart) {
        this._expandAnimation()
      }
    });
  }

  render() {
    if (this.state.isUsed) return true;



    let handles = this.state.panResponder.panHandlers;
    let position = this.props.positionPin;

    let iconUrl = this.props.pin.iconUrl;
    if (!iconUrl || !iconUrl.endsWith('.svg')) {
      iconUrl = 'https://storage.googleapis.com/pin-app-production/pin.svg';
    }

    const interpolatedWidth = this.state.width.interpolate({
      inputRange: [0, 1],
      outputRange: [24, 30],
    });

    const interpolatedRadius = this.state.width.interpolate({
      inputRange: [0, 1],
      outputRange: [12, 15],
    });

    return (
      <View style={{ flex:1, alignItems: position, justifyContent: position }}>
        <Animated.View
          // style={[style.pin, this.state.position.getLayout()]}
          style={[this.state.position.getLayout()]}
          {...handles}
        >
          <SvgUri width={pinSize} height={pinSize} fill={this.props.pin.colour} uri={iconUrl} />

          {
            this.state.panStart && (
                <Animated.View style={{
                  width: interpolatedWidth,
                  height: interpolatedWidth,
                  alignSelf: 'center',
                  marginTop: 40,
                  borderRadius: interpolatedRadius,
                  borderWidth: 1,
                  borderColor: "black",
                  borderStyle: "dotted",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <Image style={{
                    width: 45,
                    height: 45,
                    tintColor: Colors.text
                  }} source={shadow}
                  />
                </Animated.View>
            )
          }

        </Animated.View>
      </View>
    );
  }
}
