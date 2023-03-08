import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Image, Dimensions } from 'react-native';

import { addHistory, updateUserState } from '../database';

const heightY = Dimensions.get('window').height;

const StatusPage = ({ navigation: { navigate }, userData, setUserData }) => {
  const [link, setLink] = useState('init');
  if (link === 'init') {
    generateImage();
  } else {
    null;
  }

  const toggleSwitch = () => {
    let newState = '';
    generateImage();
    if (userData.currentState === 'in') {
      newState = 'out';
    } else {
      newState = 'in';
    }
    setUserData({ ...userData, currentState: newState });
    updateUserState(userData.email, newState);
    addHistory(userData.email, newState);
  };

  async function generateImage() {
    try {
      const response = await fetch('https://inspirobot.me/api?generate=true');
      const link = await response.text();
      setLink(link);
      console.log('new inspiration image is loaded');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.settingsSection}>
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigate('Beállítások')}>
          <Text style={styles.settingsButtonText}>Beállítások</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.appTitle}>Szia {userData.name}!</Text>
      <Text style={styles.statusText}>
        Jelenlegi státuszod: {userData.currentState === 'in' ? 'bejött' : 'távozott'}
      </Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={userData.currentState === 'in' ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={userData.currentState === 'in'}
      />
      <TouchableOpacity onPress={() => navigate('Napló')} style={[styles.button, styles.shadow]}>
        <Text style={styles.buttonText}>Napló megtekintése</Text>
      </TouchableOpacity>

      <View>
        <Image style={styles.image} source={{ uri: link }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    // https://stackoverflow.com/a/59183680/9004180
    // fixing the scrolling of the FlatList
    // flex: 1 just means "take up the entire space" (whatever "entire" that may be).
    flex: 1,
  },
  appTitle: {
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 30,
  },
  settingsSection: {
    alignSelf: 'stretch',
  },
  settingsButton: {
    alignSelf: 'stretch',
  },
  settingsButtonText: {
    marginRight: 'auto',
    fontStyle: 'italic',
    color: 'blue',
  },
  statusText: {
    fontSize: 18,
    margin: 15,
  },
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
  image: {
    width: heightY * 0.35,
    height: heightY * 0.35,
    resizeMode: 'contain',
  },
});

export default StatusPage;
