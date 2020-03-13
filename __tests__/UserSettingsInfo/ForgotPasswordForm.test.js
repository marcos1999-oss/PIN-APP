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

import ForgotPasswordForm from '../../src/Screen/UserSettingsInfo/ForgotPasswordForm';

const mockStore = configureMockStore();

jest.mock('../../src/redux/services/config', () => {
  return {
    BASE_API_URL: 'http://127.0.0.1/v1'
  }
});

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
  const tree = renderer.create(
    <Provider store={store}>
      <ForgotPasswordForm />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
