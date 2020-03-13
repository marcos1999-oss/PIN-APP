import React from "react";
import { View } from "react-native";
import Button from "./Button";

/*Style*/
import style from "./style.js";
class Index extends React.Component {
  componentDidMount() {
    this.props.Store.currentScreen = this.props.navigation.getCurrentRoute().routeName;
  }

  changeScreen(key) {
    this.props.Store.currentScreen = key;
    this.props.navigation.navigate(key, { Store: this.props.Store });
  }

  render() {
    return (
      <View style={style.navigation}>
        {this.props.keys.map((key) => (
          <Button
            key={key}
            active={this.props.Store.currentScreen == key}
            onPress={() => this.changeScreen(key)}
            type={key}
          />
        ))}
      </View>
    );
  }
}

export default Index;
