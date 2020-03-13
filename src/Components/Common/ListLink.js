import React from "react";
import { Text, View } from "react-native";
import { Button } from "native-base";
import CustomIcon from "../../CustomIcon";

import style from "./style/listLink";
import { moderateScale, scale, verticalScale } from "../../Utils/scaling";

export default (props) => (
  <Button
    transparent
    style={[style.m_link, props.last && { borderBottomWidth: 0 }, props.style]}
    onPress={() => props.onPress()}
  >
     {
      props.isIncorrect && (
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: "#F40100",
            position: "absolute",
            borderRadius: 50,
            zIndex: 9,
          }}
        />
      )
    }
    <Text style={style.m_link_text}>{props.title}</Text>
    <View style={style.m_link_icon}>
      <CustomIcon name="arrowRight" size={7} color={"#fff"} />
    </View>
  </Button>
);

export const ListLinkHeader = (props) => (
  <View
    style={{
      ...style.m_link_header,
      backgroundColor: "#1B9FB9",
      paddingHorizontal: scale(50),
      // paddingVertical: verticalScale(50),
      ...props.style,
    }}
  >
    <Text
      style={{
        ...style.m_link_text,
        fontSize: moderateScale(15),
        fontWeight: "600",
        ...props.textStyle,
      }}
    >
      {props.title}
    </Text>
  </View>
);
