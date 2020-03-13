import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import Image from "react-native-auto-height-image";
import { Btn } from "../../Components/Common";
import CustomIcon from "../../CustomIcon";
import { city3 } from "../../Assets";
import TitleAndDescriptionComponent from "../../Components/TitleAndDescriptionComponent";
import style, {
  IconSupportStyle,
  btnDoneStyle,
  titleTextStyle,
  descriptionTextStyle,
} from "./inputAndSent.style";

class ReportListingSent extends React.Component {
  static navigationOptions = () => {
    return {
      headerBackImage: null,
      headerTitle: "",
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
            titleTextStyle={titleTextStyle}
            descriptionTextStyle={descriptionTextStyle}
            description="Thank you for reporting this listing."
            subDescription="We will contact listing owner and investigate further."
            style={style.supportTeamFormStyle}
          />
          <Btn
            block
            rounded
            title="Done"
            onPress={() => {
              this.props.navigation.navigate("UserMain");
            }}
            {...btnDoneStyle}
          />
          <View style={style.adviceStyle}>
            <Text style={style.adviceTextStyle}>
              Help our community to provide better services.
            </Text>
          </View>
        </View>
        <Image
          style={style.l_bottom}
          source={city3}
          width={style.l_bottom.width}
        />
      </SafeAreaView>
    );
  }
}

export default ReportListingSent;
