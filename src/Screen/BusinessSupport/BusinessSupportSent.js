import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import Image from "react-native-auto-height-image";
import { Btn } from "../../Components/Common";
import CustomIcon from "../../CustomIcon";
import { width } from "../../Utils/scaling";
import { city2 } from "../../Assets";
import TitleAndDescriptionComponent from "../../Components/TitleAndDescriptionComponent";
import style, { IconSupportStyle, btnDoneStyle } from "./style.js";

class BusinessSupportSent extends React.Component {
  static navigationOptions = () => {
    return {
      headerBackImage: null,
    };
  };
  render() {
    return (
      <SafeAreaView style={style.l_container}>
        <View style={{ alignItems: "center" }}>
          <CustomIcon {...IconSupportStyle} />
        </View>
        <View style={style.sentContentStyle}>
          <TitleAndDescriptionComponent
            title="Support Team"
            titleTextStyle={{ fontWeight: "100" }}
            description="Our team will email you back with a reply within the next 24 hours."
            style={style.supportTeamFormStyle}
          />
          <Btn
            block
            rounded
            title="Done"
            onPress={() => {
              this.props.navigation.navigate("BusinessMeMainScreen");
            }}
            {...btnDoneStyle}
          />
          <View style={style.adviceStyle}>
            <Text style={style.adviceTextStyle}>Please check your emails.</Text>
          </View>
        </View>
        <Image style={style.l_bottom} source={city2} width={width} />
      </SafeAreaView>
    );
  }
}

export default BusinessSupportSent;
