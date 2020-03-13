import React from "react";
import { View, ActivityIndicator } from "react-native";

export default (props) => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      backgroundColor: props.bgcolor || "#fff",
    }}
  >
    <ActivityIndicator size="large" color={props.color || "#5F92F3"} />
  </View>
);
