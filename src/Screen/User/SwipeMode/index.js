import React, { Component } from "react";
import { View, Text, SafeAreaView, TouchableHighlight } from "react-native";
import Swiper from "react-native-deck-swiper";
import { isUndefined, isEmpty } from 'lodash';
import { showMessage } from "react-native-flash-message";
import SliderEntry from "./SliderEntry";
import styles from "./style";
import NoDealsView from "../NoDeals";
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getPostsPagination,
} from '../../../redux/selectors/index';
import * as postActions from '../../../redux/actions/postActions';

class SwipeMode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEmpty: false,
      likePressed: false,
      dislikePressed: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.posts) && isEmpty(this.props.post)) {
      const post = nextProps.posts[nextProps.initialCardIndex];

      this.props.postActions.viewPost({ post });
    }
  }

  likePost = () => {
    const { post } = this.props;

    this.props.postActions.likePost({
      post,
      onSuccess: () => {
        this.swiper.swipeRight();
      },
      onFail: (error) => {
        showMessage({
          message: error,
          type: 'danger',
        });
      },
    });
  };

  dislikePost = () => {
    const { post } = this.props;

    this.props.postActions.dislikePost({
      post,
      onSuccess: () => {
        this.swiper.swipeLeft();
      },
      onFail: (error) => {
        showMessage({
          message: error,
          type: 'danger',
        });
      },
    });
  };

  onPressDeal = item => {
    this.props.postActions.viewPost({
      post: item,
      callback: () => {
        this.props.navigation.navigate('UserAdView', { isUser: true })
      },
    });
  };

  getDistance = () => {
    return `${this.distance()} mi`;
  };

  _renderCard = (card, _index) => {
    if (isUndefined(card)) {
      return (<View></View>);
    }

    return <SliderEntry data={card} onPressItem={this.onPressDeal} />;
  };

  renderEmpty = () => {
    return (<NoDealsView />)
  };

  _onHideUnderlay = (isLiked) => {
    if (isLiked) this.setState({ likePressed: false })
    else this.setState({ dislikePressed: false });
  }
  _onShowUnderlay = (isLiked) => {
    if (isLiked) this.setState({ likePressed: true })
    else this.setState({ dislikePressed: true });
  }

  distance = () => {
    if (this.props.me !== undefined && this.props.post !== undefined && this.props.post.firm !== undefined) {
      const lat1 = this.props.me.latitude;
      const lon1 = this.props.me.longitude;
      const lat2 = this.props.post.firm.lat;
      const lon2 = this.props.post.firm.lng;
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

  handlePagination() {
    if (this.props.pagination.currentPage !== this.props.pagination.total) {
      this.setState({ isEmpty: false });
      this.props.postActions.fetchPosts({
        currentPage: this.props.pagination.currentPage + 1,
        perPage: this.props.pagination.perPage,
      });
    } else {
      this.setState({ isEmpty: true });
    }
  }

  render() {
    if (this.state.isEmpty) {
      return this.renderEmpty();
    } else if (this.props.postsMeta.loading) {
      return this.renderEmpty();
    } else if (this.props.data.length === 0) {
      return this.renderEmpty();
    }
    const { likePressed, dislikePressed } = this.state;
    return (
      <View>
        <Swiper
          cards={this.props.data}
          containerStyle={styles.swiperContainer}
          cardStyle={styles.cardContainer}
          ref={swiper => this.swiper = swiper}
          renderCard={this._renderCard}
          onSwiped={cardIndex => {
            const post = this.props.posts[cardIndex + 1];

            this.props.postActions.viewPost({ post });
            this.props.postActions.swipePost({
              post,
              onSuccess: () => { },
              onFail: (error) => {
                showMessage({
                  message: error,
                  type: 'danger',
                });
              },
            });
          }}
          onSwipedAll={() => this.handlePagination()}
          cardIndex={this.props.initialCardIndex}
          disableBottomSwipe={true}
          disableTopSwipe={true}
          stackSize={3}
          stackSeparation={15}
          overlayLabels={{
            left: {
              title: "DISLIKE",
              style: {
                label: {
                  ...styles.dislikeLabel,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  ...styles.likeLabel,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
        // swipeBackCard
        />

        {!isEmpty(this.props.post) &&
          <SafeAreaView style={styles.buttonGroup}>
            <View>
              <TouchableHighlight
                style={{ ...styles.actionButton, backgroundColor: "#F40100", shadowOpacity: dislikePressed ? 0 : 0.5 }}
                onHideUnderlay={() => this._onHideUnderlay(false)}
                onShowUnderlay={() => this._onShowUnderlay(false)}
                underlayColor={"#F07F7F"}
                onPress={this.dislikePost.bind(this)}
              >
                <Text style={styles.actionText}>DISLIKE</Text>
              </TouchableHighlight>
            </View>

            <View>
              <View>
                <TouchableHighlight
                  style={{ ...styles.actionButton, backgroundColor: "#5F92F3", shadowOpacity: likePressed ? 0 : 0.5 }}
                  onHideUnderlay={() => this._onHideUnderlay(true)}
                  onShowUnderlay={() => this._onShowUnderlay(true)}
                  underlayColor={"#5F92F3"}
                  onPress={this.likePost.bind(this)}
                >
                  <Text style={styles.actionText}>LIKE</Text>
                </TouchableHighlight>
              </View>

              <View style={styles.distanceCircle}>
                <Text style={styles.distanceText}>{this.getDistance()}</Text>
              </View>
            </View>
          </SafeAreaView>
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  pagination: getPostsPagination(state),
});

const mapDispatchToProps = dispatch => ({
  postActions: bindActionCreators(postActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwipeMode)
