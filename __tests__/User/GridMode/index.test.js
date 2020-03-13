/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import configureMockStore from "redux-mock-store";
import mockComponent from 'react-native/jest/mockComponent';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import GridMode from '../../../src/Screen/User/GridMode';

const mockStore = configureMockStore();

const store = mockStore({
  posts: {}
});

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

test('renders correctly', () => {
  const posts = [{
    id: '01',
    title: 'demo test',
    firm: {
      lat: 60.155,
      lng: -1.145,
    },
    photo: {
      url: 'https://www.easydrawingtips.com/wp-content/uploads/2019/10/spiky_male_hair_drawing.jpg',
    },
    viewsCount: 5,
    likesCount: 5,
  }]
  const postsMeta = {
    loading: true,
  };
  const tree = renderer.create(<GridMode posts={posts} postsMeta={postsMeta} store={store} />).toJSON();
  expect(tree).toMatchSnapshot();
});
