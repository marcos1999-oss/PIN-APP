import React from "react";
import { View, Dimensions, Text } from "react-native";
import { Card, CardItem, Body } from "native-base";
import Image from "react-native-auto-height-image";
import { city2 } from "../../Assets";

/*Style*/
import style from "./style.js";
import { scale, verticalScale } from "../../Utils/scaling";

export const FormContainer = props => (
  <View>
    <View style={{ alignItems: "center", zIndex: 2 }}>
      <Image source={city2} width={Dimensions.get("window").width / 1.5} />
    </View>
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
