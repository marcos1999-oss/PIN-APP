import React from "react";
import { BackHandler, Platform } from "react-native";
import { connect } from "react-redux";
import AppNavigation from "./AppNavigation";

class ReduxNavigation extends React.Component {
  componentWillMount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener("hardwareBackPress", undefined);
    }
  }

  render() {
    return (
      <AppNavigation dispatch={this.props.dispatch} state={this.props.nav} />
    );
  }
}

const mapStateToProps = (state) => ({ nav: state.nav });

export default connect(mapStateToProps)(ReduxNavigation);
