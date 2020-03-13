import React, { Component } from "react";
import { View, Text } from "react-native";
import Carousel from "react-native-snap-carousel";
import { isEqual } from 'lodash';

import SliderEntry from "./SliderEntry";
import { sliderWidth, itemWidth } from "./SliderEntry.style";

/*Style*/
import styles from "./style.js";

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getPinCatalogPagination,
} from '../../redux/selectors/index'
import * as pinCatalogActions from '../../redux/actions/pinCatalogActions'

class ActivityCarousel extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderItem({ item, index }) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        onPressItem={(item) =>
          this.props.onPressItem && this.props.onPressItem(item, index)
        }
      />
    );
  }

  render() {
    return (
      <Carousel
        ref={(c) => { this._carousel = c; }}
        data={this.props.data}
        renderItem={this._renderItem.bind(this)}
        firstItem={this.props.carouselIndex || 0}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={1}
        enableMomentum={true}
        activeSlideAlignment={"start"}
        // containerCustomStyle={styles.slider}
        // contentContainerCustomStyle={styles.sliderContentContainer}
        activeAnimationType={"spring"}
        activeAnimationOptions={{
          friction: 4,
          tension: 40,
        }}
        onSnapToItem={this.props.onSnapToItem}
        onBeforeSnapToItem={(slideIndex) => {
          if (
            isEqual(slideIndex, this.props.data.length - 1)
            && isEqual(this.props.data[slideIndex].type, "pinCatalog")
            && !isEqual(this.props.pinCatalogPagination.currentPage, this.props.pinCatalogPagination.totalPages)
          ) {
            this.props.pinCatalogActions.fetchPinCatalogs({
              currentPage: this.props.pinCatalogPagination.currentPage + 1,
              perPage: this.props.pinCatalogPagination.perPage,
              onFail: error => {
                errorMessage({ message: 'Could not load your posts', description: error.message });
              }
            });
          }
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pinCatalogPagination: getPinCatalogPagination(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    pinCatalogActions: bindActionCreators(pinCatalogActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityCarousel);
