import React from "react";
import styles from "./style";
import { View, Text } from "native-base";
import numeral from 'numeral'
import CustomIcon from "../../CustomIcon";

export default class AdPerformance extends React.Component {
  render() {
    return (
      <View style={[styles.adPerformance, this.props.containerStyle]}>
        <Text style={styles.adStatusText}>Live Offers</Text>

        <View style={styles.performanceContainer}>
          <CustomIcon name="heart" style={styles.likeIcon} />
          <Text style={styles.performanceText}>{ numeral(this.props.post.likesCount).format('0,0') } People Liked This</Text>
        </View>

        <View style={styles.performanceContainer}>
          <CustomIcon name="eye" style={styles.watchIcon} />
          <Text style={styles.performanceText}>{ numeral(this.props.post.viewsCount).format('0,0') } Views</Text>
        </View>
      </View>
    );
  }
}
