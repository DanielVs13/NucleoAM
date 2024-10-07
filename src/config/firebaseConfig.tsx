import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDupMg8poUklX2tDEBUXhkc2WvasvKsQxE",
  authDomain: "nucleo-am.firebaseapp.com",
  databaseURL: "https://nucleo-am-default-rtdb.firebaseio.com",
  projectId: "nucleo-am",
  storageBucket: "nucleo-am.appspot.com",
  messagingSenderId: "442988068923",
  appId: "1:442988068923:web:2d6343c2ddd63c00725c1e",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
export const dbRealTime = getDatabase(firebaseApp);
