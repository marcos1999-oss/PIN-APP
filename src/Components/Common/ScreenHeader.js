import React from "react";
import { Header, Left, Right, Body, Title, Button } from "native-base";

import style from "./style/header";

export default (props) => {
  return (
    <Header
      style={{
        backgroundColor: props.color,
        borderBottomColor: props.color,
        height: 60,
      }}
      backgroundColor={props.color}
      androidStatusBarColor={props.color}
      iosBarStyle={props.color === "#fff" ? "dark-content" : "light-content"}
      noShadow={true}
      noLeft={!props.left}
      noRight={!props.right}
    >
      <Left style={{ flex: 1 }}>
        <Button
          transparent
          style={{ width: 70, left: -10, paddingLeft: 20 }}
          onPress={() => props.leftAction && props.leftAction()}
        >
          {props.left && props.left}
        </Button>
      </Left>

      <Body style={{ flex: 2 }}>
        <Title
          style={[
            style.headerTitle,
            { color: props.color === "#fff" ? "#000" : "#fff" },
          ]}
        >
          {props.title}
        </Title>
      </Body>

      <Right style={{ flex: 1 }}>
        <Button transparent onPress={() => props.right && props.rightAction()}>
          {props.right && props.right}
        </Button>
      </Right>
    </Header>
  );
};
