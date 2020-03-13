import React from "react";
import { BackHandler, Alert } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import allReducers from './redux/reducers';
import creatSagaMiddleware from 'redux-saga';
import rootSaga from './redux/sagas/rootSaga';
import { Root } from "native-base";
import { DismissKeyboard } from "./Components/Common";
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

/*Screen*/
import Splash from "./Screen/Splash";
import Navigation from "./Navigation";
if (__DEV__) {
  import('./reactotronConfig').then(() => console.log('Reactotron Configured'))
}

const sagaMiddleware = creatSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);


class App extends React.Component {
  state = { isReady: false };

  constructor(props) {
    super(props);

    BackHandler.addEventListener("hardwareBackPress", async () => {
      await Alert.alert(
        "Exit Confirmation",
        "Sure you want to exit  ?",
        [
          {
            text: "OK",
            onPress: () => {
              BackHandler.exitApp();
            },
          },
          { text: "Cancel", style: "cancel" },
        ],
        { cancelable: true }
      );
    });
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (!enabled) {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async componentDidMount() {
    this.checkPermission();
    this.setState({ isReady: true });
  }

  //Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  render() {
    if (!this.state.isReady) {
      return <Splash />;
    }

    return (
      <Provider store={store}>
        <DismissKeyboard>
          <Root>
            <Navigation />
          </Root>
        </DismissKeyboard>
      </Provider>
    );
  }
}

module.exports = { App, store };
