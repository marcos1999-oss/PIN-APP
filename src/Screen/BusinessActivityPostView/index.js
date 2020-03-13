import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { StackActions, NavigationActions, NavigationEvents } from 'react-navigation'
import { View, Text, Button } from "native-base";
import SwitchSelector from "react-native-switch-selector"
import styles from "./style";
import { colors } from "../UserAdView/style"
import AdView from "../../Components/AdView";
import AdOffers from "../UserAdView/AdOffers"
import AdAboutUs from "../UserAdView/AdAboutUs"
import CustomIcon from "../../CustomIcon";
import { scale, moderateScale } from "../../Utils/scaling";
import AdPerformance from "../../Components/AdPerformance";
import AdMenu from "../../Components/AdMenu";
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { errorMessage } from '../../Utils/alerts'
import { get, isNull } from 'lodash';

import { getViewingPost, getEditingPost, getUserCoordinates, getPostCoordinates } from '../../redux/selectors/index'
import * as postActions from "../../redux/actions/postActions"


class BusinessActivityPostView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const headerRight = navigation.getParam('headerRight');
    const isActive = navigation.getParam('isActive');
    const isPreview = navigation.getParam('status', 0) === 0;
    const goBack = navigation.getParam('goBack');
    const editPost = navigation.getParam('editPost');

    return {
      headerRight: headerRight && headerRight(isPreview, isActive, goBack, editPost)
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      content: 1,
    };
  }

  componentWillMount() {
    const headerRight = (isPreview, isActive, goBack, editPost) => {
      return (isPreview || !isActive) && (
        <Button
          transparent
          style={{ marginLeft: scale(15), alignSelf: "flex-end" }}
          onPress={() => isPreview ? goBack() : editPost()}
        >
          <Text
            style={{
              fontSize: moderateScale(14),
              color: "white",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            Edit
          </Text>
        </Button>
      );
    };

    this.props.navigation.setParams({
      headerRight: headerRight,
      isActive: this.props.post.active,
      goBack: this.goBack,
      editPost: this.editPost,
    });
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  disablePost = (isDelete = false) => {
    this.props.postActions.deletePost({
      post: this.props.post,
      onSuccess: () => {
        this.props.navigation.navigate('BusinessActivity');
      },
      onFail: (error) => {
        if (isDelete) {
          errorMessage({ message: 'Could not delete this post', description: error.message });
        } else {
          errorMessage({ message: 'Could not disable this post', description: error.message });
        }
      }
    });
  };

  editPost = () => {
    // TODO, if in Preview mode, should just go back

    const { post } = this.props;
    this.props.postActions.setEditingPost({ post });
    if (get(post.photo, 'url')) {
      this.props.postActions.setEditingPostField({ fieldName: 'uploadMethod', fieldValue: 'photo' });
    } else if (!isNull(post.colorCode) && !isNull(post.description)) {
      this.props.postActions.setEditingPostField({ fieldName: 'uploadMethod', fieldValue: 'theme' });
    }
    this.props.navigation.navigate('BusinessPostThemesEdit', { isNewPost: false });
  };

  activatePost = () => {
    const { post } = this.props;

    this.props.postActions.editPost({
      post: { ...post, status: 'active' },
      onSuccess: () => {
        this.props.navigation.navigate({ routeName: 'BusinessActivity' });
        this.props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'BusinessActivity' }),
          ]
        }));
      },
      onFail: error => {
        errorMessage({ message: 'Could not post', description: error.message });
      }
    });
  };

  renderContent() {
    if (this.state.content === 1) {
      return <AdOffers {...this.props} />;
    } else {
      return <AdAboutUs {...this.props} />;
    }
  }

  renderButtons() {
    const isActive = this.props.post.active;

    return isActive ? (
      <View style={styles.buttonGroupContainer}>
        <Button
          block
          style={{ ...styles.buttonBlock, backgroundColor: "#5F92F3" }}
          onPress={this.editPost}
        >
          <Text style={styles.btnText}>Edit</Text>
        </Button>
        <Button
          block
          style={{ ...styles.buttonBlock, backgroundColor: "#C75151" }}
          onPress={this.disablePost}
        >
          <Text style={styles.btnText}>Disable</Text>
        </Button>
      </View>
    ) : (
        <View style={styles.buttonGroupContainer}>
          <Button
            block
            style={{ ...styles.buttonBlock, backgroundColor: "#5F92F3" }}
            onPress={this.activatePost}
          >
            <Text style={styles.btnText}>Post</Text>
          </Button>
          <Button
            block
            style={{ ...styles.buttonBlock, backgroundColor: "#C75151" }}
            onPress={() => this.disablePost(true)}
          >
            <Text style={styles.btnText}>Delete This Post</Text>
          </Button>
        </View>
      );
  }

  render() {
    const isPreview = this.props.navigation.getParam('status', 0) === 0;

    return (
      <AdView
        {...this.props}
        skipHeader={true}
        header={<HeaderComponent {...this.props} isPreview={isPreview} editPost={this.editPost} />}
      >
        <View style={styles.container}>
          <NavigationEvents onDidFocus={(payload) => console.log(payload)} />

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
          {!isPreview && this.renderButtons()}
        </View>
      </AdView>
    );
  }
}

export class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.headerContainer}>
        {this.props.isPreview ? (
          <View style={styles.headerBackBtn} />
        ) : (
            <TouchableOpacity
              style={styles.headerBackBtn}
              onPress={() => this.props.navigation.goBack()}
            >
              <CustomIcon name="close" style={styles.closeIcon} />
            </TouchableOpacity>
          )}

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{this.props.isPreview ? 'Preview' : 'My Activity'}</Text>
        </View>

        {this.props.isPreview || !this.props.post.active ? (
          <TouchableOpacity
            style={{
              ...styles.headerBackBtn,
              marginLeft: 0,
              marginRight: scale(15),
              alignItems: "flex-end",
            }}
            onPress={() => this.props.isPreview ? this.props.navigation.goBack() : this.props.editPost()}
          >
            <Text
              style={{
                ...styles.closeIcon,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        ) : (
            <View style={styles.headerBackBtn} />
          )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: getViewingPost(state),
    editingPost: getEditingPost(state),
    userCoordinates: getUserCoordinates(state),
    postCoordinates: getPostCoordinates(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    postActions: bindActionCreators(postActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessActivityPostView);
