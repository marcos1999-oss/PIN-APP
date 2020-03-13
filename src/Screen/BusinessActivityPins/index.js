import React from "react";
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
} from "native-base";
import styles, { size12 } from "./style";
import ActivityCarousel from "../../Components/ActivityCarousel";
import CustomIcon from "../../CustomIcon";
import { moderateScale, scale, verticalScale } from "../../Utils/scaling";
import { Btn, CardContainer } from "../../Components/Common";
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty, findIndex } from 'lodash'
import numeral from 'numeral'

import { errorMessage } from '../../Utils/alerts'

import { getPinsMeta, getViewingPin, getMyPins, getPinCatalogs } from '../../redux/selectors/index'
import * as pinActions from '../../redux/actions/pinActions'
import * as authActions from '../../redux/actions/authActions'
import * as pinCatalogActions from '../../redux/actions/pinCatalogActions'


class BusinessActivityPins extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowDelete: false,
    };
  }

  componentWillMount() {
    if (!this.props.pinsMeta.loadingMine && !this.props.pinsMeta.loadedMine) {
      this.props.pinActions.fetchMyPins({
        onFail: error => {
          errorMessage({ message: 'Could not load your pins', description: error.message });
        }
      });
    }
  }

  onPressPin = (item) => {
    const { navigation, pinCatalogs, pinCatalogActions } = this.props;

    const idx = pinCatalogs && findIndex(pinCatalogs, { id: String(item.pinCatalogId) });
    const pinCatalog = (idx && pinCatalogs) && pinCatalogs[idx];

    (pinCatalogActions && pinCatalog) && pinCatalogActions.viewPinCatalog({
      pinCatalog,
      callback: () => {
        navigation.navigate("PurchasePins", { from: navigation.state.routeName, idx: idx });
      },
    });
  };

  deletePin = () => {
    const { pin, pinActions, authActions, navigation } = this.props;

    (pin && authActions && navigation) && pinActions.deletePin({
      pin,
      onSuccess: () => {
        authActions.fetchMe({ userType: 'business' });
        navigation.navigate("BusinessActivity");
      },
      onFail: (error) => {
        errorMessage({ message: 'Could not delete this pin', description: error.message });
      }
    });
  };

  onSnapToItem = (index) => {
    const { pinActions, pins } = this.props;
    pinActions && pinActions.viewPin({ pin: pins && pins[index] });
  };

  render() {
    const { isShowDelete } = this.state;
    const { navigation, pins, pin } = this.props;

    const pinDurationPercent = (pin && pin.consumedDays && pin.duration) ? Math.floor(
      (pin.consumedDays / pin.duration) * 100
    ) : 0;

    return (
      <Container>
        <Header style={styles.headerContainer}>
          <Left>
            <Button transparent style={styles.closeButton} onPress={() => navigation.goBack()}>
              <CustomIcon name="close" style={styles.closeIcon} />
            </Button>
          </Left>

          <Body>
            <Text style={{ fontSize: size12 }}>My Activity</Text>
          </Body>

          <Right />
        </Header>

        <Content>
          {pins && <ActivityCarousel
            carouselIndex={navigation.getParam('idx')}
            data={pins}
            onPressItem={this.onPressPin}
            onSnapToItem={this.onSnapToItem}
          />}

          <View style={styles.pinContainer}>
            <Text style={styles.firstText}>
              {(pin && pin.pinCatalogDescription) && pin.pinCatalogDescription}
            </Text>

            <View style={styles.textGroup}>
              <Text style={styles.titleText}>Distance from location</Text>
              <Text style={styles.contentText}>
                {!(pin && pin.item && pin.item.childOfId) ? "Extra Pins can be dropped within" : "Can be dropped within"} {pin.miles} miles from main location
              </Text>
            </View>

            <View style={styles.textGroup}>
              <Text style={styles.titleText}>Pin Range</Text>
              <Text style={styles.contentText}>Pin covers {(pin && pin.range) && pin.range} range</Text>
            </View>

            <View style={styles.textGroup}>
              <Text style={styles.titleText}>Cost</Text>
              <Text style={styles.contentText}>Pin cost {numeral(pin.dailyPriceInCents / 100.0).format('$0,0.00')} /day</Text>
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
                  {(pin && pin.duration) && pin.duration} days
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

            <View style={styles.usedAmountContainer}>
              <Text style={styles.used}>used</Text>
              <Text style={styles.currencySymbol}>$</Text>
              <Text style={styles.amount}>{(pin && pin.consumedBalance) ? numeral(pin.consumedBalance / 100.0).format('0,0.00') : '0.00'}</Text>
            </View>

            {!(pin && pin.isHome) && (
              <View style={styles.btnContainer}>
                <Btn
                  onPress={() => {
                    this.setState({ isShowDelete: true });
                  }}
                  block
                  rounded
                  color="#C75151"
                  textStyle={styles.btnText}
                  title="Delete Pin"
                  style={styles.btn}
                />
                <Text style={styles.btnDescription}>
                  By deleting the pin will remove it from maps,
                </Text>
                <Text style={styles.btnDescription}>
                  and won’t be visible to users. Not able for reactivation again.
                </Text>
              </View>
            )}
          </View>
        </Content>

        <Modal isVisible={isShowDelete}>
          <CardContainer style={styles.cardContainer}>
            <View
              style={{
                paddingHorizontal: scale(10),
                paddingTop: verticalScale(10),
                paddingBottom: 0,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#6E6969",
                  fontSize: moderateScale(16),
                  fontWeight: "bold",
                }}
              >
                Are you sure you want to delete pin?
              </Text>
              <View style={{ height: verticalScale(20) }} />
              <View>
                <Btn
                  rounded
                  title="Delete"
                  style={styles.btnDelete}
                  textStyle={styles.textDelete}
                  onPress={this.deletePin}
                />
                <Btn
                  transparent
                  title="CANCEL"
                  style={{ width: styles.btnDelete.width }}
                  textStyle={styles.cancelText}
                  onPress={() => this.setState({ isShowDelete: !isShowDelete })}
                />
              </View>
            </View>
          </CardContainer>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pinsMeta: getPinsMeta(state),
    pin: getViewingPin(state),
    pins: getMyPins(state),
    pinCatalogs: getPinCatalogs(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    pinActions: bindActionCreators(pinActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
    pinCatalogActions: bindActionCreators(pinCatalogActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessActivityPins);
