/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {Text} from 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import {FormContainer} from '../../src/Screen/UserSettingsInfo/Common';

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
  const tree = renderer.create(<FormContainer><Text>Test</Text></FormContainer>).toJSON();
  expect(tree).toMatchSnapshot();
});
