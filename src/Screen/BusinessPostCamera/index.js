import React from "react";
import { Text, View, Image } from "react-native";
import {
  Container,
  Button,
  Footer,
  Left,
  Body,
  Right,
  Content,
} from "native-base";
import { NavigationEvents } from "react-navigation";
import { get } from 'lodash';
import { CachedImage } from 'react-native-cached-images';

/*Style*/
import style from "./style.js";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { getEditingPost } from '../../redux/selectors/index';
import * as postActions from "../../redux/actions/postActions"


class BusinessPostCamera extends React.Component {
  postImage() {
    this.props.postActions.setEditingPostField({ fieldName: 'uploadMethod', fieldValue: 'photo' });
    this.props.navigation.navigate('BusinessPostThemesEdit');
  }

  render() {
    const photoUri = get(this.props.post, 'photo.url', null);

    return (
      <Container>
        <NavigationEvents onDidFocus={(payload) => console.log(payload)} />

        <View style={{ flex: 1 }}>
          <CachedImage
            source={{ uri: photoUri }}
            style={{ flex: 1, resizeMode: "cover" }}
          />
        </View>
        <Footer style={style.bottom}>
          <Left style={{ ...style.bottomItemContainer, flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("BusinessPost")}
            >
              <Text style={style.textIcon}>Retake</Text>
            </Button>
          </Left>
          <Body
            style={{
              ...style.bottomItemContainer,
              flex: 2,
              flexDirection: "column",
            }}
          />
          <Right style={{ ...style.bottomItemContainer, flex: 1 }}>
            <Button
              style={style.postButton}
              onPress={this.postImage.bind(this)}
            >
              <Text style={style.textIcon}>Post</Text>
            </Button>
          </Right>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: getEditingPost(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(postActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPostCamera);
