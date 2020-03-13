import React from "react";
import { View, Platform } from "react-native";
import {
  createAppContainer,
  createSwitchNavigator,
  NavigationActions,
  StackActions,
} from "react-navigation";
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { fadeIn } from 'react-navigation-transitions'

import LegalScreen from "../Components/Legal";
import AuthScreen from "../Screen/Auth";

import UserScreen from "../Screen/User";
import UserProfileScreen from "../Screen/UserProfile";
import UserSettingsScreen from "../Screen/UserSettings/UserSettings";
import {
  UserSettingsUsername,
  UserSettingsName,
  UserSettingsEmail,
  UserSettingsPhone,
  UserSettingsBirthday,
} from "../Screen/UserSettingsInfo";
import UserSupportInput from "../Screen/UserSupport/UserSupportInput";
import UserSupportSent from "../Screen/UserSupport/UserSupportSent";
import UserSettingsNotifications from "../Screen/UserSettings/UserSettingsNotifications";
import UserSettingChangePassword from "../Screen/UserSettings/UserSettingChangePassword";
import ForgotPassword from "../Screen/UserSettingsInfo/ForgotPassword";
import ForgotPasswordToken from "../Screen/UserSettingsInfo/ForgotPasswordToken";
import ForgotPasswordForm from "../Screen/UserSettingsInfo/ForgotPasswordForm";
import ForgetPasswordSuccess from "../Screen/UserSettingsInfo/ForgetPasswordSuccess";
import UserFavoritesScreen from "../Screen/UserFavorites";
import UserAdViewScreen from "../Screen/UserAdView";
import ReportListingSelections from "../Screen/ReportListing/ReportListingSelections";
import ReportListingInput from "../Screen/ReportListing/ReportListingInput";
import ReportListingSent from "../Screen/ReportListing/ReportListingSent";
import SignupScreen from "../Screen/Signup";
// import SmsValidateScreen from "../Screen/Signup/SmsValidate";
import BusinessHomeScreen from "../Screen/Business/Home";
import BusinessActivityScreen from "../Screen/Business/Activity";
import BusinessActivityPostView from "../Screen/BusinessActivityPostView";
import BusinessActivityPins from "../Screen/BusinessActivityPins";
import PurchasePins from "../Screen/PurchasePins";
import PurchasePinsPay from "../Screen/PurchasePins/PurchasePinsPay";
import PurchaseHomePin from "../Screen/PurchasePins/PurchaseHomePin";
import PurchaseHomePinPay from "../Screen/PurchasePins/PurchaseHomePinPay";
import BusinessPostScreen from "../Screen/Business/Post";
import BusinessPostThemes from "../Screen/BusinessPostThemes";
import BusinessPostThemesEdit from "../Screen/BusinessPostThemesEdit";
import BusinessPostCamera from "../Screen/BusinessPostCamera";
import BusinessPostCameraPreview from "../Screen/BusinessPostCameraPreview";
import BusinessNewsScreen from "../Screen/Business/News";
import BusinessMeScreen from "../Screen/Business/Me";
import BusinessInfoScreen from "../Screen/BusinessInfo";
import {
  AboutUsScreen,
  AddressAndPhoneScreen,
  BusinessHourScreen,
  CompanyNameScreen,
  EmailScreen,
  FeatureScreen,
  TypeOfBusinessScreen,
  WebsiteScreen,
} from "../Screen/BusinessInfo/innerScreen";
import BusinessSupportInput from "../Screen/BusinessSupport/BusinessSupportInput";
import BusinessSupportSent from "../Screen/BusinessSupport/BusinessSupportSent";
import BusinessSetting from "../Screen/BusinessSettings/BusinessSetting";
import BusinessSettingChangePassword from "../Screen/BusinessSettings/BusinessSettingChangePassword";
import BusinessSettingNotification from "../Screen/BusinessSettings/BusinessSettingNotification";
import BusinessSettingPayment from "../Screen/BusinessSettings/BusinessSettingPayment";
import BusinessSettingPaymentCard from "../Screen/BusinessSettings/BusinessSettingPaymentCard";
import BusinessSettingPaymentHistory from "../Screen/BusinessSettings/BusinessSettingPaymentHistory";

import CustomIcon from "../CustomIcon";
// style
import { scale, moderateScale, verticalScale } from "../Utils/scaling";
import styles, {
  businessBackgroundTabActive,
  businessBackgroundTabInactive,
} from "./Styles/AppNavigationStyles";
import { Colors } from "../Themes";
import { Button, Text, Icon } from "native-base";
import FlashMessage from "react-native-flash-message";
import HeaderSave from '../Components/Common/HeaderSave';
import { connect } from "react-redux";

const isProfileFilled = false;
const IS_IOS = Platform.OS === "ios";
let businessProfilePercentage = 0;
// defaultNavigationOptions: {
//   headerBackTitle: null,
//   headerTitleStyle: {
//     color: Colors.white,
//     fontSize: moderateScale(12),
//     fontWeight: "bold",
//     fontFamily: "Helvetica",
//     textAlign: "center",
//     flex: 1,
//   },
//   headerStyle: {
//     borderBottomWidth: 0,
//     backgroundColor: Colors.userBackground,
//     elevation: 0,
//   },
//   title: "Business Information",
//   headerTintColor: "white",
//   headerRight: <View />,
// },
// }
const AuthNavigation = createStackNavigator({
  Login: {
    screen: AuthScreen,
    navigationOptions: () => ({
      header: null,
      headerBackTitle: null,
    }),
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: () => ({
      headerTintColor: 'black',
    }),
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Button
        transparent
        onPress={() => navigation.goBack(null)}
        style={{ alignSelf: "center", marginLeft: scale(12) }}
      >
        <CustomIcon name="arrow" size={verticalScale(13)} color={"white"} />
      </Button>
      ,
      headerBackTitle: null,
      title: 'Forgot Password',



    }),

  },
  ForgotPasswordToken: {
    screen: ForgotPasswordToken,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Button
        transparent
        onPress={() => navigation.goBack(null)}
        style={{ alignSelf: "center", marginLeft: scale(12) }}
      >
        <CustomIcon name="arrow" size={verticalScale(13)} color={"white"} />
      </Button>
      ,
      headerBackTitle: null,
      title: 'Forgot Password',


    }),
  },
  ForgotPasswordForm: {
    screen: ForgotPasswordForm,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Button
        transparent
        onPress={() => navigation.goBack(null)}
        style={{ alignSelf: "center", marginLeft: scale(12) }}
      >
        <CustomIcon name="arrow" size={verticalScale(13)} color={"white"} />
      </Button>
      ,
      headerBackTitle: null,
      title: 'Forgot Password',


    }),
  },
  ForgetPasswordSuccess: {
    screen: ForgetPasswordSuccess,
    navigationOptions: () => ({
      header: null,
      headerBackTitle: null,
    }),
  }
},
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#5F92F3',
        elevation: 0, //for android
        shadowOpacity: 0, //for ios
        borderBottomWidth: 0, //for ios

      },
      headerBackTitleVisible: false,
      headerBackTitle: null,
      headerTintColor: "white",
      headerRight: <View />,
      headerTitleStyle: {
        color: Colors.white,
        fontSize: moderateScale(13),
        fontWeight: "bold",
        fontFamily: "Helvetica",
      },
    }
  }

  // SmsValidate: {
  //   screen: SmsValidateScreen,
  //   navigationOptions: () => ({
  //     header: null,
  //     headerBackTitle: null,
  //   }),
  // },
);

const PurchasePinsStack = createStackNavigator(
  {
    PurchasePins: {
      screen: PurchasePins,
      navigationOptions: () => ({
        header: null
      })
    },
    PurchasePinsPay: {
      screen: PurchasePinsPay,
      navigationOptions: () => ({
        header: null
      })
    },
    PurchaseHomePin: {
      screen: PurchaseHomePin,
      navigationOptions: () => ({
        header: null
      })
    },
    PurchaseHomePinPay: {
      screen: PurchaseHomePinPay,
      navigationOptions: () => ({
        header: null
      })
    },
    BusinessSettingPaymentCard: {
      screen: BusinessSettingPaymentCard,
      navigationOptions: ({ navigation }) => ({
        title: "Payment Card",
        headerTintColor: "white",
        headerTitleStyle: {
          fontSize: moderateScale(12),
          fontWeight: "bold",
          alignSelf: "center",
        },
        headerLeft: (
          <Button
            transparent
            style={{ marginLeft: scale(15) }}
            onPress={() => {
              if (navigation.state && navigation.state.params && navigation.state.params.isFromHome) {
                navigation.navigate("BusinessHome");
              } else navigation.goBack(null);
            }}
          >
            <CustomIcon name="close" size={verticalScale(13)} style={{ color: "white" }} />
          </Button>
        ),
        headerStyle: {
          backgroundColor: Colors.background,
          borderBottomWidth: 0,
          height: verticalScale(60),
        },
        headerBackTitle: null,
      }),
    },
  },
  {
    initialRouteName: "PurchasePins",
    defaultNavigationOptions: () => ({
      headerBackTitleVisible: false,
    }),
  }
);


const businessPostSettings = {
  BusinessPost: {
    screen: BusinessPostScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <Button
          transparent
          style={{ marginLeft: scale(15), alignSelf: "flex-end" }}
          onPress={() => navigation.goBack(null)}
        >
          <CustomIcon name="close" size={verticalScale(13)} style={{ color: "white" }} />
        </Button>
      ),
      headerStyle: {
        backgroundColor: "black",
        borderBottomWidth: 0,
        height: verticalScale(60),
      },
      headerBackTitle: null,
    }),
  },
  BusinessPostThemes: {
    screen: BusinessPostThemes,
    navigationOptions: ({ navigation }) => ({
      headerLeft: null,
      headerStyle: {
        backgroundColor: "black",
        borderBottomWidth: 0,
        height: verticalScale(60),
      },
      headerBackTitle: null,
    }),
  },
  BusinessPostThemesEdit: {
    screen: BusinessPostThemesEdit,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <Button
          transparent
          style={{ marginLeft: scale(15), alignSelf: "flex-end" }}
          onPress={() => {
            navigation.dispatch(
              StackActions.reset({
                index: 0,
                key: null,
                actions: [
                  NavigationActions.navigate({
                    routeName: "BusinessPost",
                  }),
                ],
              })
            ),
              navigation.navigate("Home");
          }}
        >
          <CustomIcon name="close" size={verticalScale(13)} style={{ color: "white" }} />
        </Button>
      ),
      headerStyle: {
        backgroundColor: "black",
        borderBottomWidth: 0,
        height: verticalScale(60),
      },
      headerBackTitle: null,
    }),
  },
  BusinessPostCamera: {
    screen: BusinessPostCamera,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <Button
          transparent
          style={{ marginLeft: scale(15), alignSelf: "flex-end" }}
          onPress={() => navigation.goBack()}
        >
          <CustomIcon name="close" size={verticalScale(13)} style={{ color: "white" }} />
        </Button>
      ),
      headerStyle: {
        backgroundColor: "black",
        borderBottomWidth: 0,
        height: verticalScale(60),
      },
      headerBackTitle: null,
    }),
  },
  BusinessPostCameraPreview: {
    screen: BusinessPostCameraPreview,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  BusinessActivityPostView: {
    screen: BusinessActivityPostView,
    navigationOptions: ({ navigation }) => {
      const isPreview = navigation.getParam('status', 0) === 0;
      const backToHome = navigation.getParam('backToHome', false);
      return ({
        title: isPreview ? 'Preview' : 'My Activity',
        headerLeft: () => {
          return !isPreview && (
            <Button
              transparent
              style={{ marginLeft: scale(15), alignSelf: "flex-end" }}
              onPress={() => backToHome ? navigation.navigate('BusinessHome') : navigation.goBack()}
            >
              <CustomIcon name="close" size={verticalScale(13)} style={{ fontSize: moderateScale(14), color: "white" }} />
            </Button>
          );
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontSize: moderateScale(12),
          fontWeight: "bold",
          alignSelf: "center",
        },
        headerStyle: {
          backgroundColor: "black",
          borderBottomWidth: 0,
          height: verticalScale(60),
        },
        headerBackTitle: null,
      });
    },
  },
};

const BusinessActivityStack = createStackNavigator(
  {
    BusinessActivity: {
      screen: BusinessActivityScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    // BusinessActivityPostView: {
    //   screen: BusinessActivityPostView,
    //   navigationOptions: ({ navigation }) => ({
    //     header: null,
    //   }),
    // },
    BusinessActivityPins: {
      screen: BusinessActivityPins,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    PurchasePinsStack: {
      screen: PurchasePinsStack,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    ...businessPostSettings,
  },
  {
    initialRouteName: "BusinessActivity",
    // defaultNavigationOptions: () => ({
    //   header: null,
    // }),
  }
);

BusinessActivityStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  // For development, we use this block code
  // const routesLength = navigation.state.routes.length;
  // let currentRoute = navigation.state.routes[routesLength - 1].routeName;
  // if (currentRoute !== 'BusinessActivity') {
  //   tabBarVisible = false;
  // }
  // When come to production, remove the above code and using below instead
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const BusinessPostStack = createStackNavigator(
  businessPostSettings,
  {
    initialRouteName: "BusinessPost",
    // defaultNavigationOptions: ({ navigation }) => ({
    //   headerStyle: {
    //     backgroundColor: "black",
    //     borderBottomWidth: 0,
    //     height: IS_IOS?verticalScale(30):verticalScale(60),
    //   },
    //   headerBackTitle: null,
    //   headerLeft: (
    //     <Button
    //       transparent
    //       style={{ marginLeft: scale(15), alignSelf: "flex-end" }}
    //       onPress={() => navigation.goBack()}
    //     >
    //       <CustomIcon name="close" style={{ color: "white" }} />
    //     </Button>
    //   ),
    // }),
  }
);

// we should update this, use a template for the same screen.
const BusinessInfoStack = createStackNavigator(
  {
    BusinessInfoHome: {
      screen: BusinessInfoScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft:
          <Button
            transparent
            onPress={() => navigation.navigate("BusinessMeMainScreen")}
            style={{ marginLeft: scale(12), alignSelf: "center" }}
          >
            <CustomIcon name="arrow" size={verticalScale(13)} color={"white"} />
          </Button>
      }),
    },
    AboutUsScreen: {
      screen: AboutUsScreen,
      navigationOptions: ({ navigation }) => ({
        headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
        headerRight: (
          <HeaderSave isSubmitting={navigation.getParam('isSubmitting')} submit={navigation.getParam("submit")} />
        ),
      }),
    },
    AddressAndPhoneScreen: {
      screen: AddressAndPhoneScreen,
      navigationOptions: ({ navigation }) => ({
        headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
        headerRight: (
          <HeaderSave isSubmitting={navigation.getParam('isSubmitting')} submit={navigation.getParam("submit")} />
        ),
      }),
    },
    BusinessHourScreen: {
      screen: BusinessHourScreen,
      navigationOptions: ({ navigation }) => ({
        headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
        headerRight: (
          <HeaderSave isSubmitting={navigation.getParam('isSubmitting')} submit={navigation.getParam("submit")} />
        ),
      }),
    },
    CompanyNameScreen: {
      screen: CompanyNameScreen,
      navigationOptions: ({ navigation }) => ({
        headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
        headerRight: (
          <HeaderSave isSubmitting={navigation.getParam('isSubmitting')} submit={navigation.getParam("submit")} />
        ),
      }),
    },
    EmailScreen: {
      screen: EmailScreen,
      navigationOptions: ({ navigation }) => ({
        headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
        headerRight: (
          <HeaderSave isSubmitting={navigation.getParam('isSubmitting')} submit={navigation.getParam("submit")} />
        ),
      }),
    },
    FeatureScreen: {
      screen: FeatureScreen,
      navigationOptions: {
        headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
      },
    },
    TypeOfBusinessScreen: {
      screen: TypeOfBusinessScreen,
      navigationOptions: ({ navigation }) => ({
        headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
        headerRight: (
          <HeaderSave isSubmitting={navigation.getParam('isSubmitting')} submit={navigation.getParam("submit")} />
        ),
      }),
    },
    WebsiteScreen: {
      screen: WebsiteScreen,
      navigationOptions: ({ navigation }) => ({
        headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
        headerRight: (
          <HeaderSave isSubmitting={navigation.getParam('isSubmitting')} submit={navigation.getParam("submit")} />
        ),
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: Colors.white,
        fontSize: moderateScale(12),
        fontWeight: "bold",
        fontFamily: "Helvetica",
      },
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: Colors.skyBlue,
        elevation: 0,
      },
      title: "Business Information",
      headerTintColor: "white",
      headerRight: <View />,
    },
  }
);

const BusinessSettingStack = createStackNavigator(
  {
    BusinessSettingMainScreen: {
      screen: BusinessSetting,
      navigationOptions: ({ navigation }) => ({
        title: "Settings",
        headerLeft: <Button
          transparent
          onPress={() => navigation.navigate("BusinessMeMainScreen")}
          style={{ marginLeft: scale(12), alignSelf: "center" }}
        >
          <CustomIcon name="arrow" size={verticalScale(13)} color={"white"} />
        </Button>
      }),
    },
    BusinessSettingChangePassword: {
      screen: BusinessSettingChangePassword,
      navigationOptions: ({ navigation }) => ({
        title: "Change Password",
        headerRight: (
          <HeaderSave isSubmitting={navigation.getParam('isSubmitting')} submit={navigation.getParam("submit")} />
        ),
      }),
    },
    BusinessSettingNotification: {
      screen: BusinessSettingNotification,
      navigationOptions: () => ({
        title: "Notifications",
      }),
    },
    BusinessSettingPayment: {
      screen: BusinessSettingPayment,
      navigationOptions: () => ({
        title: "Payments",
      }),
    },
    BusinessSettingPaymentCard: {
      screen: BusinessSettingPaymentCard,
      navigationOptions: ({ navigation }) => ({
        title: "Payment Card",
        headerRight: (
          <HeaderSave isSubmitting={navigation.getParam('isSubmitting')} submit={navigation.getParam("submit")} />
        ),
      }),
    },
    BusinessSettingPaymentHistory: {
      screen: BusinessSettingPaymentHistory,
      navigationOptions: () => ({
        title: "Payment History",
      }),
    },
  },
  {
    initialRouteName: "BusinessSettingMainScreen",
    defaultNavigationOptions: () => ({
      headerBackTitle: null,
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: Colors.white,
        fontSize: moderateScale(12),
        fontWeight: "bold",
        fontFamily: "Helvetica",
      },
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: Colors.skyBlue,
        elevation: 0,
      },
      headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
      headerTintColor: "white",
      headerRight: <View />,
    }),
  }
);

const BusinessSupportStack = createStackNavigator(
  {
    BusinessSupportInput: {
      screen: BusinessSupportInput,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Button
          transparent
          onPress={() => navigation.navigate("BusinessMeMainScreen")}
          style={{ marginLeft: scale(12), alignSelf: "center" }}
        >
          <CustomIcon name="arrow" size={verticalScale(13)} color={"white"} />
        </Button>
      }),
    },
    BusinessSupportSent: {
      screen: BusinessSupportSent,
      navigationOptions: ({ navigation }) => ({
        headerLeft: null,
      }),
    },
  },
  {
    defaultNavigationOptions: () => ({
      headerBackTitle: null,
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: Colors.white,
        fontSize: moderateScale(12),
        fontWeight: "bold",
        fontFamily: "Helvetica",
      },
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: Colors.skyBlue,
        elevation: 0,
      },
      headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
      title: "Support",
      headerTintColor: "white",
      headerRight: <View />,
    }),
  }
);

const BusinessMeMenu = createStackNavigator(
  {
    BusinessMeMainScreen: {
      screen: BusinessMeScreen,
    },
    BusinessInfo: { screen: BusinessInfoStack },
    BusinessSettings: BusinessSettingStack,
    BusinessSupport: BusinessSupportStack,
    BusinessLegal: {
      screen: LegalScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Button
            transparent
            onPress={() => navigation.navigate("BusinessMeMainScreen")}
            style={{ alignSelf: "center", marginLeft: scale(12) }}
          >
            <CustomIcon name="arrow" size={verticalScale(13)} color={"white"} />
          </Button>
        ),
      }),
    },
  },
  {
    initialRouteName: "BusinessMeMainScreen",
    defaultNavigationOptions: ({ navigation }) =>
      navigation.state.routeName === "BusinessLegal"
        ? {
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#000",
            elevation: 0,
          },
          headerBackTitle: null,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerBackImage:
            <CustomIcon
              name="arrow"
              size={verticalScale(13)}
              style={{ marginLeft: scale(12) }}
              color={"white"}
            />
          ,
          headerTitleStyle: {
            color: Colors.white,
            fontSize: moderateScale(12),
            fontWeight: "bold",
            fontFamily: "Helvetica",
          },
          headerRight: <View />,
          headerTintColor: "white",
          title: navigation.getParam("title", "Privacy Policy"),
        }
        : {
          header: null,
        },
  }
);
BusinessMeMenu.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
const BusinessNewsStack = createStackNavigator(
  {
    BusinessNews: {
      screen: BusinessNewsScreen,
    },
    PurchasePins: {
      screen: PurchasePins,
    },
  },
  {
    initialRouteName: "BusinessNews",
    defaultNavigationOptions: () => ({
      header: null,
      headerBackTitleVisible: false,
    }),
  }
);

BusinessNewsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  // For development, we use this block code
  // const routesLength = navigation.state.routes.length;
  // let currentRoute = navigation.state.routes[routesLength - 1].routeName;
  // if (currentRoute !== 'BusinessActivity') {
  //   tabBarVisible = false;
  // }
  // When come to production, remove the above code and using below instead
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};


const BusinessHomeStack = createStackNavigator(
  {
    BusinessHome: {
      screen: BusinessHomeScreen,
    },
    PurchasePinsStack: {
      screen: PurchasePinsStack,
    },
  },
  {
    initialRouteName: "BusinessHome",
    defaultNavigationOptions: () => ({
      header: null,
      headerBackTitleVisible: false,
    }),
  }
);

BusinessHomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const BusinessBottomTabNavigation = createBottomTabNavigator(
  {
    Home: { screen: BusinessHomeStack },
    Activity: { screen: BusinessActivityStack },
    Post: {
      screen: BusinessPostStack,
      navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
      }),
    },
    News: { screen: BusinessNewsStack },
    Me: { screen: BusinessMeMenu },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: null,
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let name,
          size = verticalScale(25);
        let style = {};
        if (routeName === "Home") {
          name = "store";
        } else if (routeName === "Activity") {
          name = "star";
        } else if (routeName === "Post") {
          name = "camera";
          size = verticalScale(30);
          style = styles.btnPostStyle;
        } else if (routeName === "News") {
          name = "bell";
        } else {
          // Me
          name = "avatar";
        }
        return (
          <View
            style={{ ...style, alignItems: "center", justifyContent: "center" }}
          >
            {
              (getProgilePercentage() < 100 && name === "avatar") && (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: "#F40100",
                    position: "absolute",
                    borderRadius: 50,
                    top: 1,
                    left: 23,
                    zIndex: 9,
                  }}
                />
              )
            }
            <CustomIcon name={name} size={size} color={tintColor} />
            <Text style={[styles.businessTabLabelStyle, { color: focused ? tintColor : "white" }]}>{routeName}</Text>
            {name === "bell" && false ? (
              <View style={[styles.btnNewsStyle, styles.btnNewsActiveStyle]} />
            ) : null}
            {name === "avatar" && false && !isProfileFilled ? (
              <View style={[styles.btnMeStyle, styles.btnNewsActiveStyle]} />
            ) : null}
          </View>
        );
      },
      // tabBarOnPress: ()=>{
      //   navigation.dispatch(StackActions.reset({
      //     index: 1,
      //     key: null,
      //     actions: [
      //         NavigationActions.navigate({
      //             routeName: navigation.state.routeName,
      //         }),
      //     ]
      //   }))
      //   navigation.navigate(navigation.state.routeName)
      // }
    }),
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: businessBackgroundTabActive,
      inactiveTintColor: businessBackgroundTabInactive,
      style: styles.businessTabStyle,
      // labelStyle: styles.businessTabLabelStyle,
      showLabel: false,
    },
    resetOnBlur: true,
    lazy: false,
  }
);

const UserSettingStack = createStackNavigator(
  {
    UserSettingMainScreen: {
      screen: UserSettingsScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Settings",
        headerLeft:
          <Button
            transparent
            onPress={() => navigation.navigate("UserProfileMainScreen")}
            style={{ alignSelf: "center", marginLeft: scale(12) }}
          >
            <CustomIcon name="arrow" size={verticalScale(13)} color={"white"} />
          </Button>
      }),
    },
    UserSettingsName: {
      screen: UserSettingsName,
      navigationOptions: ({ navigation }) => ({
        title: "Settings",
        headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
        headerRight: (
          <HeaderSave isSubmitting={navigation.getParam('isSubmitting')} submit={navigation.getParam("submit")} />
        ),
      }),
    },
    UserSettingsUsername: {
      screen: UserSettingsUsername,
      navigationOptions: ({ navigation }) => ({
        title: "Settings",
        headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
        headerRight: (
          <HeaderSave isSubmitting={navigation.getParam('isSubmitting')} submit={navigation.getParam("submit")} />
        ),
      }),
    },
    UserSettingsEmail: {
      screen: UserSettingsEmail,
      navigationOptions: ({ navigation }) => ({
        title: "Settings",
        headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
        headerRight: (
          <HeaderSave isSubmitting={navigation.getParam('isSubmitting')} submit={navigation.getParam("submit")} />
        ),
      }),
    },
    UserSettingsPhone: {
      screen: UserSettingsPhone,
      navigationOptions: ({ navigation }) => ({
        title: "Settings",
        headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
        headerRight: (
          <HeaderSave isSubmitting={navigation.getParam('isSubmitting')} submit={navigation.getParam("submit")} />
        ),
      }),
    },
    UserSettingsBirthday: {
      screen: UserSettingsBirthday,
      navigationOptions: ({ navigation }) => ({
        title: "Settings",
        headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
        headerRight: (
          <HeaderSave isSubmitting={navigation.getParam('isSubmitting')} submit={navigation.getParam("submit")} />
        ),
      }),
    },
    UserSettingsNotifications: {
      screen: UserSettingsNotifications,
      navigationOptions: () => ({
        title: "Notifications",
        headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
      }),
    },
    UserSettingChangePassword: {
      screen: UserSettingChangePassword,
      navigationOptions: ({ navigation }) => ({
        title: "Change Password",
        headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
        headerRight: (
          <HeaderSave isSubmitting={navigation.getParam('isSubmitting')} submit={navigation.getParam("submit")} />
        ),
      }),
    },

  },
  {
    initialRouteName: "UserSettingMainScreen",
    defaultNavigationOptions: () => ({
      headerBackTitle: null,
      headerBackTitleVisible: false,
      headerTitleStyle: {
        color: Colors.white,
        fontSize: moderateScale(12),
        fontWeight: "bold",
        fontFamily: "Helvetica",
      },
      headerTitleAlign: 'center',
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: Colors.skyBlue,
        elevation: 0,
      },
      headerRight: <View />,
      headerTintColor: "white",
    }),
  }
);

const UserSupportStack = createStackNavigator(
  {
    UserSupportInput: {
      screen: UserSupportInput,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Button
            transparent
            onPress={() => navigation.navigate('UserProfileMainScreen')}
            style={{ alignSelf: "center", marginLeft: scale(12) }}
          >
            <CustomIcon name="arrow" size={verticalScale(13)} color={"white"} />
          </Button>
        ),
      }),
    },
    UserSupportSent: {
      screen: UserSupportSent,
      navigationOptions: ({ navigation }) => ({
        headerLeft: null,
      }),
    },
  },
  {
    defaultNavigationOptions: () => ({
      headerBackTitle: null,
      headerBackTitleVisible: false,
      headerTitleStyle: {
        color: Colors.white,
        fontSize: moderateScale(12),
        fontWeight: "bold",
        fontFamily: "Helvetica",
      },
      headerTitleAlign: 'center',
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: Colors.skyBlue,
        elevation: 0,
      },
      headerBackImage: <CustomIcon name="arrow" size={verticalScale(13)} style={{ marginLeft: scale(12) }} color={"white"} />,
      title: "Support",
      headerTintColor: "white",
      headerRight: <View />,
    }),
  }
);

const ReportListingStack = createStackNavigator(
  {
    ReportListingSelections: {
      screen: ReportListingSelections,
      navigationOptions: ({ navigation }) => ({
        headerLeft:
          <Button
            transparent
            onPress={() => navigation.navigate("UserAdView")}
            style={{ alignSelf: "center", marginLeft: scale(12) }}
          >
            <CustomIcon name="arrow" size={verticalScale(13)} color={"black"} />
          </Button>
      }),
    },
    ReportListingInput: {
      screen: ReportListingInput,
      navigationOptions: ({ navigation }) =>
        !IS_IOS && {
          headerLeft: (
            <Button
              transparent
              onPress={() => navigation.goBack()}
              style={{ alignSelf: "center", marginLeft: scale(12) }}
            >
              <CustomIcon
                name="arrow"
                size={verticalScale(13)}
                color={"black"}
              />
            </Button>
          ),
        },
    },
    ReportListingSent: {
      screen: ReportListingSent,
      navigationOptions: ({ navigation }) => ({
        headerLeft: null,
      }),
    },
  },
  {
    initialRouteName: "ReportListingSelections",
    defaultNavigationOptions: () => ({
      title: "Report This Listing",
      headerTitleStyle: {
        fontSize: moderateScale(12),
        fontWeight: "bold",
      },
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: "white",
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerRight: <View />,
      headerTintColor: "black",
      headerBackTitle: null,
      headerBackTitleVisible: false,
    }),
  }
);

const userFavoriteTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (
    prevScene &&
    prevScene.route.routeName === "UserMain" &&
    nextScene.route.routeName === "UserFavorites"
  ) {
    return fadeIn(0);
  }
};
// FavoritesScreen Navigation
const UserHomeStack = createStackNavigator(
  {
    UserMain: {
      screen: UserScreen,
    },
    UserFavorites: {
      screen: UserFavoritesScreen,
    },
    UserAdView: {
      screen: UserAdViewScreen,
    },
    ReportListing: {
      screen: ReportListingStack,
    },
  },
  {
    initialRouteName: "UserMain",
    transitionConfig: (nav) => userFavoriteTransition(nav),
    defaultNavigationOptions: {
      header: null,
      headerBackTitleVisible: false,
    },
  }
);

const UserProfileStack = createStackNavigator(
  {
    UserProfileMainScreen: UserProfileScreen,
    UserSettings: UserSettingStack,
    UserSupport: UserSupportStack,
    UserLegal: {
      screen: LegalScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Button
            transparent
            onPress={() => navigation.navigate("UserProfileMainScreen")}
            style={{ alignSelf: "center", marginLeft: scale(12) }}
          >
            <CustomIcon name="arrow" size={verticalScale(13)} color={"white"} />
          </Button>
        ),
      }),
    },
  },
  {
    initialRouteName: "UserProfileMainScreen",
    defaultNavigationOptions: ({ navigation }) =>
      navigation.state.routeName === "UserLegal"
        ? {
          headerStyle: {
            backgroundColor: "#000",
            borderBottomWidth: 0,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Colors.white,
            fontSize: 12,
          },
          title: navigation.getParam("title", "Privacy Policy"),
        }
        : {
          header: null,
          headerBackTitleVisible: false,
        },
  }
);

const UserStackNavigation = createStackNavigator(
  {
    UserHome: UserHomeStack,
    UserProfile: UserProfileStack,
  },
  {
    initialRouteName: "UserHome",
    headerMode: "none",
  }
);

const Navigation = createSwitchNavigator(
  {
    Auth: { screen: AuthNavigation },
    Business: { screen: BusinessBottomTabNavigation },
    User: { screen: UserStackNavigation },
  },
  {
    initialRouteName: 'Auth',
  }
);

const AppContainer = createAppContainer(Navigation);

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppContainer />
        <FlashMessage position="top" />
      </React.Fragment>
    );
  }
}

export const setProfilePercentage = profilePercentage => {
  if (profilePercentage !== undefined) {
    businessProfilePercentage = profilePercentage;
  }
}

const getProgilePercentage = () => {
  return businessProfilePercentage;
}
