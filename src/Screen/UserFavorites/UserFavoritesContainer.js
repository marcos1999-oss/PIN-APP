import React from "react";
import { Animated, FlatList, View, Image, TouchableOpacity, Platform } from "react-native";
import {

  Text,
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Content,
} from "native-base";
import { SwipeRow } from "react-native-swipe-list-view";
import CustomIcon from "../../CustomIcon";
import { errorMessage } from '../../Utils/alerts'

import styles from "./style";
import { scale, verticalScale } from "../../Utils/scaling";
import { CachedImage } from 'react-native-cached-images';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getLikedPostsPagination,
} from '../../redux/selectors/index';
import * as postActions from '../../redux/actions/postActions';


export const DealItem = ({ item, onPressItem }) => {
  const subText = `${item.firm.city} ${item.distance.toString()} mi`;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.itemContainer}
      onPress={() => onPressItem()}
    >
      <View style={styles.branchContainer}>
        <View style={styles.branchImageContainer}>
          <CachedImage source={{ uri: item.firm.photo.url }} style={styles.branchImage} />
        </View>

        <Text style={styles.branchName} numberOfLines={1}>
          {item.firm.name}
        </Text>
      </View>

      <View style={styles.dealInfo}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={styles.subText}>{subText}</Text>
      </View>
    </TouchableOpacity>
  );
};


class UserFavoriteComponent extends React.Component {

  goToAdView = (...e) => {
    this.props.navigation.navigate("UserAdView");
  };

  _renderItem = ({ item }) => {
    return (
      <View style={styles.swipeContainer}>
        <SwipeRow
          closeOnScroll={true}
          previewRowKey={item.id}
          rightOpenValue={scale(-75)}
          disableRightSwipe
          closeOnRowPress={false}
          onSwipeValueChange={(s) => {
            /*

            if (s.direction === "right") {
              this.removeItem(item);
            }*/
          }}
        >
          <Button
            transparent
            onPress={() => this.removeItem(item)}
            style={styles.deleteBtn}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </Button>

          <DealItem item={item} onPressItem={this.goToAdView} />
        </SwipeRow>
      </View>
    );
  };

  removeItem = (post) => {
    this.props.postActions.unfavoritePost({
      post,
      onSuccess: () => {

      },
      onFail: (error) => {
        errorMessage({ message: 'Could not remove this post from favorites', description: error.message });
      }
    });
  };

  onListEndReached() {
    if (this.props.pagination.currentPage !== this.props.pagination.totalPages) {
      this.props.postActions.fetchLikedPosts({
        currentPage: this.props.pagination.currentPage + 1,
        perPage: this.props.pagination.perPage
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header}>
          <Left style={{ flex: 1 }} />
          <Body>
            <Text style={styles.headerContentStyle}>Favorites</Text>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <CustomIcon name="close" style={styles.headerContentStyle} />
            </Button>
          </Right>
        </Header>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.props.likedPosts}
            style={{ width: '100%' }}
            contentContainerStyle={styles.favoritesContent}
            renderItem={this._renderItem}
            keyExtractor={(item, idx) => item.id}
            getItemLayout={(data, index) => (
              { length: verticalScale(56.44), offset: verticalScale(56.44) * index, index }
            )}
            onEndReachedThreshold={0.2}
            onEndReached={() => this.onListEndReached()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  pagination: getLikedPostsPagination(state),
});

const mapDispatchToProps = dispatch => ({
  postActions: bindActionCreators(postActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserFavoriteComponent)
