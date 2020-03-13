import React from "react";
import { Text } from "react-native";
import { NavigationEvents } from 'react-navigation';
import ActivityCarousel from "../../../Components/ActivityCarousel";
import {
  Container,
  View,
  Content,
  Header,
  Body,
  Tab,
  Tabs,
  TabHeading,
} from "native-base";
import { moderateScale } from "../../../Utils/scaling.js";
import ActiveActivity from "./ActiveActivity";
import DisableActivity from "./DisableActivity";
import { errorMessage } from '../../../Utils/alerts'


//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*Style*/
import styles from "./style.js";
import { ScrollableComponent } from "../../../Components/ScrollableComponent";
import { responsiveHeight } from "../../../Utils/dimensions";

import {
  getPinsMeta,
  getPostsMeta,
  getPinCatalogsMeta,
  getMyPins,
  getPinCatalogs,
  getMyPosts,
  getMyActivePosts,
  getMyDisabledPosts,
  getHasHomePin,
  getIsProfileComplete,
  getPostsPagination,
  getPinCatalogPagination,
} from '../../../redux/selectors/index'
import * as pinActions from '../../../redux/actions/pinActions'
import * as pinCatalogActions from '../../../redux/actions/pinCatalogActions'
import * as postActions from '../../../redux/actions/postActions'


class BusinessActivity extends React.Component {
  state = {
    isTabActive: false,
  };

  componentWillMount() {
    this.props.postActions.clearPostData();
    if (!this.props.pinsMeta.loadingMine && !this.props.pinsMeta.loadedMine) {
      this.props.pinActions.fetchMyPins({
        onFail: error => {
          errorMessage({ message: 'Could not load your pins', description: error.message });
        }
      });
    }
    if (!this.props.pinCatalogsMeta.loading && !this.props.pinCatalogsMeta.loaded) {
      this.props.pinCatalogActions.fetchPinCatalogs({
        currentPage: this.props.pinCatalogPagination.currentPage,
        perPage: this.props.pinCatalogPagination.perPage,
        onFail: error => {
          errorMessage({ message: 'Could not load the store', description: error.message });
        }
      });
    }
    if (!this.props.postsMeta.loadingMine && !this.props.postsMeta.loadedMine) {
      this.props.postActions.fetchMyPosts({
        currentPage: this.props.postPagination.currentPage,
        perPage: this.props.postPagination.perPage,
        onFail: error => {
          errorMessage({ message: 'Could not load your posts', description: error.message });
        }
      });
    }
  }

  onPressCatalog = (item, idx) => {
    const { navigation } = this.props;

    this.props.pinCatalogActions.viewPinCatalog({
      pinCatalog: item,
      callback: () => {
        navigation.navigate("PurchasePins", { from: navigation.state.routeName, idx: idx });
      },
    });
  };

  onWillFocus = (_payload) => {
    this.setState(() => ({ isTabActive: true }));
    if (!this.props.isProfileComplete) {
      this.props.navigation.navigate('BusinessInfo');
    }
  };

  render() {
    const {navigation} = this.props;
    let openPost = -1;
    if (navigation.state && navigation.state.params && navigation.state.params.openPost !== null) {
      openPost = navigation.state.params.openPost;
    }
    const { isTabActive } = this.state;
    return (
      <Container>
        <NavigationEvents onWillFocus={this.onWillFocus} />

        <Header style={styles.headerContainer}>
          <Body style={{ alignItems: "center" }}>
            <Text style={{ fontSize: moderateScale(12), marginTop: responsiveHeight(2), color: "black" }}>
              My Activity
            </Text>
          </Body>
        </Header>
        {/* <Content>

        </Content> */}
        <ScrollableComponent>
          {this.props.hasHomePin && (
            <ActivityCarousel data={this.props.pinCatalogs} onPressItem={this.onPressCatalog} />
          )}

          <Tabs tabBarUnderlineStyle={styles.underlineTab} locked>
            <Tab
              heading="Active"
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.tabStyle}
              textStyle={styles.textStyle}
              activeTextStyle={styles.activeTextStyle}
            >
              <ActiveActivity {...this.props} posts={this.props.myActivePosts} openPost={openPost} isTabActive={isTabActive} />
            </Tab>

            <Tab
              heading="Disable"
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.tabStyle}
              textStyle={styles.textStyle}
              activeTextStyle={styles.activeTextStyle}
            >
              <DisableActivity {...this.props} posts={this.props.myDisabledPosts} />
            </Tab>
          </Tabs>
        </ScrollableComponent>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pinsMeta: getPinsMeta(state),
    pinCatalogsMeta: getPinCatalogsMeta(state),
    postsMeta: getPostsMeta(state),
    pins: getMyPins(state),
    pinCatalogs: getPinCatalogs(state),
    myActivePosts: getMyActivePosts(state),
    myDisabledPosts: getMyDisabledPosts(state),
    posts: getMyPosts(state),
    hasHomePin: getHasHomePin(state),
    isProfileComplete: getIsProfileComplete(state),
    postPagination: getPostsPagination(state),
    pinCatalogPagination: getPinCatalogPagination(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    pinActions: bindActionCreators(pinActions, dispatch),
    pinCatalogActions: bindActionCreators(pinCatalogActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessActivity);
