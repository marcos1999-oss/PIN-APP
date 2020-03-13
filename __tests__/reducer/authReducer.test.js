import Immutable from 'seamless-immutable'

import reducer from '../../src/redux/reducers/authReducers';

const initialState = Immutable({
  me: {},
  home_connected_users: 0,
  pins_connected_users: 0,
  latitude: null,
  longitude: null,
  access_token: null,
  client: null,
  uid: null,
});

describe('authReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      initialState,
    );
  });

  it('should set the axios LOCATION_SUCCESS', () => {
    const value =  78.2566485665;
    expect(reducer(initialState, {
      type: 'LOCATION_SUCCESS',
      latitude: value,
      longitude: value,
    })).toEqual({
        ...initialState,
        latitude: value,
        longitude: value,
    });
  });

  // it('should set the axios CLEAR_TOKEN', () => {
  //   const token = faker.random.uuid();
  //   const token1 = faker.random.uuid();
  //   const token2 = faker.random.uuid();
  //   const state = Immutable.fromJS(
  //     { tokens: [token, token1, token2], submitting: false },
  //   );
  //   expect(reducer(state, {
  //     type: CLEAR_TOKEN,
  //   })).toEqual(
  //     initialState,
  //   );
  // });
});
