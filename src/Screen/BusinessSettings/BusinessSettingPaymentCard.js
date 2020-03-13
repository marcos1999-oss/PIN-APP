import React from "react";
import { SafeAreaView, View, ScrollView, Dimensions } from "react-native";
import { TextInput } from "../../Components/Common";
import CustomIcon from "../../CustomIcon";
import Image from "react-native-auto-height-image";
import { city2 } from "../../Assets";
import { Formik } from "formik";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import style from "./style";
import { Button, Icon } from "native-base";
import { moderateScale, scale, verticalScale } from "../../Utils/scaling";
import { getMe, getCardDetails } from '../../redux/selectors/index'
import * as authActions from '../../redux/actions/authActions'
import * as paymentActions from '../../redux/actions/paymentActions'
import stripe from 'tipsi-stripe'
import { PUBLISHABLE_KEY } from "../../redux/services/config";
import { successMessage, errorMessage } from '../../Utils/alerts'

class BusinessSettingPaymentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon
            name="cross"
            type="Entypo"
            style={{ color: "white", fontSize: moderateScale(30) }}
          />
        </Button>
      ),
    };
  };

  form = {
    fields: {
      number: "",
      exp_month: '',
      exp_year: '',
      exp_cvv: "",
      name: "",
    },
  };

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit });
    this.props.paymentActions.fetchCardDetails({});
    stripe.setOptions({
      publishableKey: PUBLISHABLE_KEY,
      merchantId: 'MERCHANT_ID', // Optional
      androidPayMode: 'test', // Android only
    })
  }

  updateSavingStatus({ isSubmitting }) {
    this.setState({ isSubmitting });
    this.props.navigation.setParams({ isSubmitting });
  }

  submit = () => {
    if (this.formRef) {
      this.formRef.handleSubmit();
    }
  };

  handleValidations = (params, _actions) => {
    if (!params.number) {
      _actions.setFieldError('number', 'Card number is required');
      return false;
    }

    if (!params.name) {
      _actions.setFieldError('name', 'Card name is required');
      return false;
    }

    if (!params.expMonth) {
      _actions.setFieldError('exp_month', 'Expiry month is required');
      return false;
    }

    if (!params.expYear) {
      _actions.setFieldError('exp_year', 'Expiry year is required');
      return false;
    }

    if (!params.cvc) {
      _actions.setFieldError('exp_cvv', 'CVC number is required');
      return false;
    }

    return true;
  }

  onSubmit = (values, _actions) => {
    try {

      const params = {
        number: values['number'],
        expMonth: parseInt(values['exp_month']),
        expYear: parseInt(values['exp_year']),
        cvc: values['exp_cvv'],
        name: values['name'],
      }

      if (this.handleValidations(params, _actions)) {
        if (this.state.isSubmitting) return;

        const { navigation } = this.props;

        this.updateSavingStatus({ isSubmitting: true });

        stripe.createTokenWithCard(params).then((token) => {
          this.props.paymentActions.sendStripeToken({
            token: token.tokenId, onSuccess: (response) => {
              successMessage({
                message: 'Your payment information has been added. Thank you!'
              });

              navigation.goBack();
            },
            onFail: (error) => {
              errorMessage({
                message: 'Error adding payment information', description: error.message
              });
            },
          })
        }).catch((error) => {
          errorMessage({
            message: 'Error adding payment information', description: error.message
          });
        }).finally(() => {
          this.updateSavingStatus({ isSubmitting: false });
        })
      }

    } catch (error) {
      errorMessage({
        message: 'Payment information did not work, please try again.'
      });
      this.updateSavingStatus({ isSubmitting: false });
    }
  };

  render() {
    const deviceWidth = Dimensions.get("window").width;
    const { card } = this.props;

    return (
      <SafeAreaView style={style.l_container}>
        <View style={{ alignItems: "center" }}>
          <CustomIcon name="setting" size={40} color={"#fff"} />
        </View>

        <View
          style={{
            paddingHorizontal: scale(40),
            paddingVertical: verticalScale(40),
          }}
        >
          <ScrollView>
            <Formik key={card.number} onSubmit={this.onSubmit} initialValues={card} ref={(ref) => this.formRef = ref}>
              {(props) => (
                <React.Fragment>
                  <TextInput
                    form={props}
                    formKey="number"
                    placeholder="Card Number"
                    value={props.values.number}
                    placeholderTextColor="#fff"
                    inlineValidation={true}
                    containerStyle={{
                      borderBottomWidth: 0.8,
                      borderBottomColor: "rgba(255,255,255,0.4)",
                    }}
                    style={{ fontSize: moderateScale(14), color: "#fff" }}
                    setRef={() => { }}
                  />
                  <TextInput
                    form={props}
                    formKey="name"
                    placeholder="Name on Card"
                    inlineValidation={true}
                    value={props.values.name}
                    placeholderTextColor="#fff"
                    containerStyle={{
                      borderBottomWidth: 0.8,
                      borderBottomColor: "rgba(255,255,255,0.4)",
                    }}
                    style={{ fontSize: moderateScale(14), color: "#fff" }}
                    setRef={() => { }}
                  />
                  <TextInput
                    form={props}
                    formKey="exp_month"
                    placeholder="Expiration Month"
                    placeholderTextColor="#fff"
                    inlineValidation={true}
                    value={props.values.exp_month}
                    keyboardType="number-pad"
                    maxLength={2}
                    containerStyle={{
                      borderBottomWidth: 0.8,
                      borderBottomColor: "rgba(255,255,255,0.4)",
                    }}
                    style={{ fontSize: moderateScale(14), color: "#fff" }}
                    setRef={() => { }}
                  />
                  <TextInput
                    form={props}
                    formKey="exp_year"
                    placeholder="Expiration Year"
                    inlineValidation={true}
                    placeholderTextColor="#fff"
                    keyboardType="number-pad"
                    maxLength={4}
                    value={props.values.exp_year}
                    containerStyle={{
                      borderBottomWidth: 0.8,
                      borderBottomColor: "rgba(255,255,255,0.4)",
                    }}
                    style={{ fontSize: moderateScale(14), color: "#fff" }}
                    setRef={() => { }}
                  />
                  <TextInput
                    form={props}
                    formKey="exp_cvv"
                    placeholder="CVV"
                    value={props.values.exp_cvv}
                    keyboardType="number-pad"
                    inlineValidation={true}
                    maxLength={4}
                    placeholderTextColor="#fff"
                    containerStyle={{ margin: 0, borderBottomWidth: 0 }}
                    style={{ fontSize: moderateScale(14), color: "#fff" }}
                    setRef={() => { }}
                  />
                </React.Fragment>
              )}
            </Formik>
          </ScrollView>
        </View>

        <Image style={style.l_bottom} source={city2} width={deviceWidth} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    me: getMe(state),
    card: getCardDetails(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    paymentActions: bindActionCreators(paymentActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessSettingPaymentCard);
