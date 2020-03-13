import React from "react";
import {
  View,
  Text,
  Button,
  List,
  ListItem,
  Left,
  Right,
  Icon,
} from "native-base";
import { Linking, TouchableOpacity } from 'react-native';
import { isEqual, isEmpty, head, last, join, map, sortBy, filter } from 'lodash';
import styles from "./style";
import { DetailedFeatureList } from '../../../Components/Common'

export default class AdAboutUs extends React.Component {
  static getScheduleName(schedule) {
    const dayNames = {
      '0': 'Sun',
      '1': 'Mon',
      '2': 'Tue',
      '3': 'Wed',
      '4': 'Thu',
      '5': 'Fri',
      '6': 'Sat',
    };
    const weekDays = sortBy(schedule.weekDays, [(wd) => parseInt(wd)]);

    if (isEmpty(weekDays)) {
      return 'Daily';
    }

    if (weekDays.length === 1) {
      return dayNames[weekDays[0]];
    }

    // all days
    if (isEqual(weekDays, ['0', '1', '2', '3', '4', '5', '6'])) {
      return 'Daily';
    }

    if (isEqual(weekDays, ['0', '6'])) {
      return 'Weekends';
    }

    // if it's a sequence (eg: [3, 4, 5])
    if ((parseInt(last(weekDays)) - parseInt(head(weekDays))) === (weekDays.length - 1)) {
      return `${dayNames[head(weekDays)]} - ${dayNames[last(weekDays)]}`;
    }

    return join(map(weekDays, (wd) => dayNames[wd]), '/');
  }

  static getScheduleHours(schedule) {
    return `${schedule.starts} - ${schedule.ends}`;
  }

  renderSchedules(schedules) {
    return map(filter(schedules, (s) => !isEmpty(s.weekDays)), (schedule) => {
      const scheduleName = AdAboutUs.getScheduleName(schedule);
      const scheduleHours = AdAboutUs.getScheduleHours(schedule);

      return (
        <View style={styles.schedule} key={schedule.id}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{scheduleName}</Text>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.time}>{scheduleHours}</Text>
          </View>
        </View>
      );
    });
  }

  render() {
    let websiteURL = `${this.props.post.firm.website}`;
    websiteURL = (websiteURL.includes('http') || websiteURL.includes('https')) ? websiteURL : `https://www.${this.props.post.firm.website}`;
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.post.firm.name}</Text>
        <Text style={styles.summary} numberOfLines={3}>
          {this.props.post.firm.about}
        </Text>

        <DetailedFeatureList
          features={this.props.post.firm.features}
          outerContainerStyle={styles.featuresTable}
          containerStyle={styles.featuresContainer}
          imageContainerStyle={styles.featureImageContainer}
          imageStyle={styles.featureImage}
          textContainerStyle={styles.featureTextContainer}
          textStyle={styles.featureText}
        />

        <Text style={styles.title}>Store Hours</Text>

        <View style={styles.scheduleContainer}>
          {this.renderSchedules(this.props.post.firm.schedules)}
        </View>

        <List style={styles.bottomList}>
          <ListItem style={{ ...styles.listItem, borderTopWidth: 0.5 }} onPress={() => { (this.props.post && this.props.post.firm && this.props.post.firm.website) && Linking.openURL(websiteURL) }}>
            <Left>
              <Text>{this.props.post.firm.name} website</Text>
            </Left>

            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem
            style={styles.listItem}
            onPress={() => this.props.navigation.navigate("ReportListing")}
          >
            <Left>
              <Text>Report this listing</Text>
            </Left>

            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </View>
    );
  }
}
