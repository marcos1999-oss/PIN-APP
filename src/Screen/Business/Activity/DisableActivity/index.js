import React from "react";
import { View, Text } from "native-base";
import HorizontalPostsList from "../../../../Components/HorizontalPostsList";
import styles from "./style";

export default class DisableActivity extends React.Component {
  constructor(props) {
    super(props);
  }

  onPressPost = (item) => {
    this.props.postActions.viewPost({
      post: item,
      callback: () => {
        this.props.navigation.navigate('BusinessActivityPostView', { status: 1 });
      },
    });
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>All Deleted Posts</Text>
          <View style={styles.allPostsContainer}>
            <HorizontalPostsList onPress={this.onPressPost} data={this.props.posts} {...this.props} />
          </View>
          {/* <Text style={styles.title}>Pins</Text>
          <View style={styles.PinsContainer}>
            <HorizontalPostsList landscape />
          </View> */}
        </View>
      </View>
    );
  }
}
