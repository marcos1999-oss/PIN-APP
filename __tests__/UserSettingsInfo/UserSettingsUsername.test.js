/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import UserSettingsUsername from '../../src/Screen/UserSettingsInfo/UserSettingsUsername';

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
  const navigation = {
    getParam: (val) => {return ''},
    setParams: jest.fn(),
  };
  const tree = renderer.create(<UserSettingsUsername navigation={navigation} />).toJSON();
  expect(tree).toMatchSnapshot();
});
