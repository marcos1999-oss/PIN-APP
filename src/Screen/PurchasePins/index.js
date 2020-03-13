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
import { moderateScale } from "../../Utils/scaling";
import ActivityCarousel from "../../Components/ActivityCarousel";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import numeral from 'numeral'
import { isEmpty } from 'lodash'

import styles from "./style";
import CustomIcon from "../../CustomIcon";
import { Btn } from "../../Components/Common";
import { StackActions, NavigationActions, NavigationEvents } from "react-navigation";
import { errorMessage } from '../../Utils/alerts'

import {
  getPinCatalogsMeta,
  getViewingPinCatalog,
  getPinCatalogs,
  getHasHomePin,
  getPinCatalogPagination
} from '../../redux/selectors/index'
import * as pinCatalogActions from '../../redux/actions/pinCatalogActions'


class PurchasePins extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pinDurationTotal: 90,
      pinDurationCurrent: 30,
    };
  }

  componentWillMount() {
    if (!this.props.pinCatalogsMeta.loading && !this.props.pinCatalogsMeta.loaded) {
      this.props.pinCatalogActions.fetchPinCatalogs({
        currentPage: this.props.postPagination.currentPage,
        perPage: this.props.postPagination.perPage,
        onSuccess: () => {
          if (!isEmpty(this.props.pinCatalogs) && !this.props.pinCatalog) {
            this.props.pinCatalogActions.viewPinCatalog({ pinCatalog: this.props.pinCatalogs[this.props.navigation.getParam('idx') || 0] });
          }
        },
        onFail: error => {
          errorMessage({ message: 'Could not load the store', description: error.message });
        }
      });
    } else {
      if (!this.props.pinCatalog) {
        this.props.pinCatalogActions.viewPinCatalog({ pinCatalog: this.props.pinCatalogs[this.props.navigation.getParam('idx') || 0] });
      }
      if (!this.props.pinCatalog.description) {
        const initialPinCatlogId = this.props.pinCatalogs[0].id;
        this.props.pinCatalogActions.viewPinCatalog({ pinCatalog: this.props.pinCatalogs[this.props.navigation.getParam('idx') || initialPinCatlogId] });
      }
    }
  }

  onSnapToItem = (index) => {
    this.props.pinCatalogActions.viewPinCatalog({ pinCatalog: this.props.pinCatalogs[index] });
  };

  _renderPinCatalog = () => {
    if (this.props.pinCatalog) {
      const pinDurationPercent = Math.floor(
        (this.state.pinDurationCurrent / this.state.pinDurationTotal) * 100
      );
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>
            { this.props.pinCatalog.description }
          </Text>

          <View style={styles.pinInfoContainer}>
            <View style={styles.pinInfoItem}>
              <Text style={styles.pinInfoPerformance}>{ this.props.pinCatalog.miles } mi</Text>
              <Text style={styles.pinInfoDescription}>Drop Distance</Text>
            </View>
            <View style={[styles.pinInfoItem, styles.middleItem]}>
              <Text style={styles.pinInfoPerformance}>{ this.props.pinCatalog.range } mi</Text>
              <Text style={styles.pinInfoDescription}>Pin Range</Text>
            </View>
            <View style={styles.pinInfoItem}>
              <Text
                style={styles.pinInfoPerformance}>{ numeral(this.props.pinCatalog.dailyPriceInCents / 100.0).format('$0,0.00') }</Text>
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
                { this.props.pinCatalog.durationInDays } days
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
              onPress={() => this.props.navigation.navigate("PurchasePinsPay")}
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
      );
    } else {
      return (<View></View>);
    }
  };

  render() {
    const { navigation } = this.props;
    const from = navigation.getParam("from", "Home");

    return (
      <Container>
        <Header style={styles.headerContainer}>
          <Left style={{ flex: 1 }}>
            <Button transparent style={styles.closeButton}>
              <CustomIcon
                name="close"
                style={styles.closeIcon}
                onPress={() => {
                  if (from === "Home") {
                    navigation.dispatch(
                      StackActions.reset({
                        index: 0,
                        key: null,
                        actions: [
                          navigation.navigate("BusinessActivity"),
                        ],
                      })
                    ),
                      navigation.navigate("Home");
                  } else {
                    navigation.navigate(from);
                  }
                }}
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

        {this.props.hasHomePin && (
          <Content>
            <ActivityCarousel
              carouselIndex={this.props.navigation.getParam('idx')}
              data={this.props.pinCatalogs}
              onSnapToItem={this.onSnapToItem}
            />

            { this._renderPinCatalog() }
          </Content>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pinCatalogsMeta: getPinCatalogsMeta(state),
    pinCatalog: getViewingPinCatalog(state),
    pinCatalogs: getPinCatalogs(state),
    hasHomePin: getHasHomePin(state),
    pinCatalogPagination: getPinCatalogPagination(state),

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    pinCatalogActions: bindActionCreators(pinCatalogActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchasePins);