/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import NoDeals from '../../src/Screen/User/NoDeals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

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
  const tree = renderer.create(<NoDeals />).toJSON();
  expect(tree).toMatchSnapshot();
});
