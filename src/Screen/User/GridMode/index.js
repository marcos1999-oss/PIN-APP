import React from "react";
import {
  FlatList,
  RefreshControl,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { Item, Input, Content } from "native-base";
import numeral from 'numeral'
import styles from "./style";
import VIPCard from "../../../Components/VIPCard";
import DealCard from "../../../Components/DealCard";
import NoDealsView from "../NoDeals";
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getPostsPagination,
} from '../../../redux/selectors/index';
import * as postActions from '../../../redux/actions/postActions';
import {
  verticalScale,
} from "../../../Utils/scaling";

//GridView

class GridMode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      refreshing: false,
      isEnded: false,
    };
  }

  onPressDeal = (item) => {
    this.props.navigation.navigate("UserAdView", { isUser: true });
  };

  _keyExtractor = (item, index) => item.id.toString();

  distance = (destLat, destLong) => {
    if (this.props.me !== undefined && destLat !== undefined && destLong !== undefined) {
      const lat1 = this.props.me.latitude;
      const lon1 = this.props.me.longitude;
      const lat2 = destLat;
      const lon2 = destLong;
      const R = 6371; // km (change this constant to get miles)
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = (R * c) / 1.60934;
      if (d < 1) return Math.round(d.toFixed(2) * 10) / 10;
      else return Math.round(d);
    }
  }

  _renderItem = ({ item, index }) => {
    const distance = this.distance(item.firm.lat, item.firm.lng);
    return (
      <CustomItem
        index={index + 1}
        style={[
          styles.cardContainer,
          (index + 1) % 2 == 0
            ? styles.evenCardContainer
            : styles.oddCardContainer,
        ]}
        onPress={({ item }) => this.onPressDeal({ item })}
      >
        {item.id == 9 ? (
          <VIPCard />
        ) : (
            <DealCard
              image={item.photo.url}
              title={item.title}
              viewsCount={numeral(item.viewsCount).format('0,0')}
              likesCount={numeral(item.likesCount).format('0,0')}
              distance={distance}
            />
          )}
      </CustomItem>
    );
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    // console.log("is refreshing");
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 5000);
  };

  _onChangeText = (searchValue) => {
    this.setState({ searchValue }, () => {
      this.props.onSearch(this.state.searchValue);
    }
    );
  };

  renderEmpty = () => {
    return (<NoDealsView />)
  };

  handlePagination() {
    if (this.props.pagination.currentPage !== this.props.pagination.total) {
      this.props.postActions.fetchPosts({
        currentPage: this.props.pagination.currentPage + 1,
        perPage: this.props.pagination.perPage,
      });
    }
  }

  render() {
    if (this.state.isEnded) {
      return this.renderEmpty()
    } else if (this.props.posts.length === 0 && !this.props.hasSearch) {
      return this.renderEmpty()
    }
    return (
      <View style={styles.container}>
        {this.props.hasSearch && (
          <Item regular style={styles.searchContainer}>
            <Input
              placeholder="Find what you looking for…"
              style={styles.searchInput}
              value={this.state.searchValue}
              onChangeText={this._onChangeText}
            />
          </Item>
        )}
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.props.posts}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={this._renderItem.bind(this)}
            keyExtractor={(item, idx) => item.id}
            contentContainerStyle={styles.dealsContainer}
            onEndReachedThreshold={0.2}
            onEndReached={() => this.handlePagination()}
            getItemLayout={(data, index) => (
              { length: verticalScale(247.67), offset: verticalScale(247.67) * index, index }
            )}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
                title="refreshing ..."
              />
            }
          />
        </View>
      </View>
    );
  }
}

export class CustomItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      easeAnimated: new Animated.Value(0),
    };
  }

  componentDidMount() {
    // this.easeAnimate.setValue(0);
    Animated.timing(this.state.easeAnimated, {
      toValue: 1,
      duration: 1000,
      delay: this.props.index * 500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }

  render() {
    const transform = [
      {
        translateY: this.state.easeAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [styles.cardContainer.height * 2, 0],
        }),
      },
    ];
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Animated.View style={[this.props.style, { transform }]}>
          {this.props.children}
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  pagination: getPostsPagination(state),
});

const mapDispatchToProps = dispatch => ({
  postActions: bindActionCreators(postActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridMode)
