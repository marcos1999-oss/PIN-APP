import React from "react";
import { View, Text } from "native-base";
import { TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import HorizontalPostsList from "../../../../Components/HorizontalPostsList";
import styles from "./style";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMyPins } from '../../../../redux/selectors/index';
import * as pinActions from '../../../../redux/actions/pinActions';
import {filter} from 'lodash';

class ActiveActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      loaded: false,
    };
    this.data = [];
  }
  componentDidMount = () => {

    const didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.props.pins.map(item => {
          if (!item.childOfId && !item.isHome) {
            this.data.push(item);
          }
        });
        this.setState({ loaded: true });
      }
    );


  }
  onPressPost = (item, backToHome = false) => {
    this.props.postActions.viewPost({
      post: item,
      callback: () => {
        this.props.navigation.navigate('BusinessActivityPostView', { status: 1, backToHome });
      },
    });


  };

  onPressPin = (item, index) => {
    this.props.pinActions.viewPin({
      pin: item,
      callback: () => {
        this.props.navigation.navigate('BusinessActivityPins', { idx: index });
      },
    });
  };


  render() {
    let {openPost} = this.props;
    if (openPost > -1) {
      const item = filter(this.props.posts, data => {
        return data.id.toString() === openPost.toString();
      });
      if (item.length > 0) {
        this.onPressPost(item[0], true);
      };
    }
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>All Posts</Text>
          <View style={styles.allPostsContainer}>
            {this.props.posts.length >= 1 ? <HorizontalPostsList onPress={this.onPressPost} data={this.props.posts} {...this.props} />
              : <Text style={styles.NoPostsShowMessage}>There are no posts to display. Start sharing what your bussiness has to offer now.</Text>
            }
          </View>

          <Text style={styles.title}>Pins</Text>
          {this.state.loaded ?
            <HorizontalPostsList landscape onPress={this.onPressPin} data={this.data} {...this.props} /> :
            <ActivityIndicator />
          }
        </View>
      </View>);

  }
}
const mapStateToProps = (state) => {
  return {
    pins: getMyPins(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    pinActions: bindActionCreators(pinActions, dispatch),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ActiveActivity);
