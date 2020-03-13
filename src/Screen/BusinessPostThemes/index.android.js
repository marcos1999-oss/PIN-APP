import React from "react";
import {
  KeyboardAvoidingView,
  InputAccessoryView,
  TextInput,
} from "react-native";
import {
  Content,
  Text,
  Button,
  View,
  Form,
  Textarea,
  Input,
} from "native-base";
import { isEmpty } from 'lodash';
import styles, { colors } from "./style.android";
import CustomIcon from "../../CustomIcon";
import { verticalScale } from "../../Utils/scaling";

import { connect } from "react-redux"
import { bindActionCreators } from 'redux'

import * as postActions from "../../redux/actions/postActions"


class BusinessPostThemes extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        params.canSubmit && (
          <Button
            transparent
            style={styles.submitButton}
            onPress={() => params.submit()}
          >
            <Text style={styles.submitText}>Submit</Text>
          </Button>
        )
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      showThemeSelection: false,
      description: "",
      activeTheme: 0,
      themeColor: "#57A3EF",
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit, canSubmit: false });
  }

  submit = e => {
    this.props.postActions.setEditingPostField({ fieldName: 'uploadMethod', fieldValue: 'theme' });
    this.props.navigation.navigate("BusinessPostThemesEdit", {
      description: this.state.description,
      themeColor: this.state.themeColor,
    });
  };

  onChangeText = (text) => {
    this.setState(
      { description: text },
      () => {
        if (isEmpty(text)) {
          this.props.navigation.setParams({ canSubmit: false });
        } else {
          this.props.navigation.setParams({ canSubmit: true });
        }
      }
    );
  };

  render() {
    const inputAccessoryViewID = "themeSelection";
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Content
          contentContainerStyle={{
            ...styles.contentContainer,
            backgroundColor: this.state.themeColor,
          }}
          keyboardShouldPersistTaps="always"
        >
          <Form>
            <TextInput
              style={styles.textArea}
              multiline={true}
              placeholderTextColor="white"
              onFocus={() => this.setState({ showThemeSelection: true })}
              onBlur={() => this.setState({ showThemeSelection: false })}
              blurOnSubmit={true}
              onSubmitEditing={this.submit}
              value={this.state.description}
              onChangeText={this.onChangeText}
              returnKeyType="done"
              numberOfLines={5}
              placeholder="Write your advertisment description in a few words"
            />
          </Form>
        </Content>
        {this.state.showThemeSelection && (
          <View style={styles.themeSelectionContainer}>
            {colors.map((color, idx) => (
              <Button
                transparent
                key={idx}
                onPress={() =>
                  this.setState({ activeTheme: idx, themeColor: color })
                }
                style={styles.themeButton}
              >
                <CustomIcon
                  name="circleSelect"
                  size={
                    this.state.activeTheme === idx
                      ? verticalScale(36)
                      : verticalScale(23)
                  }
                  style={{ ...styles.themeIcon, color }}
                />
              </Button>
            ))}
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <CustomIcon
                name="closeCircle"
                size={verticalScale(23)}
                style={{ color: "white" }}
              />
            </Button>
          </View>
        )}
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(postActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPostThemes);
