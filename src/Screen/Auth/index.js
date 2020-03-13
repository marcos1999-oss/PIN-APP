import React from "react";
import { Text, View, Dimensions, Animated, Easing } from "react-native";
import { Container } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash'
import { LoginManager, AccessToken } from 'react-native-fbsdk';

/*Style*/
import style from "./style.js";

/*UI Components*/
import Splash from '../../Screen/Splash'
import LoginForm from "../../Components/LoginForm";
import { moderateScale, verticalScale } from "../../Utils/scaling";
import { successMessage, errorMessage } from '../../Utils/alerts'

import { getMe } from '../../redux/selectors/index'
import * as authActions from '../../redux/actions/authActions'
import { loadCredentials } from '../../redux/utils/storage'
import { setCredentials } from '../../redux/services/api'

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkingAuth: true,
      isUserLoginForm: true,
      animation: new Animated.Value(0),
      anchor: true,
      isLoading: false,
      userType: '',
    };
  }

  componentDidMount() {
    loadCredentials().then((credentials) => {
      if (!isEmpty(credentials)) {
        const { type, access_token, client, uid } = credentials;
        const { navigation } = this.props;

        setCredentials(access_token, client, uid);

        this.props.authActions.fetchMe({
          userType: type,
          onSuccess: (response) => {
            // TODO, review. this call should be on Saga?
            this.props.authActions.signInSuccess({ response, access_token, client, uid });
            if (type === 'user') {
              navigation.navigate('User');
            } else {
              navigation.navigate('Business', { profilePercentage: response.data.data.profile_percentage });
            }
          },
          onFail: (error) => {
            errorMessage({ message: 'Error fetching user information', description: error.message });

            this.props.authActions.signOut({
              onSuccess: () => {
                navigation.navigate('Login');
              },
              onFail: (error) => {
                errorMessage({ message: 'Sign out failed', description: error.message });
              }
            });
          }
        });
      } else {
        this.setState({ checkingAuth: false });
      }
    });
  }

  onSwitchLogin = () => {
    this.setState({
      isUserLoginForm: !this.state.isUserLoginForm,
      anchor: false,
    });

    this.state.animation.setValue(0);
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.sin,
    }).start();
  };

  onForgotPassword = (email = '') => {
    const { isUserLoginForm } = this.state;

    this.props.navigation.navigate('ForgotPassword', { isUserLoginForm, email });
  };

  onShowSignupScreen = () => {
    const { isUserLoginForm } = this.state;

    this.props.navigation.navigate('Signup', {
      isUserLoginForm,
    });
  };

  initUserFacebook = (token) => {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
      .then((response) => { alert(response) })
      .catch(() => {
        alert("error");
      })
  }
  onFacebookRegister = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            alert(JSON.stringify(data))
          })
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      }
    )
    // errorMessage({ message: 'Not Implemented!', description: 'You can not login with Facebook yet' });
  };

  onSignInSuccess = (data) => {
    const { navigation } = this.props;

    this.setState({ isLoading: false });

    successMessage({ message: 'Login success' });

    return this.state.userType === 'user'
      ? navigation.navigate('User')
      : navigation.navigate('Business');
  };

  onSignInFail = (error, callback) => {
    this.setState({ isLoading: false });
    callback && callback(error);
  };

  onSignIn = (type, email, password, onFail) => {
    this.setState({ isLoading: true, userType: type }, () => {
      this.props.authActions.signIn({
        params: { type: type, email: email, password: password },
        onSuccess: this.onSignInSuccess,
        onFail: (error) => this.onSignInFail(error, onFail),
      });
    });
  };

  render() {
    const { checkingAuth, isUserLoginForm, anchor } = this.state;
    const propsForLogin = {
      navigation: this.props.navigation,
      dispatch: this.props.dispatch,
      onSignIn: this.onSignIn,
      onSwitchLogin: this.onSwitchLogin,
      onForgotPassword: this.onForgotPassword,
      onShowSignupScreen: this.onShowSignupScreen,
      onFacebookRegister: this.onFacebookRegister,
    };

    const backToFront = {
      position: 'absolute',
      top: this.state.animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [30, 15, 0],
      }),
      opacity: this.state.animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.9, 0.95, 1],
      }),
      zIndex: this.state.animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [2, 555, 999],
      }),
      transform: [
        {
          scale: this.state.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.8, 0.9, 1],
          }),
        },
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [30, 15, 0],
          }),
        },
      ],
    };
    const frontToBack = {
      position: "absolute",
      top: this.state.animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, -370, 30],
      }),
      opacity: this.state.animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0.75, 0.9],
      }),
      zIndex: this.state.animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [999, 555, 2],
      }),
      transform: [
        {
          scale: this.state.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0.9, 0.8],
          }),
        },
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, -370, 0],
          }),
        },
      ],
    };

    if (checkingAuth) {
      return <Splash />;
    } else {
      return (
        <Container style={style.container}>
          <View style={{ backgroundColor: "transparent" }}>
            <Text
              style={{
                fontFamily: "SignPainter",
                color: "white",
                fontSize: moderateScale(42),
                marginBottom: verticalScale(40),
              }}
            >
              scopin
            </Text>
          </View>

          <View style={style.formContainer}>
            {anchor ? (
              <React.Fragment>
                <View style={isUserLoginForm ? style.front : style.back}>
                  <LoginForm
                    isLoading={this.state.isLoading}
                    type={'user'}
                    isFront={isUserLoginForm}
                    {...propsForLogin}
                  />
                </View>
                <View style={isUserLoginForm ? style.back : style.front}>
                  <LoginForm
                    isLoading={this.state.isLoading}
                    type={'business'}
                    isFront={!isUserLoginForm}
                    {...propsForLogin}
                  />
                </View>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  <Animated.View
                    style={
                      isUserLoginForm ? [style.front, { ...backToFront }] : [style.back, { ...frontToBack }]
                    }
                  >
                    <LoginForm
                      isLoading={this.state.isLoading}
                      type={'user'}
                      isFront={isUserLoginForm}
                      {...propsForLogin}
                    />
                  </Animated.View>
                  <Animated.View
                    style={
                      isUserLoginForm ? [style.back, { ...frontToBack }] : [style.front, { ...backToFront }]
                    }
                  >
                    <LoginForm
                      isLoading={this.state.isLoading}
                      type={'business'}
                      isFront={!isUserLoginForm}
                      {...propsForLogin}
                    />
                  </Animated.View>
                </React.Fragment>
              )}
          </View>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    me: getMe(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
