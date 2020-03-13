import React from "react"
import { connect } from "react-redux"
import { View } from "native-base"
import styles, { colors } from "./style"
import SwitchSelector from "react-native-switch-selector"
import AdView from "../../Components/AdView"
import AdOffers from "./AdOffers"
import AdAboutUs from "./AdAboutUs"
import { bindActionCreators } from 'redux'

import { getViewingPost, getUserCoordinates, getPostCoordinates } from '../../redux/selectors/index'
import * as postActions from "../../redux/actions/postActions"

class UserAdView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: 1,
    };
  }

  pressLiked = isLiked => {
    const { post } = this.props;

    if (isLiked) {
      // remove like
      this.props.postActions.dislikePost({ post });
    } else {
      this.props.postActions.likePost({ post });
    }
  };

  renderContent() {
    if (this.state.content === 1) {
      return <AdOffers {...this.props} />;
    } else {
      return <AdAboutUs {...this.props} />;
    }
  }

  render() {
    return (
      <AdView {...this.props} pressLiked={this.pressLiked}>
        <View style={styles.container}>
          <SwitchSelector
            initial={0}
            onPress={value => this.setState({ content: value })}
            textColor={colors.defaultText} // #7a44cf
            selectedColor={colors.activeText}
            buttonColor={colors.button}
            borderColor={colors.border}
            height={styles.switchContainer.height}
            style={styles.switchContainer}
            hasPadding
            options={[
              { label: "Offers", value: 1 },
              { label: "About us", value: 2 },
            ]}
          />

          {this.renderContent()}
        </View>
      </AdView>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: getViewingPost(state),
    userCoordinates: getUserCoordinates(state),
    postCoordinates: getPostCoordinates(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    postActions: bindActionCreators(postActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAdView);
