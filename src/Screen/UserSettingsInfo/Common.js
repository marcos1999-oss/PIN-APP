import React from "react";
import { View } from "react-native";
import { Card, CardItem, Body } from "native-base";
import { scale, verticalScale } from "../../Utils/scaling";

export const FormContainer = (props) => (
  <View>
    <View
      style={{
        paddingHorizontal: scale(10),
        marginTop: verticalScale(-10),
        zIndex: 1,
      }}
    >
      <Card style={{ borderRadius: verticalScale(20) }}>
        <CardItem style={{ borderRadius: verticalScale(20) }}>
          <Body>
            <View
              style={{
                paddingHorizontal: scale(10),
                paddingVertical: verticalScale(10),
                width: "100%",
              }}
            >
              {props.children}
            </View>
          </Body>
        </CardItem>
      </Card>
    </View>
  </View>
);
