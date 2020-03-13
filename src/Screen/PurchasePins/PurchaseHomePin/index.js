import React from "react";
import {
  Text,
  Container,
  Header,
  Body,
  Content,
  Left,
  Button,
  Right,
  View,
} from "native-base";
import { Platform } from 'react-native';
import { moderateScale } from "../../../Utils/scaling";
import ActivityCarousel from "../../../Components/ActivityCarousel";

import styles from "./style";
import CustomIcon from "../../../CustomIcon";
import { Btn } from "../../../Components/Common";

export default class PurchaseHomePin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinDurationTotal: 90,
      pinDurationCurrent: 31,
    };
  }
  render() {
    const pinDurationPercent = Math.floor(
      (this.state.pinDurationCurrent / this.state.pinDurationTotal) * 100
    );
    return (
      <Container>
        <Header style={styles.headerContainer}>
          <Left style={{ flex: 1 }}>
            <Button transparent>
              <CustomIcon
                name="close"
                style={styles.closeIcon}
                onPress={() => Platform.OS === 'ios' ? this.props.navigation.navigate("BusinessHome") : this.props.navigation.goBack()}
              />
            </Button>
          </Left>
          <Body style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: moderateScale(12), textAlign: "center" }}>
              Purchase
            </Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content>
          <ActivityCarousel />
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>
              Get an extra pin that will reach twice as much.
            </Text>
            <View style={styles.pinInfoContainer}>
              <View style={styles.pinInfoItem}>
                <Text style={styles.pinInfoPerformance}>1 mi</Text>
                <Text style={styles.pinInfoDescription}>Drop Distance</Text>
              </View>
              <View style={[styles.pinInfoItem, styles.middleItem]}>
                <Text style={styles.pinInfoPerformance}>0.50 mi</Text>
                <Text style={styles.pinInfoDescription}>Pin Range</Text>
              </View>
              <View style={styles.pinInfoItem}>
                <Text style={styles.pinInfoPerformance}>$ 1.00</Text>
                <Text style={styles.pinInfoDescription}>Daily Cost</Text>
              </View>
            </View>
            <View style={styles.textGroup}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.titleText}>Pin Duration</Text>
                <Text style={styles.contentText}>
                  {this.state.pinDurationCurrent} days
                </Text>
              </View>
              <View style={styles.m_progressbar}>
                <View
                  style={{
                    ...styles.m_progressbar_inner,
                    width: (pinDurationPercent || 0) + "%",
                  }}
                />
              </View>
            </View>
            <View style={styles.btnContainer}>
              <Btn
                onPress={() =>
                  this.props.navigation.navigate("PurchaseHomePinPay")
                }
                block
                rounded
                color="#FEC248"
                textStyle={styles.btnText}
                title="Get Pin"
                style={styles.btn}
              />
              <View style={styles.btnDescriptionContainer}>
                <Text style={styles.btnDescription}>
                  Pin will be activated as soon as you drag and drop it within
                  map on Home Page
                </Text>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
