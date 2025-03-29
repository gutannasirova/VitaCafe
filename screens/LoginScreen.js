import React, { useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Animated, StyleSheet } from "react-native";

export default function LoginScreen() {
  const spinValue = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 4000, // Вращение на 180 градусов за 5 секунд
          useNativeDriver: true,
        }),
        Animated.timing(spinValue, {
          toValue: 0,
          duration: 4000, // Возвращение обратно за 5 секунд
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  // Интерполяция для вращения (только 180 градусов вперед-назад)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-50deg"],
  });


  return (
    <ImageBackground source={require('./assets/Back2.png')} style={styles.background}>
      {/* Вращающийся листок салата */}
      <Animated.Image
        source={require('./assets/Bazelik.png')}
        style={[styles.Bazelik, { transform: [{ rotate: spin }] }]}
      />
      <Animated.Image
        source={require('./assets/Spinach2.png')}
        style={[styles.Spinach, { transform: [{ rotate: spin }] }]}
      />

      <View style={styles.container}>
        <Text style={styles.title}>VitaCafe</Text>
        <Text style={styles.subtitle}>Добро пожаловать</Text>
        
        <TextInput style={styles.input} placeholder="ФИО" placeholderTextColor="#666" />
        <TextInput style={styles.input} placeholder="Пароль" placeholderTextColor="#666" secureTextEntry />
        
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Забыли пароль?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Text style={styles.createAccount}>Создать аккаунт</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: 311 ,
    height: 180 ,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  Bazelik: {
    position: "absolute",
    top: 180,
    left: 280,
    width: 50,
    height: 50,
  },
  Spinach: {
    position: "absolute",
    top: 570,
    right: 280,
    width: 50,
    height: 50,
  },
  container: {
    padding: 20,
    alignItems: "center",
    width: "95%",
    marginTop: 570,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#E6F0DA",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#555",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#78B420",
    width: "100%",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  createAccount: {
    marginTop: 15,
    fontSize: 16,
    color: "#333",
  },
});
