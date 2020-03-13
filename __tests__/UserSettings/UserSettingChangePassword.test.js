/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import UserSettingChangePassword from '../../src/Screen/UserSettings/UserSettingChangePassword';

const mockStore = configureMockStore();

jest.mock('react-native-cached-images', () => {
  return {
    DocumentDir: () => {},
    ImageCache: {
      get: {
        clear: () => {},
      },
    },
  }
});

jest.useFakeTimers();

test('renders correctly', () => {
  const store = mockStore({
    auth: {
      me: {}
    },
    posts: {
      data: {},
    },
    offers: {
      data: {},
    },
    firms: {
      data: {},
    },
    features: {
      data: {},
    },
    holidays: {
      data: {},
    },
    schedules: {
      data: {},
    },
    pins: {
      near: {},
    }
  });
  const navigation = {
    getParam: jest.fn(),
    setParams: jest.fn(),
  }
  const tree = renderer.create(
    <Provider store={store}>
        <UserSettingChangePassword navigation={navigation} />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
