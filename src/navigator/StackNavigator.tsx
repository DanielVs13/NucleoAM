import { createStackNavigator } from "@react-navigation/stack";
import LoginScreent from "../screens/LoginScreent";
import RegisterScreent from "../screens/RegisterScreent";
import HomeScreen from "../screens/homeScreeens/HomeScreen";

import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import DetailProductScreen from "../screens/homeScreeens/DetailProductScreen";

interface Routes {
  name: string;
  screen: () => JSX.Element;
  headerShow?: boolean;
}

const routesNoAuth: Routes[] = [
  { name: "Login", screen: LoginScreent },
  { name: "Registro", screen: RegisterScreent },
];

const routesAuth: Routes[] = [
  { name: "Home", screen: HomeScreen },
  { name: "Detail", screen: DetailProductScreen, headerShow: true },
];

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator animating={true} size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {!isAuth
        ? routesNoAuth.map((item, index) => (
            <Stack.Screen
              key={index}
              name={item.name}
              options={{ headerShown: false }}
              component={item.screen}
            />
          ))
        : routesAuth.map((item, index) => (
            <Stack.Screen
              key={index}
              name={item.name}
              options={{ headerShown: item.headerShow ?? false }}
              component={item.screen}
            />
          ))}
    </Stack.Navigator>
  );
};
