import React from "react";
import styles, { purpleText } from "./style";
import moment from "moment";
import { cloneDeep, reject, filter, isEmpty } from "lodash";
import { View, Text } from "native-base";
import CustomIcon from "../../CustomIcon";
import numeral from 'numeral'
import { verticalScale } from "../../Utils/scaling";


export default class AdMenu extends React.Component {
  state = {
    counter: 0,
  };

  updateTime = () => {
    setTimeout(() => this.setState(prevState => ({ counter: prevState.counter + 1 })), 1000);
  }

  renderOffers(offers) {
    return offers.map((offer, idx) => {
      const remainingTime = moment(offer.endTime, 'HH:mm').utc() - moment().utc();
      this.updateTime();
      return (
        <View style={styles.menuItem} key={idx}>
          <Text style={styles.menuName} numberOfLines={1}>
            {offer.title}
          </Text>

          <View style={styles.rightText}>
            <Text style={styles.time}>{moment(remainingTime).utc().format('HH:mm')}</Text>
          </View>

          <View style={styles.rightText}>
            {offer.price ? (
              <Text style={styles.cost}>{numeral(offer.price).format('$0,0.00')}</Text>
            ) : (
                <React.Fragment>
                  <Text style={styles.cost}>{offer.percent}</Text>
                  <CustomIcon name="percentage" style={styles.percentageIcon} />
                  <Text style={styles.off}>OFF</Text>
                </React.Fragment>
              )}
          </View>
        </View>
      );
    });
  }

  renderVipMenu(offers = []) {
    return offers.map((offer, idx) => {
      const remainingTime = moment(offer.endTime, 'HH:mm').utc() - moment().utc();

      return (
        <View style={styles.menuItem} key={idx}>
          <Text
            style={{ ...styles.menuName, color: purpleText }}
            numberOfLines={1}
          >
            {offer.title}
          </Text>
          <View style={styles.rightText}>
            <Text style={styles.time}>{moment(remainingTime).utc().format('HH:mm')}</Text>
          </View>
          <View style={[styles.rightText, { width: 'auto' }]}>
            {offer.price ? (
              <Text style={styles.cost}>{numeral(offer.price).format('$0,0.00')}</Text>
            ) : (
                <React.Fragment>
                  <Text style={styles.cost}>{offer.percent}</Text>
                  <CustomIcon name="percentage" style={styles.percentageIcon} />
                  <Text style={styles.off}>OFF</Text>
                </React.Fragment>
              )}
          </View>
        </View>
      );
    });
  }

  render() {
    const offers = reject(this.props.post.offers, { vip: true });
    const vipOffers = filter(this.props.post.offers, { vip: true });

    return (
      <React.Fragment>
        <View style={styles.menuContainer}>
          {this.renderOffers(offers)}
          {isEmpty(vipOffers) && <View style={{ height: verticalScale(40) }} />}

        </View>

        {!isEmpty(vipOffers) && (
          <React.Fragment>
            <View style={styles.horizontalDivider} />
            <View style={styles.menuContainer}>
              <Text style={styles.vipTitle}>VIP</Text>
              {this.renderVipMenu(vipOffers)}
              <View style={{ height: verticalScale(40) }} />
            </View>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
