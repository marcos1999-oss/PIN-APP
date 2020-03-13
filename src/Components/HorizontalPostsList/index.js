import React from "react";
import {
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "native-base";
import styles from "./style";
import { moderateScale, verticalScale } from "../../Utils/scaling";
import { CachedImage } from 'react-native-cached-images';


//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getPostsPagination,
} from '../../redux/selectors/index';
import * as postActions from '../../redux/actions/postActions';

class HorizontalPostsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      indexItem: 0,
    };
  }

  _renderPortrait({ item }) {
    const style = this.props.isNews
      ? this.props.data.indexOf(item) === this.props.indexSelected
        ? {}
        : styles.opacityItem
      : {};

    return (
      <TouchableOpacity
        style={styles.portraitContainer}
        onPress={() => this.clickItem(item)}
      >
        <View style={styles.portraitImageContainer}>
          {(item.photo && item.photo.url) ? (
            <CachedImage
              source={{ uri: item.photo.url }}
              style={{ ...styles.image, ...style }}
            />
          ) : (
              <View style={{ ...style.portraitImageContainer, backgroundColor: item.colorCode, flex: 1 }} />
            )}
          {item.type && (
            <View style={styles.eventType}>
              <Text style={{ fontSize: moderateScale(12), color: "white" }}>
                {item.type}
              </Text>
            </View>
          )}
        </View>
        {item.title ? (
          <Text
            numberOfLines={1}
            style={{ fontSize: moderateScale(12), color: "black" }}
          >
            {item.title}
          </Text>
        ) : null}
      </TouchableOpacity>
    );
  }

  _renderLandscape({ item, index }) {
    return (
      <TouchableOpacity
        style={styles.landscapeContainer}
        onPress={() => this.props.onPress(item, index)}
      >
        <View style={{ flex: 1 }}>
          <CachedImage source={{ uri: item.photo.url }} style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 5000);
  };

  clickItem = (item) => {
    this.props.onPress(item);

    // const index = this.props.data.indexOf(item);
    // this.setState({ indexItem: index });
  };

  render() {
    return (
      <FlatList
        horizontal
        data={this.props.data}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => (
          {
            length: verticalScale(this.props.landscape ? 100 : 170),
            offset: verticalScale(this.props.landscape ? 100 : 170) * index, index
          }
        )}
        renderItem={
          this.props.landscape
            ? this._renderLandscape.bind(this)
            : this._renderPortrait.bind(this)
        }
        keyExtractor={(item, idx) => item.id}
        contentContainerStyle={this.props.contentContainerStyle}
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          if (this.props.isTabActive && this.props.pagination && this.props.pagination.currentPage !== this.props.pagination.total) {
            this.props.postActions.fetchMyPosts({
              currentPage: this.props.pagination.currentPage + 1,
              perPage: this.props.pagination.perPage,
              onFail: error => {
                errorMessage({ message: 'Could not load your posts', description: error.message });
              }
            });
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            title="refreshing ..."
          />
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  pagination: getPostsPagination(state),
});

const mapDispatchToProps = dispatch => ({
  postActions: bindActionCreators(postActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalPostsList)
