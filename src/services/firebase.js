import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

export const db = firestore();
export const authInstance = auth();
export const storageInstance = storage();
