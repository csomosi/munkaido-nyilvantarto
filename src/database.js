import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  limit,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

import config from './db_config';
import { async } from '@firebase/util';

const app = initializeApp(config);
const db = getFirestore(app);

/**
 * crestes a new document in firebase database, in the collection named 'user'
 *
 * @param {object} user
 */
export async function createUserData(user) {
  try {
    await setDoc(doc(db, 'users', user.email), user);
  } catch (error) {
    window.alert('Error during usercreation: ', error.message);
  }
}

export async function getUserDataByEmail(email) {
  const docRef = doc(db, 'users', email);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  window.alert('No such user data!');
  return null;
}

export async function updateUserState(email, newState) {
  try {
    console.log('state scahnged to: ', newState);
    await updateDoc(doc(db, 'users', email), {
      currentState: newState,
    });
  } catch (_e) {
    window.alert('Error during updating user state on remote db');
  }
}

export async function addHistory(email, newState) {
  try {
    await addDoc(collection(db, 'users', email, 'history'), {
      date: serverTimestamp(),
      state: newState,
    });
    console.log(`state of ${email} was saved in db with: ${newState}`);
  } catch (_e) {
    window.alert('Error saving user history on remote db');
  }
}

export async function getHistory(email) {
  try {
    const q = query(collection(db, 'users', email, 'history'), orderBy('date', 'desc'), limit(40));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach(doc => {
      const data = {
        ...doc.data(),
        id: doc.id,
      };
      result.push(data);
    });
    return result;
  } catch (_e) {
    window.alert('Error getting user history from remote db');
  }
}

export async function deleteHistoryById(email, id) {
  try {
    await deleteDoc(doc(db, 'users', email, 'history', id));
  } catch (_e) {
    window.alert('Error deleting user history from remote db');
  }
}
