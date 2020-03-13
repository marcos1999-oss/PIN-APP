import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";

export const ScrollableComponent = (props) => (
  <ScrollView
    showsHorizontalScrollIndicator={props.showsHorizontalScrollIndicator}
    showsVerticalScrollIndicator={props.showsVerticalScrollIndicator}
  >
    <TouchableOpacity activeOpacity={1}>{props.children}</TouchableOpacity>
  </ScrollView>
);
