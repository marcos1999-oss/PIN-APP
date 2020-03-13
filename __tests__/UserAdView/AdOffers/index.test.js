/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import AdOffers from '../../../src/Screen/UserAdView/AdOffers';

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
  const post = {
    kind: {},
  };
  const tree = renderer.create(<AdOffers post={post} />).toJSON();
  expect(tree).toMatchSnapshot();
});
