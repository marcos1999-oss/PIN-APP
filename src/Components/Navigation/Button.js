import React from "react";
import { Button } from "native-base";
import { View, Text } from "react-native";

import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomIcon from "../../CustomIcon";

/*Style*/
import style from "./style.js";
import { verticalScale } from "../../Utils/scaling";

export default (props) => {
  let iconColor = props.active ? "#0059b2" : "#fff";

  let getIcon = (type) => {
    switch (type) {
      case "Home":
        return (
          <CustomIcon name="store" size={verticalScale(25)} color={iconColor} />
        );

      case "Activity":
        return (
          <CustomIcon name="star" size={verticalScale(25)} color={iconColor} />
        );

      case "Post":
        return (
          <View>
            <View style={{ height: verticalScale(5) }} />
            <CustomIcon name="camera" size={verticalScale(35)} color="#fff" />
          </View>
        );

      case "News":
        return (
          <React.Fragment>
            <CustomIcon
              name="bell"
              size={verticalScale(25)}
              color={iconColor}
            />
            <View style={[style.status, true && style.status_active]} />
          </React.Fragment>
        );

      case "Me":
        return (
          <CustomIcon
            name="avatar"
            size={verticalScale(25)}
            color={iconColor}
          />
        );
    }
  };
  let buttonProps = {
    transparent: true,
  };

  if (props.type === "Post") {
    buttonProps.scaleX = 1.2;
    buttonProps.scaleY = 1.2;
  }
  return (
    <Button
      onPress={props.onPress}
      style={[
        style.navigation_item,
        props.type === "Post" && style.navigation_item_post,
      ]}
      {...buttonProps}
    >
      {getIcon(props.type)}
      <Text
        style={[
          style.navigation_item_text,
          props.active && props.type !== "Post" && { color: "#0059b2" },
        ]}
      >
        {props.type}
      </Text>
    </Button>
  );
};
