import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MenuScreen from "./screens/MenuScreen";

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
    <Tab.Screen name="MenuScreen" component={MenuScreen} />
  </Tab.Navigator>
);