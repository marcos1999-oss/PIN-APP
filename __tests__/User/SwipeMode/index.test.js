/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import configureMockStore from "redux-mock-store";
import SwipeMode from '../../../src/Screen/User/SwipeMode';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

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

const store = mockStore({
  posts: {}
});

test('renders correctly', () => {
  const postsMeta = {
    loading: true,
  };
  const tree = renderer.create(<SwipeMode postsMeta={postsMeta} store={store} />).toJSON();
  expect(tree).toMatchSnapshot();
});
