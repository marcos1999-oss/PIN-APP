/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import AdAboutUs from '../../../src/Screen/UserAdView/AdAboutUs';

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
    firm: {
      name: 'test',
      features: [
        {
          id: 1,
          icon: 'add',
        }
      ],
    }
  };
  const tree = renderer.create(<AdAboutUs post={post} />).toJSON();
  expect(tree).toMatchSnapshot();
});
