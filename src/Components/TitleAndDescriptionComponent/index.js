import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Fonts, Colors } from "../../Themes";
import { scale, verticalScale } from "../../Utils/scaling";

const styles = StyleSheet.create({
  titleStyle: {
    paddingBottom: verticalScale(20),
  },
  titleTextStyle: {
    ...Fonts.style.title,
    color: Colors.white,
  },
  descriptionTextStyle: {
    ...Fonts.style.description,
    color: Colors.white,
    fontWeight: "bold",
  },
});

export default function({
  title,
  titleStyle = {},
  titleTextStyle = {},
  description,
  descriptionTextStyle = {},
  subDescription,
  style = {},
}) {
  return (
    <View style={style}>
      <View style={{ ...styles.titleStyle, ...titleStyle }}>
        <Text style={{ ...styles.titleTextStyle, ...titleTextStyle }}>
          {title}
        </Text>
      </View>
      <View>
        <Text
          style={{ ...styles.descriptionTextStyle, ...descriptionTextStyle }}
        >
          {description}
        </Text>
      </View>
      {subDescription && (
        <View>
          <Text
            style={{ ...styles.descriptionTextStyle, ...descriptionTextStyle }}
          >
            {subDescription}
          </Text>
        </View>
      )}
    </View>
  );
}
