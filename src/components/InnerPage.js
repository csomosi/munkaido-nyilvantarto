import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HistoryPage from './HistoryPage';
import StatusPage from './StatusPage';

const Stack = createNativeStackNavigator();

const InnerPage = ({ userData, setUserData }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Munkaidő nyilvántartó">
          {navigatorProps => (
            <StatusPage {...navigatorProps} setUserData={setUserData} userData={userData} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Napló">
          {navigatorProps => <HistoryPage {...navigatorProps} userData={userData} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default InnerPage;
