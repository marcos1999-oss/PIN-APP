import React from "react";
import { View, Text } from "native-base";
import CustomIcon from "../../CustomIcon";
import styles from "./style";

export default class VIPCard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomIcon name="stars" style={[styles.content, styles.icon]} />
        <Text style={[styles.content, styles.largeText]}>VIP Status</Text>
        <View style={styles.comboTextContainer}>
          <Text style={[styles.content, styles.normalText]}>
            Get VIP status
          </Text>
          <Text style={[styles.content, styles.normalText]}>
            View 10 or more posts
          </Text>
        </View>
      </View>
    );
  }
}
