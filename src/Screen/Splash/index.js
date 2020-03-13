import React from "react";
import { StyleSheet, Animated, Easing, Platform } from "react-native";
import { Root, Container, View, Text } from "native-base";
import { Colors } from "../../Themes";
import { moderateScale } from "../../Utils/scaling";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    Animated.loop(
      Animated.timing(this.animation, {
        toValue: 1,
        easing: Easing.out(Easing.sin),
        useNativeDriver: true,
        duration: 1000,
      })
    ).start();
  }
  render() {
    const IS_ANDROID = Platform.OS === "android";
    const transform = [
      {
        scale: this.animation.interpolate({
          inputRange: [0, 0.25, 0.5, 0.75, 1],
          outputRange: [1, 1.2, 1.1, 1.5, 1],
        }),
      },
    ];
    return (
      <Root>
        <View style={{ flex:1,backgroundColor: Colors.background,
            alignItems: "center",
            justifyContent: "center",}}>
          <View style={{ backgroundColor: "transparent" }}>
            <Animated.Text
              style={{
                fontFamily: IS_ANDROID
                  ? "SignPainter_HouseScript"
                  : "SignPainter",
                color: "white",
                fontSize: moderateScale(42),
                transform,
              }}
            >
              scopin
            </Animated.Text>
          </View>
        </View>
      </Root>
    );
  }
}
