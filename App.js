import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import PasswordScreen from "./screens/PasswordScreen";

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Password" component={PasswordScreen} />
  </Tab.Navigator>
);
