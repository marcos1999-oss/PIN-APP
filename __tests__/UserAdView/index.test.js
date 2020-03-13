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
import mockComponent from 'react-native/jest/mockComponent';

import UserAdView from '../../src/Screen/UserAdView';

const mockStore = configureMockStore();

jest.mock('react-native-cached-images', () => {
  return {
    CustomCachedImage: mockComponent('Image'),
    CachedImage: mockComponent('Image'),
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
      viewing: {
        firm: {
          lat: 64.145,
          lng: -1.145,
          photo: {
            url: 'https://www.easydrawingtips.com/wp-content/uploads/2019/10/spiky_male_hair_drawing.jpg',
          },
          features: [
            {
              id: 1000000000001,
              icon: 'add',
            },
            {
              id: 1000000000002,
              icon: 'add',
            }
          ]
        },
        photo: {
          url: 'https://www.easydrawingtips.com/wp-content/uploads/2019/10/spiky_male_hair_drawing.jpg',
        },
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
  const navigation = {
    state: {
      params: {},
    }
  };
  const tree = renderer.create(
    <Provider store={store}>
        <UserAdView navigation={navigation} />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
