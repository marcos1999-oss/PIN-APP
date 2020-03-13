/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import mockComponent from 'react-native/jest/mockComponent';

import { App } from '../src/App';

jest.mock('../src/redux/services/config', () => {
  return {
    BASE_API_URL: 'http://127.0.0.1/v1'
  }
});

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

jest.mock('@react-native-community/geolocation', () => {
  return {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
  }
})

test('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
