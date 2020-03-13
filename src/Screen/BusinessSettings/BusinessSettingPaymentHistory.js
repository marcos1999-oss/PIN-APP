import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ScrollableComponent } from "../../Components/ScrollableComponent";
import { Button } from "native-base";
import { Btn } from "../../Components/Common";
import Image from "react-native-auto-height-image";
import moment from 'moment';
import { map } from 'lodash';
import Carousel from "react-native-snap-carousel";
import CustomIcon from "../../CustomIcon";
import { manthCardRectangle } from "../../Assets";
import { errorMessage } from '../../Utils/alerts'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import numeral from 'numeral'

import style from "./style";
import { scale, verticalScale, moderateScale } from "../../Utils/scaling";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

import { getMe, getFirmReports, getFirmReportsMeta } from '../../redux/selectors/index'
import * as paymentActions from '../../redux/actions/paymentActions'
import Fonts from "../../Themes/Fonts";


const Report = (props) => (
  <View>
    <View
      style={{ paddingHorizontal: scale(20), paddingTop: verticalScale(20) }}
    >
      <Text
        style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: moderateScale(10),
        }}
      >
        Purchased
      </Text>
    </View>

    <View style={{ height: verticalScale(175) }}>
      <ScrollView>
        <TouchableOpacity activeOpacity={1}>
          <View
            style={{
              paddingHorizontal: scale(20),
              paddingBottom: verticalScale(20),
            }}
          >
            <View style={{ height: verticalScale(30) }} />

            {map(props.currentReport.pinCatalogsSpent, (pinCatalog) => {
              return (
                <React.Fragment>
                  <View
                    style={{ flexDirection: "row", justifyContent: "space-between" }}
                  >
                    <Text style={{ color: "#fff", fontSize: moderateScale(14) }}>
                      {pinCatalog.title}
                    </Text>

                    <Text style={{ color: "#fff", fontSize: moderateScale(14) }}>
                      {props.monthly ? (
                        numeral(pinCatalog.totalSpentInCents / 100).format('$0,0.00')
                      ) : (
                          numeral(pinCatalog.dailySpentInCents / 100).format('$0,0.00')
                        )}
                    </Text>
                  </View>

                  <View style={{ height: verticalScale(10) }} />
                </React.Fragment>
              );
            })}
          </View>

          <View
            style={{
              height: verticalScale(0.6),
              backgroundColor: "rgba(255,255,255,0.5)",
            }}
          />

          <View
            style={{
              paddingHorizontal: scale(20),
              paddingVertical: verticalScale(20),
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "#fff", fontSize: moderateScale(14) }}>
                Total
              </Text>

              <Text style={{ color: "#fff", fontSize: moderateScale(14) }}>
                {props.monthly ? (
                  numeral(props.currentReport.totalSpentCents / 100).format('$0,0.00')
                ) : (
                    numeral(props.currentReport.dailySpentCents / 100).format('$0,0.00')
                  )}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  </View>
);

const ToggleSwitch = (props) => (
  <View style={style.m_toggleSwitch}>
    <Btn
      small
      transparent={!props.left}
      rounded
      title={props.leftText}
      style={[
        style.m_toggleSwitch_switch,
        props.right && { backgroundColor: "transparent" }, //mean swtich is active on right handed side
      ]}
      textStyle={[
        style.m_toggleSwitch_switch_text,
        props.right && { color: "#fff" },
      ]}
      onPress={props.leftAction}
    />
    <Btn
      small
      transparent={!props.right}
      rounded
      title={props.rightText}
      style={[
        style.m_toggleSwitch_switch,
        props.left && { backgroundColor: "transparent" },
      ]}
      textStyle={[
        style.m_toggleSwitch_switch_text,
        props.left && { color: "#fff" },
      ]}
      onPress={props.rightAction}
    />
  </View>
);

const MonthCard = (props) => (
  <TouchableOpacity activeOpacity={1} style={style.m_monthCard}>
    <View style={{ height: verticalScale(25) }} />
    <Text style={style.m_monthCard_txt1}>{moment().month(props.month - 1).year(props.year).format('MMMM YYYY')}</Text>
    <View style={{ height: verticalScale(25) }} />
    <Text style={style.m_monthCard_txt2}>{numeral(props.totalSpentCents / 100).format('$0,0.00')}</Text>
    <View style={{ height: verticalScale(5) }} />
    <Text style={style.m_monthCard_txt1}>Total Spent</Text>

    <Image
      source={manthCardRectangle}
      width={scale(341)}
      style={style.m_monthCard_bottom_mask}
    />

    <View style={style.m_monthCard_bottom}>
      <View style={style.m_monthCard_bottom_child}>
        <Text style={style.m_monthCard_txt3}>{props.totalLikes}</Text>
        <Text style={style.m_monthCard_txt4}>Total Likes</Text>
      </View>

      <View style={style.m_monthCard_bottom_child}>
        <Text style={style.m_monthCard_txt3}>{props.pinsPurchased}</Text>
        <Text style={style.m_monthCard_txt4}>Pins Purchased</Text>
      </View>

      <View style={style.m_monthCard_bottom_child}>
        <Text style={style.m_monthCard_txt3}>{props.peopleReached}</Text>
        <Text style={style.m_monthCard_txt4}>People Reached</Text>
      </View>
    </View>
  </TouchableOpacity>
);


class BusinessSettingPaymentHistory extends React.Component {
  state = {
    paymentType: "monthly", // daily
    fabBarStatus: "",
    currentIndex: 0,
  };

  sendEmailMonth = () => {
    this.props.paymentActions.sendPayments({
      // TODO, send active month
      params: { month: 1, year: 2019 },
      onSuccess: () => {
        this.setState({ fabBarStatus: 'emailSent' });
      },
      onFail: (error) => {
        errorMessage({ message: 'Error when sending the email', description: error.message });
      }
    });
  };

  sendEmailAll = () => {
    this.props.paymentActions.sendPayments({
      onSuccess: () => {
        this.setState({ fabBarStatus: 'emailSent' });
      },
      onFail: (error) => {
        errorMessage({ message: 'Error when sending the email', description: error.message });
      }
    });
  };

  renderReportDetails = () => {
    const currentReport = this.props.firmReports[this.state.currentIndex];

    if (currentReport && !currentReport.spent_account) {
      return (
        <View style={{ flex: 1, marginTop: scale(20) }}>
          <Text style={[Fonts.style.description, { color: '#fff', textAlign: 'center' }]}>Payment history will display all your expenses. Currently you have no payment history.</Text>
        </View>
      );
    }
    return (
      <Report currentReport={currentReport} monthly={this.state.paymentType === 'monthly'} />
    );
  };

  renderMonth = ({ item, index }) => {
    return (
      <MonthCard key={index} {...item} />
    );
  };

  onSnapToItem = (index) => {
    this.setState({ currentIndex: index });
  };

  render() {
    const { paymentType, fabBarStatus } = this.state;
    return (
      <View style={style.l_container}>
        <View style={{ alignItems: "center" }}>
          <CustomIcon name="setting" size={verticalScale(40)} color={"#fff"} />
        </View>
        <View>
          <Carousel
            data={this.props.firmReports}
            renderItem={this.renderMonth.bind(this)}
            sliderWidth={sliderWidth}
            itemWidth={style.m_monthCard.width}
            enableSnap={true}
            onSnapToItem={this.onSnapToItem}
            inactiveSlideScale={0.95}
            layoutCardOffset={18}
            layout={'stack'}
            inactiveSlideOpacity={1}
            enableMomentum={true}
            activeSlideAlignment={"start"}
            activeAnimationType={"spring"}
            activeAnimationOptions={{
              friction: 4,
              tension: 40,
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: scale(20),
            marginTop: scale(30),
            flex: 1,
          }}
        >
          <View
            style={{
              paddingHorizontal: scale(40),
              paddingBottom: verticalScale(10),
            }}
          >
            <ToggleSwitch
              left={paymentType === "monthly"}
              right={paymentType === "daily"}
              leftText={"Monthly"}
              rightText={"Daily"}
              leftAction={() => this.setState({ paymentType: "monthly" })}
              rightAction={() => this.setState({ paymentType: "daily" })}
            />
          </View>

          <View style={{ flex: 1 }}>
            {this.renderReportDetails()}

            <View style={{ height: verticalScale(10) }} />

            <View style={style.m_fabButton}>
              <View style={{ flexGrow: 2 }}>
                {fabBarStatus === "clicked" && (
                  <View>
                    <Btn
                      rounded
                      small
                      block
                      color="#fff"
                      textStyle={{
                        color: "#000",
                        fontSize: moderateScale(10),
                        fontWeight: "bold",
                      }}
                      title="Email *Month*"
                      onPress={this.sendEmailMonth}
                    />

                    <View style={{ height: verticalScale(10) }} />

                    <Btn
                      rounded
                      small
                      block
                      color="#fff"
                      textStyle={{
                        color: "#000",
                        fontSize: moderateScale(10),
                        fontWeight: "bold",
                      }}
                      title="Email All History"
                      onPress={this.sendEmailAll}
                    />
                  </View>
                )}

                {fabBarStatus === "emailSent" && (
                  <Btn
                    rounded
                    small
                    block
                    color="#AAFF9F"
                    textStyle={{
                      color: "#000",
                      fontSize: moderateScale(10),
                      fontWeight: "bold",
                    }}
                    title="Please check your emails"
                  />
                )}
              </View>

              <View
                style={{
                  paddingHorizontal: scale(20),
                  paddingTop: 0,
                  paddingBottom: verticalScale(20),
                }}
              >
                <View
                  style={[
                    style.m_fabButton_statusLight,
                    fabBarStatus === "emailSent" && {
                      backgroundColor: "#AAFF9F",
                    },
                  ]}
                />

                <Button
                  onPress={() => this.setState({ fabBarStatus: "clicked" })}
                  rounded
                  small
                  style={{
                    backgroundColor: "#fff",
                    width: scale(48),
                    height: verticalScale(48),
                    justifyContent: "center",
                  }}
                >
                  <CustomIcon
                    name={
                      fabBarStatus === "emailSent"
                        ? "checkMark"
                        : "emailNotification"
                    }
                    size={verticalScale(18)}
                    color={fabBarStatus === "emailSent" ? "#41AD49" : "#25B7D3"}
                  />
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firmReportsMeta: getFirmReportsMeta(state),
    me: getMe(state),
    firmReports: getFirmReports(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    paymentActions: bindActionCreators(paymentActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessSettingPaymentHistory);
