import React from "react";

import { Text, View, ActivityIndicator } from "react-native";

import { Button } from "native-base";
import { moderateScale } from "../../Utils/scaling";

export default (props) => {
  return (
    <Button
      {...props}
      style={[
        { opacity: 1 },
        props.style,
        props.color && { backgroundColor: props.color },
        props.disabled && { opacity: 0.9 },
      ]}
    >
      {props.isLoading && <ActivityIndicator size="large" color={props.loadingColor || "#fff"} />}
      {!props.isLoading && (
        <React.Fragment>
          {props.preText && (
            <Text style={props.preTextStyle}>{props.preText} </Text>
          )}
          <Text
            style={[
              { fontSize: moderateScale(16) },
              props.textStyle,
              props.textColor && { color: props.textColor },
            ]}
          >
            {props.title && props.title}
          </Text>
        </React.Fragment>
      )}
    </Button>
  );
};
