import React from "react";
import { Text, View } from "react-native";
import { Container } from "native-base";
import { logo, city } from "../../Assets";
import { ScreenHeader, ScreenLoading } from "../../Components/Common";

/*Style*/
import style from "./style.js";

class Blank extends React.Component {
  state = {
    isReady: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isReady: true }), 0); //1500
  }

  render() {
    let main = (
      <Container>
        <Text>Blank Screen</Text>
      </Container>
    );

    return this.state.isReady ? (
      main
    ) : (
      <ScreenLoading bgcolor="#25B7D3" color="#fff" />
    );
  }
}

export default Blank;
