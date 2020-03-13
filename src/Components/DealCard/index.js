import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { View, Text } from "native-base";
import CustomIcon from "../../CustomIcon";
import { CachedImage } from 'react-native-cached-images';
import styles from "./style";

export default class DealCard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <CachedImage source={{ uri: this.props.image }} style={styles.dealImage} />
        </View>
        <View style={styles.comboTextContainer}>
          <Text style={[styles.content, styles.titleText]} numberOfLines={1}>
            {this.props.title}
          </Text>
          <View style={styles.dealPerformanceContainer}>
            <View style={styles.likeContainer}>
              <CustomIcon name="heart" style={styles.likeIcon} />
              <Text style={styles.performanceText}>{this.props.likesCount} Likes</Text>
            </View>
            <View style={styles.watchContainer}>
              <CustomIcon name="eye" style={styles.watchIcon} />
              <Text style={styles.performanceText}>{this.props.viewsCount} Views </Text>
            </View>
            <Text style={styles.distanceText}>{this.props.distance} mi</Text>
          </View>
        </View>
      </View>
    );
  }
}
