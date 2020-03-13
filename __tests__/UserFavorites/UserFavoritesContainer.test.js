/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import configureMockStore from "redux-mock-store";
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import UserFavoritesContainer from '../../src/Screen/UserFavorites/UserFavoritesContainer';

const mockStore = configureMockStore();

const store = mockStore({
  posts: {}
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
  const tree = renderer.create(<UserFavoritesContainer store={store} />).toJSON();
  expect(tree).toMatchSnapshot();
});
