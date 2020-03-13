import React from "react";
import { Image, TouchableOpacity, Platform } from "react-native";
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
import { CachedImage } from 'react-native-cached-images';
import { moderateScale, verticalScale, scale } from "../../../Utils/scaling";
import { Btn, CardContainer } from "../../../Components/Common";
import Modal from "react-native-modal";
import { HeaderBackButton } from "react-navigation-stack"
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import numeral from 'numeral'
import { showMessage } from 'react-native-flash-message'

import { errorMessage } from '../../../Utils/alerts'

import { getMe, getViewingPinCatalog } from '../../../redux/selectors/index'
import * as pinCatalogActions from '../../../redux/actions/pinCatalogActions'
import * as pinActions from '../../../redux/actions/pinActions'
import * as authActions from '../../../redux/actions/authActions'


const greenText = "#2BB673";

class PurchasePinsPay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      pinDurationTotal: 90,
      pinDurationCurrent: 31,
      isPaySuccess: false,
    };
  }

  pressPay = () => {
    this.setState({ isLoading: true });

    this.props.pinActions.buyPin({
      pinCatalog: this.props.pinCatalog,
      onSuccess: () => {
        this.props.authActions.fetchMe({ userType: 'business' });
        this.props.pinActions.fetchMyPins({});
        this.setState({ isPaySuccess: true }, () => {
          setTimeout(() => {
            this.setState({ isPaySuccess: false, isLoading: false });
            this.props.navigation.navigate('BusinessHome'); // Home
          }, 3000);
        });
      },
      onFail: (error) => {
        this.setState({ isLoading: false });

        showMessage({
          message: 'Failed to buy this Pin',
          type: 'danger',
        });
      }
    });
  };

  render() {
    const pinDurationPercent = Math.floor(
      (this.state.pinDurationCurrent / this.state.pinDurationTotal) * 100
    );
    const { isPaySuccess, isLoading } = this.state;

    const total = this.props.me.company_available_balance - this.props.pinCatalog.price;

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
          <View
            style={styles.pinContainer}
          >
            <CachedImage source={{ uri: this.props.pinCatalog.banner.url }} style={styles.pinImage} />
          </View>
          <Text style={styles.firstText}>
            {this.props.pinCatalog.description}
          </Text>
          <View style={styles.textGroup}>
            <Text style={styles.titleText}>Distance from location</Text>
            <Text style={styles.contentText}>
              Can be dropped within {this.props.pinCatalog.miles} miles from main location
            </Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.titleText}>Pin Range</Text>
            <Text style={styles.contentText}>Pin covers {this.props.pinCatalog.miles} range</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.titleText}>Cost</Text>
            <Text style={styles.contentText}>Pin cost {numeral(this.props.pinCatalog.dailyPriceInCents / 100.0).format('$0,0.00')} /day</Text>
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
                // TODO, fix
                //errorMessage({ message: 'Not Implemented!', description: 'You can not change the card yet' })
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
              <Text style={{ ...styles.balanceTitle, color: "#5F92F3" }}>
                Current Balance:
              </Text>
              <Text style={{ ...styles.balanceAmount, color: "#5F92F3" }}>
                {numeral(this.props.me.company_available_balance / 100).format('$0,0.00')}
              </Text>
            </View>
            <View style={styles.totalBalanceContainer}>
              <Text style={styles.balanceTitle}>Total:</Text>
              <Text style={styles.balanceAmount}>{numeral(total / 100).format('$0,0.00')}</Text>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Btn
              onPress={this.pressPay}
              disabled={isLoading}
              isLoading={isLoading}
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

const mapStateToProps = (state) => {
  return {
    me: getMe(state),
    pinCatalog: getViewingPinCatalog(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    pinCatalogActions: bindActionCreators(pinCatalogActions, dispatch),
    pinActions: bindActionCreators(pinActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchasePinsPay);
