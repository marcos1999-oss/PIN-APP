import AsyncStorage from '@react-native-community/async-storage';
import { some, isUndefined } from 'lodash'

const USER_CREDENTIALS = 'USER_CREDENTIALS';

export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@${key}:key`, `${value}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}:key`);
    if (value !== null) {
      return value;
    }
    return '';
  } catch (error) {
    return '';
  }
};

export const saveCredentials = async (type, access_token, client, uid) => {

  try {
    await AsyncStorage.setItem(`@${USER_CREDENTIALS}:key`, `${type}:${access_token}:${client}:${uid}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const clearCredentials = async () => {

  try {
    await AsyncStorage.removeItem(`@${USER_CREDENTIALS}:key`);
    return true;
  } catch (error) {
    return false;
  }
};

const isValidCredentials = (type, access_token, client, uid) => {
  return !some([type, access_token, client, uid], isUndefined);
};

export const loadCredentials = async () => {

  let credentials = {};

  try {
    const value = await AsyncStorage.getItem(`@${USER_CREDENTIALS}:key`);
    if (value !== null) {
      const [type, access_token, client, uid] = value.split(':');

      if (isValidCredentials(type, access_token, client, uid)) {
        credentials = {
          type: type,
          access_token: access_token,
          client: client,
          uid: uid,
        }
      }
    }
  } catch (error) { }

  return credentials;
};
