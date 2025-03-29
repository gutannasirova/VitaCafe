import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Image, View, Text, StyleSheet } from "react-native";

// Импорт экранов
import HomeScreen from "./HomeScreen";
import HomeScreen from "./PasswordScreen";
// Импорт иконок
import homeIcon from "./assets/home.png";
import cartIcon from "./assets/cart.png";
import menuIcon from "./assets/menu-icon.png";
import userIcon from "./assets/User.png";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            let iconSource;

            if (route.name === "Home") {
              iconSource = homeIcon;
            } else if (route.name === "Menu") {
              iconSource = menuIcon;
            } else if (route.name === "Cart") {
              iconSource = cartIcon;
            } else if (route.name === "Profile") {
              iconSource = userIcon;
            }

            return (
              <View style={styles.iconContainer}>
                <Image
                  source={iconSource}
                  style={[
                    styles.icon,
                    { tintColor: focused ? "#76b82a" : "#B0B0B0" },
                  ]}
                />
                {focused && <Text style={styles.iconText}>{route.name}</Text>}
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Menu" component={MenuScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffff",
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    elevation: 10,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconText: {
    fontSize: 12,
    color: "#76b82a",
    marginTop: 4,
  },
});
