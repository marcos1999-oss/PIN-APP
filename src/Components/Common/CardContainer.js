import React from "react";
import { Card, CardItem, Body } from "native-base";
import { verticalScale } from "../../Utils/scaling";

export default (props) => (
  <Card style={[{ borderRadius: verticalScale(20) }, props.style]}>
    <CardItem style={{ borderRadius: verticalScale(20) }}>
      <Body>{props.children}</Body>
    </CardItem>
  </Card>
);
