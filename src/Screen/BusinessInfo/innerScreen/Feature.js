import React from "react";
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Switch from "react-native-switch-pro";
import Image from "react-native-auto-height-image";
import { map, find, findIndex, slice, isUndefined, pick, reject } from 'lodash';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import validationSchema from "../validationSchema";
import { FormContainer } from "../Common";
import { getFeatures, getFeaturesMeta, getMe } from '../../../redux/selectors/index'
import * as featureActions from '../../../redux/actions/featureActions'
import * as authActions from '../../../redux/actions/authActions'

import {
  alcohol,
  baby,
  driveThrough,
  heart,
  music,
  parking,
  party,
  pet,
  reservation,
  wifi,
  valetParking,
  city2,
} from "../../../Assets";
/*Style*/
import style from "../style.js";
import { scale, moderateScale, verticalScale } from "../../../Utils/scaling";
import { Card, CardItem, Body } from "native-base";
import { ScrollableComponent } from "../../../Components/ScrollableComponent";

const featureIcons = {
  alcohol,
  baby,
  driveThrough,
  heart,
  music,
  parking,
  party,
  pet,
  reservation,
  wifi,
  valetParking,
};


class BusinessFeature extends React.Component {
  state = {
    companyId: this.props.navigation.getParam('me').company_id,
    companyFlags: this.props.navigation.getParam('me').company_flags,
    companyFeatures: this.props.navigation.getParam('me').company_features,
  };

  componentWillMount() {
    if (!this.props.featuresMeta.loading && !this.props.featuresMeta.loaded) {
      this.props.featureActions.fetchFeatures({
        onFail: error => {
          errorMessage({ message: 'Could not load the features', description: error.message });
        }
      });
    }
  }

  componentWillUnmount() {
    this.onSubmit();
  }

  onSubmit = () => {
    const flagsAttributes = map(this.state.companyFlags, (flag) => {
      return pick(flag, ['id', 'feature_id', '_destroy']);
    });

    const params = {
      owned_firm_attributes: {
        id: this.state.companyId,
        flags_attributes: flagsAttributes,
      }
    };

    this.props.navigation.getParam('authActions').updateAccount({ userType: 'business', params });
  };

  submit = function() {};

  SwitchList = ({ featureId, checked, label, last, key }) => (
    <View
      style={[
        style.m_SwitchList,
        { height: verticalScale(50) },
        last && { borderBottomWidth: 0 },
      ]}
      key={key}
    >
      <Text style={{ color: "#555555", fontSize: moderateScale(14) }}>
        {label}
      </Text>
      <View>
        {checked && (
          <Text
            style={{
              fontSize: moderateScale(10),
              color: "gray",
              position: "absolute",
              top: verticalScale(-15),
              right: 0,
            }}
          >
            Yes
          </Text>
        )}
        <Switch
          width={scale(40)}
          height={verticalScale(22)}
          value={checked}
          backgroundActive="#56D926"
          onAsyncPress={(callback) =>
            callback(true, (value) => {
              let companyFlags;

              if (value) {
                const flag = find(this.state.companyFlags, { feature_id: featureId });

                if (isUndefined(flag)) {
                  companyFlags = [
                    ...this.state.companyFlags,
                    { feature_id: featureId }
                  ];
                } else {
                  const index = findIndex(this.state.companyFlags, { feature_id: featureId });

                  companyFlags = [
                    ...slice(this.state.companyFlags, 0, index),
                    { id: flag.id, feature_id: flag.feature_id },
                    ...slice(this.state.companyFlags, index + 1),
                  ];
                }
              } else {
                const flag = find(this.state.companyFlags, { feature_id: featureId });

                if (!isUndefined(flag)) {
                  const index = findIndex(this.state.companyFlags, { feature_id: featureId });

                  if (flag.id) {
                    companyFlags = [
                      ...slice(this.state.companyFlags, 0, index),
                      { id: flag.id, feature_id: flag.feature_id, _destroy: 1 },
                      ...slice(this.state.companyFlags, index + 1),
                    ];
                  } else {
                    companyFlags = reject(this.state.companyFlags, { feature_id: featureId } );
                  }
                }
              }

              this.setState({ companyFlags });

              const companyFeatures = map(reject(companyFlags, { _destroy: 1 }), (flag) => {
                return find(this.props.features, { id: flag.feature_id.toString() });
              });
              this.props.authActions.setCompanyFeatures({ features: companyFeatures });
            })
          }
        />
      </View>
    </View>
  );

  render() {
    const screenHeight = Dimensions.get("window").height;

    return (
      <View style={style.l_container}>
        <View style={{ height: verticalScale(130) }} />
        <View
          style={{
            alignItems: "center",
            zIndex: 1,
            position: "absolute",
            width: "100%",
            top: verticalScale(15),
            left: 0,
          }}
        >
          <Image
            source={city2}
            width={Dimensions.get("window").width / 1.5}
            style={{ position: "absolute" }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: scale(10),
            marginTop: verticalScale(-10),
            zIndex: 2,
            position: "absolute",
            top: verticalScale(80),
          }}
        >
          <Card style={{ borderRadius: verticalScale(20) }}>
            <CardItem style={{ borderRadius: verticalScale(20) }}>
              <View
                style={{
                  paddingHorizontal: scale(10),
                  paddingVertical: verticalScale(10),
                  width: "100%",
                  height: verticalScale(92),
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "center",
                }}
              >
                {map(this.props.me.company_features, (feature, idx) => {
                  return featureIcons[feature.icon] && (
                    <View
                      key={idx}
                      style={{
                        paddingHorizontal: scale(5),
                        paddingBottom: scale(5),
                        position: "relative",
                      }}
                    >
                      <Image source={featureIcons[feature.icon]} width={scale(14)} />
                    </View>
                  )
                })}
                <View style={{ height: verticalScale(20) }} />
              </View>
            </CardItem>
          </Card>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            paddingTop: verticalScale(65),
            // height: screenHeight,
          }}
        >
          <Text
            style={{
              color: "#89c3ed",
              fontSize: moderateScale(10),
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Customers would like to know if you offer any of the following
          </Text>
          <View
            style={{
              height: screenHeight - verticalScale(250),
              paddingTop: verticalScale(30),
              paddingBottom: verticalScale(45),
              paddingHorizontal: scale(30),
            }}
          >
            <ScrollableComponent showsVerticalScrollIndicator={false}>
              {map(this.props.features, (feature, idx) => {
                const flag = find(this.state.companyFlags, { feature_id: parseInt(feature.id) });
                const checked = !isUndefined(flag) && (!flag._destroy || flag._destroy !== 1);

                return this.SwitchList({
                  featureId: parseInt(feature.id),
                  checked,
                  label: feature.description,
                  last: idx === (this.props.features.length - 1),
                  key: idx,
                });
              })}
            </ScrollableComponent>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    me: getMe(state),
    featuresMeta: getFeaturesMeta(state),
    features: getFeatures(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    featureActions: bindActionCreators(featureActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessFeature);
