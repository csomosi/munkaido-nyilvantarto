import { async } from '@firebase/util';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserData = async userData => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem('@storage_UserData', jsonValue);
    console.log('User data stored in local storage');
  } catch (e) {
    console.log('Error while storing user data in local storage');
  }
};

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_UserData');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('error while getting user data from local storage');
  }
};

export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('@storage_UserData');
    console.log('User data removed from local storage');
  } catch (e) {
    console.log('Error while removing user data ftom local storage');
  }
};

export const updateStateOnLocalStorage = async (email, newState) => {
  try {
    await AsyncStorage.getItem('@storage_UserData').then(value => {
      const userData = JSON.parse(value);
      if (userData.email === email) {
        userData.currentState = newState;
        storeUserData(userData);
      }
    });
  } catch (e) {
    console.log('Error while updating state on local storage');
  }
};
