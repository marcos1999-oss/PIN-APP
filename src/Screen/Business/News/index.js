import React from "react";
import { Image, ScrollView } from "react-native";
import { NavigationEvents } from 'react-navigation';
import {
  PagerTabIndicator,
  IndicatorViewPager,
  PagerTitleIndicator,
  PagerDotIndicator,
} from "rn-viewpager";
import { Container, View, Header, Body, Button, Text } from "native-base";
import { scale, moderateScale } from "../../../Utils/scaling.js";
import ActivityCarousel from "../../../Components/ActivityCarousel";
import HorizontalPostsList from "../../../Components/HorizontalPostsList";
import { postLike, postView } from "../../../Assets";
import { isEmpty } from 'lodash'
import { errorMessage } from '../../../Utils/alerts'


//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getPinCatalogsMeta,
  getHolidaysMeta,
  getPinCatalogs,
  getHolidays,
  getHasHomePin,
  getIsProfileComplete,
} from '../../../redux/selectors/index'
import * as pinCatalogActions from '../../../redux/actions/pinCatalogActions'
import * as holidayActions from '../../../redux/actions/holidayActions'

/*Style*/
import styles from "./style.js";


class BusinessNews extends React.Component {
  state = {
    stayIndexSelected: 0,
    selectedItem: null,
  };

  componentWillMount() {
    if (!this.props.pinCatalogsMeta.loading && !this.props.pinCatalogsMeta.loaded) {
      this.props.pinCatalogActions.fetchPinCatalogs({
        onFail: error => {
          errorMessage({ message: 'Could not load the store', description: error.message });
        }
      });
    }

    if (!this.props.holidaysMeta.loading && !this.props.holidaysMeta.loaded) {
      this.props.holidayActions.fetchHolidays({
        onFail: error => {
          errorMessage({ message: 'Could not load holidays', description: error.message });
        }
      });
    }
  }

  pressPins = (item) => {
    const { navigation } = this.props;
    navigation.navigate("PurchasePins", { from: navigation.state.routeName });
  };

  _onPressStayItem = (item, index) => {
    this.setState({ stayIndexSelected: index, selectedItem: item });
  };

  getPostingType(type) {
    if (type === 'Holiday') {
      return 1;
    }

    if (type === 'Birthday') {
      return 2;
    }

    return 0;
  }

  goToCreatePostScreen = (type) => {
    const { navigation } = this.props;

    // TODO, instead of setting navigation params ("postingType"),
    //   call postActions.setEditingPostField({ kinds: 'holiday' })
    navigation.navigate("Post", {
      from: navigation.state.routeName,
      postingType: this.getPostingType(type),
    });
  };

  _renderCreatePost = () => {
    return (
      <View>
        <Text style={styles.textFontSize12}>{this.state.selectedItem.subtitle}</Text>
        <Button
          style={styles.createPostBtn}
          onPress={() => this.goToCreatePostScreen('holiday')}
        >
          <Text style={[styles.createText]}>Create Posting</Text>
        </Button>
        <Text style={styles.createDescription}>{this.state.selectedItem.message}</Text>
      </View>
    );
  };

  _renderPostPinReached = () => {
    return (
      <View>
        <Text style={styles.textFontSize12}>{this.state.selectedItem.subtitle}</Text>
        <Image
          source={this.state.selectedItem.businessNotification === "view" ? postView : postLike}
          style={styles.imgIcon}
        />
        <Text style={styles.infoPinPost}>{this.state.selectedItem.message}</Text>
      </View>
    );
  };

  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }

  onWillFocus = (_payload) => {
    if (!this.props.isProfileComplete) {
      this.props.navigation.navigate('BusinessInfo');
    }
  };

  render() {
    const news = {
      isNews: true,
    };

    return (
      <Container>
        <NavigationEvents onWillFocus={this.onWillFocus} />

        <Header style={styles.headerContainer}>
          <Body style={{ alignItems: "center" }}>
            <Text style={styles.title}>News</Text>
          </Body>
        </Header>

        <ScrollView style={{ marginLeft: scale(20) }}>
          {this.props.hasHomePin && (
            <View>
              <Text style={styles.title}>Get more pins</Text>

              <View style={[styles.allPostsContainer, styles.marginBot25]}>
                <ActivityCarousel data={this.props.pinCatalogs} onPressItem={this.pressPins} />
              </View>
            </View>
          )}

          <Text style={styles.title}>Stay Updated</Text>

          <View style={styles.allPostsContainer}>
            <HorizontalPostsList
              {...news}
              data={this.props.holidays}
              indexSelected={this.state.stayIndexSelected}
              onPress={this._onPressStayItem}
            />
          </View>

          { this.state.selectedItem && this._renderCreatePost() }
          { false && this._renderPostPinReached() }
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pinCatalogsMeta: getPinCatalogsMeta(state),
    holidaysMeta: getHolidaysMeta(state),
    pinCatalogs: getPinCatalogs(state),
    holidays: getHolidays(state),
    hasHomePin: getHasHomePin(state),
    isProfileComplete: getIsProfileComplete(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    pinCatalogActions: bindActionCreators(pinCatalogActions, dispatch),
    holidayActions: bindActionCreators(holidayActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessNews);

