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
import mockComponent from 'react-native/jest/mockComponent';

import User from '../../src/Screen/User';

const mockStore = configureMockStore();

jest.mock('react-native-cached-images', () => {
  return {
    CustomCachedImage: mockComponent('Image'),
    CachedImage: mockComponent('Image'),
    DocumentDir: () => {},
    ImageCache: {
      get: {
        clear: () => {}
      }
    }
  }
});

jest.mock('@react-native-community/push-notification-ios', () => {
  return {
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(),
    getApplicationIconBadgeNumber: jest.fn(),
    setApplicationIconBadgeNumber: jest.fn() 
  }
})

jest.mock('@hkpuits/react-native-region-monitor', () => {
  return {
    onRegionChange: jest.fn(),
    clearRegions: jest.fn(),
    addCircularRegion: jest.fn()
  }
})

jest.mock('react-native-geolocation-service', () => {
  return {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
  }
})

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
        <User />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
