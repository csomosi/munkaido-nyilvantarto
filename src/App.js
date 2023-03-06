import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { loginStatus } from './auth';
import LoginPage from './components/LogInPage';
import InnerPage from './components/InnerPage';
import { getUserDataByEmail } from './database';

const App = props => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    const storedUser = await loginStatus();
    if (storedUser) {
      console.log('restored user from async storage: ', storedUser.email);
      const userData = await getUserDataFromFirebase(storedUser.email);
      if (!userData) return;
      console.log(`˙${setUserData.name} is loaded from the remote database`);
      setUserData(userData);
    }
  };

  useEffect(() => {
    getUserData()
      .then(() => setLoading(false))
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (userData === null) {
    return loading ? null : <LoginPage setUserData={setUserData} />;
  }
  return loading ? null : <InnerPage setUserData={setUserData} userData={userData} />;
};

export default App;
