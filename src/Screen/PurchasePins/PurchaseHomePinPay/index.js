import React from "react";
import { Image, Platform } from "react-native";
import {
  Container,
  Header,
  Body,
  Content,
  Text,
  Left,
  Button,
  Right,
  View,
  List,
  ListItem,
  Icon,
} from "native-base";
import styles, { size12 } from "./style";
import CustomIcon from "../../../CustomIcon";
import { Btn, CardContainer } from "../../../Components/Common";
import Modal from "react-native-modal";
import { HeaderBackButton } from "react-navigation-stack"
import { homePin } from "../../../Assets";
import { scale, verticalScale } from "../../../Utils/scaling";

const greenText = "#2BB673";
export default class PurchaseHomePinPay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinDurationTotal: 90,
      pinDurationCurrent: 31,
      isPaySuccess: false,
    };
  }
  pressPay = () => {
    this.setState({ isPaySuccess: true });
    // setTimeout(()=>{this.props.navigation.navigate('')}, 500)
    setTimeout(() => {
      this.setState({ isPaySuccess: false });
    }, 3000);
  };
  render() {
    const pinDurationPercent = Math.floor(
      (this.state.pinDurationCurrent / this.state.pinDurationTotal) * 100
    );
    const { isPaySuccess } = this.state;
    return (
      <Container>
        <Header style={styles.headerContainer}>
          <Left style={{ flex: 1 }}>
            {Platform.OS === "ios" ? (
              <HeaderBackButton
                onPress={() => {
                  if(this.props.navigation && this.props.navigation.state.params && this.props.navigation.state.params.isFromHome) {
                    this.props.navigation.navigate("BusinessHome");
                  } else this.props.navigation.goBack();
                }}
                tintColor={"black"}
              />
            ) : (
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
                style={{ marginLeft: scale(6) }}
              >
                <CustomIcon
                  name="arrow"
                  size={verticalScale(20)}
                  color={"black"}
                />
              </Button>
            )}
          </Left>
          <Body style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: size12 }}>Checkout</Text>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <View style={styles.contentContainer}>
          <View style={styles.pinContainer}>
            <Image source={homePin} style={styles.pinImage} />
          </View>
          <Text style={styles.firstText}>
            Get an extra pin that will reach twice as much.
          </Text>
          <View style={styles.textGroup}>
            <Text style={styles.titleText}>Distance from location</Text>
            <Text style={styles.contentText}>
              Can be dropped within 2 miles from main location
            </Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.titleText}>Pin Range</Text>
            <Text style={styles.contentText}>Pin covers 0.50 range</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.titleText}>Cost</Text>
            <Text style={styles.contentText}>Pin cost $1.00 /day</Text>
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
          <List style={styles.usedCardContainer}>
            <ListItem
              style={styles.usedCardItem}
              onPress={() =>
                this.props.navigation.navigate("BusinessSettingPaymentCard")
              }
            >
              <Left>
                <Text style={styles.cardInUse}>CARD IN USE</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
          <View style={styles.balanceContainer}>
            <View style={styles.currentBalanceContainer}>
              {/* <Text style={{ ...styles.balanceTitle, color: greenText }}>
                Current Balance:
              </Text>
              <Text style={{ ...styles.balanceAmount, color: greenText }}>
                $ 15.00
              </Text> */}
            </View>
            <View style={styles.totalBalanceContainer}>
              <Text style={styles.balanceTitle}>Total:</Text>
              <Text style={styles.balanceAmount}>$ 15.00</Text>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Btn
              onPress={this.pressPay}
              block
              rounded
              color="#FEC248"
              textStyle={styles.btnText}
              title="Pay"
              style={styles.btn}
            />
            <View style={styles.btnDescriptionContainer}>
              <Text style={styles.btnDescription}>
                Pin will be activated as soon as you drag and drop it within map
                on Home Page
              </Text>
            </View>
          </View>
        </View>
        <Modal isVisible={isPaySuccess}>
          <CardContainer style={styles.cardContainer}>
            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <CustomIcon name="confirmCircle" size={32} color={"#2BB673"} />
              <Text style={styles.cardTitle}>Payment Success</Text>
              <Text style={styles.cardSubText}>
                Your payment was successfully completed{" "}
              </Text>
            </View>
          </CardContainer>
        </Modal>
      </Container>
    );
  }
}
