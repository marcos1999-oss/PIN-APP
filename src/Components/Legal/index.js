import React from "react";
import { Text, View, Dimensions, ScrollView } from "react-native";
import { Container } from "native-base";
import Image from "react-native-auto-height-image";
import { logo, cityMask } from "../../Assets";
import { connect } from "react-redux";
import { ScreenLoading } from "../Common";
import { bindActionCreators } from 'redux';
import CustomIcon from "../../CustomIcon";
import * as legalActions from '../../redux/actions/legalActions'
import { scale, verticalScale, moderateScale } from "../../Utils/scaling";
import { ScrollableComponent } from "../../Components/ScrollableComponent";

let conf;

class LegalScreen extends React.Component {
  screenWidth = Dimensions.get("window").width;

  state = {
    isReady: false,
    content: '',
  };

  constructor(props) {
    super(props);
    this.type = this.props.navigation.getParam("type", "privacy");
    switch (this.type) {
      case "terms":
        conf = {
          backgroundColor: "#E04F5F",
          icon: "certificate",
        };
        break;
      case "about":
        conf = {
          backgroundColor: "#25B7D3",
          icon: "certificate",
        };
        break;
      default:
        conf = {
          backgroundColor: "#32BEA6",
          icon: "lockCloud",
        };
        break;
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isReady: true }), 0); //1500

    const mode = this.props.navigation.getParam("mode", "user");

    if (mode === 'user') {
      if (this.type === "terms") {
        this.props.legalActions.fetchLegalUserTerms({
          onSuccess: (response) => {
            this.setState({ content: response.content })
          },
          onFail: (error) => {
          },
        });

      }

      if (this.type === "privacy") {
        this.props.legalActions.fetchLegalUserPrivacy({
          onSuccess: (response) => {
            this.setState({ content: response.content })
          }, onFail: (error) => {
          },
        });
      }
    }

    else {
      if (this.type === "terms") {
        this.props.legalActions.fetchLegalBusinessTerms({
          onSuccess: (response) => {
            this.setState({ content: response.content })
          },
          onFail: (error) => {
          },
        });

      }

      if (this.type === "privacy") {
        this.props.legalActions.fetchLegalBusinessPrivacy({
          onSuccess: (response) => {
            this.setState({ content: response.content })
          },
          onFail: (error) => {
          },
        });
      }
    }
  }

  render() {
    let main = (
      <View style={{ flex: 1, backgroundColor: this.type === "terms" ? "#E04F5F" : "#32BEA6" }}>
        <Image source={cityMask} width={this.screenWidth} />

        <View
          style={{
            alignItems: "center",
            position: "absolute",
            width: "100%",
          }}
        >
          {this.type === "about" ? (
            <Image source={logo} width={scale(21)} />
          ) : (
              <CustomIcon
                name={conf.icon}
                size={verticalScale(32)}
                color={"#fff"}
              />
            )}
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: scale(40),
            paddingTop: verticalScale(10),
          }}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: scale(10),
              paddingBottom: verticalScale(20),
              paddingTop: verticalScale(10),
            }}
          >
            <Text style={{ color: "#fff", fontSize: moderateScale(14) }}>
              {this.props.navigation.getParam("title", "Privacy Policy")}
            </Text>
          </View>
          <ScrollableComponent style={{ marginBottom: verticalScale(10), marginTop: verticalScale(15) }}>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: moderateScale(12),
                }}
              >
                {this.state.content}
              </Text>
            </View>
          </ScrollableComponent>
        </View>
      </View>
    );

    return this.state.isReady ? (
      main
    ) : (
        <ScreenLoading bgcolor="#5F92F3" color="#fff" />
      );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    legalActions: bindActionCreators(legalActions, dispatch),
  }
};

export default connect(null, mapDispatchToProps)(LegalScreen);

