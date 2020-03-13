import 'react-native';
import React from 'react';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import AuthScreen from '../src/Screen/Auth/index';

const mockStore = configureMockStore();

jest.mock('../src/redux/services/config', () => {
  return {
    BASE_API_URL: 'http://127.0.0.1/v1'
  }
});

test('renders correctly', () => {
  const store = mockStore({
    auth: {
      me: {
        photo: {
          url: 'https://www.easydrawingtips.com/wp-content/uploads/2019/10/spiky_male_hair_drawing.jpg',
        }
      }
    },
    posts: {
      meta: {
        loading: true
      },
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
        <AuthScreen />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
