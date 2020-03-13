/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import ForgotPassword from '../../src/Screen/UserSettingsInfo/ForgotPassword';

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
  }
  const tree = renderer.create(
    <Provider store={store}>
      <ForgotPassword navigation={navigation} />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
