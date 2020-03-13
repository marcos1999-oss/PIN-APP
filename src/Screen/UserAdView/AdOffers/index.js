import React from "react";
import { View, Text, Button } from "native-base";
import styles, { purpleText } from "./style";
import CustomIcon from "../../../CustomIcon";
import AdPerformance from "../../../Components/AdPerformance";
import AdMenu from "../../../Components/AdMenu";

export default class AdOffers extends React.Component {
  render() {
    const iconName = {
      'regular': 'radar',
      'holiday': 'celebrate',
      'birthday': 'birthday',
    }[this.props.post.kinds];

    const iconColor = {
      'regular': 'black',
      'holiday': '#02BAFF',
      'birthday': '#AD378C',
    }[this.props.post.kinds];

    return (
      <View style={styles.container}>
        <View style={styles.eventContainer}>
          { iconName && (
            <Button rounded style={styles.eventButton}>
              <CustomIcon name={ iconName } style={{ ...styles.eventIcon, color: iconColor }} />
            </Button>
          )}

          <Text style={{ ...styles.eventText, color: iconColor, textTransform: 'capitalize' }}>{ this.props.post.kinds }</Text>
        </View>

        <AdPerformance {...this.props} />
        <AdMenu {...this.props} />
      </View>
    );
  }
}
