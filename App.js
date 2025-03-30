import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import CartScreen from "./screens/CartScreen";

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
    <Tab.Screen name="CartScreen" component={CartScreen} />
  </Tab.Navigator>
);