import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { signOutUser } from '../auth';

const SettingsPage = ({ navigation: { navigate }, userData, setUserData }) => {
  const handleLogout = async () => {
    await signOutUser();
    console.log('signout button pushed');
    setUserData(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.shadow]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Kijelentkezés</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 50,
    alignSelf: 'stretch',
    textAlign: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '7%',
    borderRadius: 20,
    color: 'blue',
    backgroundColor: '#0091ff',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default SettingsPage;
