import React from "react";
import { SafeAreaView } from "react-native";
import { View, Text, Button } from "native-base";
import styles from "./style";
import AdView from "../../Components/AdView";
import AdPerformance from "../../Components/AdPerformance";
import AdMenu from "../../Components/AdMenu";
import { StackActions, NavigationActions } from "react-navigation";

export default class BusinessPostCameraPreview extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const status = this.props.navigation.getParam("status", 0);
    const { navigation } = this.props;
    return (
      <AdView
        extended
        {...this.props}
        header={<HeaderComponent {...this.props} isActive={status} />}
      >
        <View style={styles.container}>
          <AdPerformance containerStyle={styles.adPerformanceContainer} />
          <View style={styles.eventContainer}>
            <Text style={styles.eventText}>Holiday</Text>
          </View>
          <AdMenu />
          {status ? (
            <View style={styles.buttonGroupContainer}>
              <Button
                block
                style={{ ...styles.buttonBlock, backgroundColor: "#31AF91" }}
              >
                <Text style={styles.btnText}>Edit</Text>
              </Button>
              <Button
                block
                style={{ ...styles.buttonBlock, backgroundColor: "#C75151" }}
                onPress={() =>
                  this.props.navigation.navigate("BusinessActivityPins")
                }
              >
                <Text style={styles.btnText}>Disable</Text>
              </Button>
            </View>
          ) : (
            <View style={styles.buttonGroupContainer}>
              <Button
                block
                style={{ ...styles.buttonBlock, backgroundColor: "#31AF91" }}
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
                <Text style={styles.btnText}>Post</Text>
              </Button>
              <Button
                block
                style={{ ...styles.buttonBlock, backgroundColor: "#848484" }}
                onPress={() =>
                  this.props.navigation.navigate("BusinessPostThemesEdit")
                }
              >
                <Text style={styles.btnText}>Make Changes</Text>
              </Button>
            </View>
          )}
        </View>
      </AdView>
    );
  }
}

export class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.headerBackBtn} />
        <View style={styles.headerTitleContainer}>
          {/* <Text style={styles.headerTitle}>My Activity</Text> */}
        </View>
        <Button
          transparent
          style={{
            ...styles.headerBackBtn,
            justifyContent: "flex-end",
            alignSelf: "flex-end",
          }}
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
          // onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text
            style={{
              ...styles.closeIcon,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            Post
          </Text>
        </Button>
      </SafeAreaView>
    );
  }
}
