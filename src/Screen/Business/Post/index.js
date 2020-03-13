import React from "react";
import { RNCamera } from "react-native-camera";
import ImagePicker from "react-native-image-picker";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { Container, Button, Footer, Left, Body, Right } from "native-base";
import ImageResizer from 'react-native-image-resizer';
import CustomIcon from "../../../CustomIcon";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { getEditingPost, getIsProfileComplete, } from '../../../redux/selectors/index'
import * as postActions from '../../../redux/actions/postActions'

import { errorMessage } from '../../../Utils/alerts'

/*Style*/
import style, { captureBtnSize, powerIconSize } from "./style.js";

const PendingView = () => (
  <View></View>
);

const androidCameraPermissionOptions = {
  title: "Permission to use camera",
  message: "We need your permission to use your camera",
  buttonPositive: "Ok",
  buttonNegative: "Cancel",
};

const options = {
  title: "Select Avatar",
  storageOptions: {
    skipBackup: true,
    path: "images",
    quality: 0.5,
  },
};

class BusinessPostScreen extends React.Component {
  state = {
    isCameraActive: false,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button transparent style={style.powerButton}>
          <CustomIcon
            name="power"
            size={powerIconSize}
            style={style.powerIcon}
          />
        </Button>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      isPermissionAllow: false,
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
        // barcodeFinderVisible: false
      },
    };
  }

  async componentDidMount() {
    await this.requestCameraPermission();
  }

  requestCameraPermission = async () => {
    try {
      if (Platform.OS === "android" && Platform.Version >= 23) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message:
              "Scopin needs access to your camera " +
              "so you can make awesome posts.",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.props.navigation.setParams({
            tabBar: false,
          });
          this.setState({ isPermissionAllow: true });
        } else {
          // console.warn("Camera permission denied");
        }
      } else {
        this.props.navigation.setParams({
          tabBar: false,
        });
        this.setState({ isPermissionAllow: true });
      }
    } catch (error) {
      // console.warn(err);
    }
  };

  async pressLibrary() {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        // console.log("User cancelled image picker");
      } else if (response.error) {
        // console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        // console.log("User tapped custom button: ", response.customButton);
      } else {

        ImageResizer.createResizedImage(response.uri, 512, 512, 'JPEG', 100).then(({ uri }) => {

          this.props.postActions.setEditingPostField({ fieldName: 'photo', fieldValue: { url: uri } });
          this.props.postActions.setEditingPostField({ fieldName: 'uploadMethod', fieldValue: 'photo' });
          this.props.navigation.navigate('BusinessPostCamera');
        }).catch(err => {
          console.error(err);
        });
      }
    });
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const response = await this.camera.takePictureAsync(options);


      ImageResizer.createResizedImage(response.uri, 512, 512, 'JPEG', 100).then(({ uri }) => {

        this.props.postActions.setEditingPostField({ fieldName: 'photo', fieldValue: { url: uri } });
        this.props.postActions.setEditingPostField({ fieldName: 'uploadMethod', fieldValue: 'photo' });
        this.props.navigation.navigate('BusinessPostCamera');
      }).catch(err => {
        console.error(err);
      });
    }
  }

  onWillFocus = (_payload) => {
    if (!this.props.isProfileComplete) {
      this.props.navigation.navigate('BusinessInfo');
    } else {
      this.setState(() => ({ isCameraActive: true }));
    }
  };

  render() {
    const { isCameraActive } = this.state;
    return (
      <Container>
        <NavigationEvents
          onWillFocus={this.onWillFocus}
        />

        <StatusBar barStyle="light-content" />
        {
          isCameraActive && (
            <RNCamera
              ref={(ref) => {
                this.camera = ref;
              }}
              style={style.l_camera_preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={androidCameraPermissionOptions}
            >
              {({ camera, status, _recordAudioPermissionStatus }) => {
                if (status !== "READY") {
                  return <PendingView />;
                }
                return (
                  <Footer style={style.bottom}>
                    <Left style={{ ...style.bottomItemContainer, flex: 1 }}>
                      <Button transparent onPress={this.pressLibrary.bind(this)}>
                        <CustomIcon
                          name="photos"
                          size={20}
                          style={style.bottomIcon}
                        />
                      </Button>
                      <Text style={style.textIcon}>Library</Text>
                    </Left>
                    <Body
                      style={{
                        ...style.bottomItemContainer,
                        flex: 2,
                        flexDirection: "column",
                      }}
                    >
                      <TouchableOpacity
                        rounded
                        style={style.postButton}
                        onPress={this.takePicture.bind(this)}
                      >
                        <CustomIcon
                          name="camera"
                          size={captureBtnSize}
                          style={style.bottomIcon}
                        />
                        <Text style={style.textIcon}>Post</Text>
                      </TouchableOpacity>
                    </Body>
                    <Right style={{ ...style.bottomItemContainer, flex: 1 }}>
                      <Button
                        transparent
                        onPress={() =>
                          this.props.navigation.navigate("BusinessPostThemes")
                        }
                      >
                        <CustomIcon
                          name="paintSwatch"
                          size={20}
                          style={style.bottomIcon}
                        />
                      </Button>
                      <Text style={style.textIcon}>Themes</Text>
                    </Right>
                  </Footer>
                  // <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                  //   <TouchableOpacity onPress={this.takePicture.bind(this)} style={style.l_camera_capture}>
                  //     <CustomIcon name='camera' size={captureBtnSize} style={style.captureButton} />
                  //   </TouchableOpacity>
                  // </View>
                );
              }}
            </RNCamera>
          )
        }
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: getEditingPost(state),
    isProfileComplete: getIsProfileComplete(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(postActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPostScreen);
