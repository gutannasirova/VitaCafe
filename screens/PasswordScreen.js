import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

const PasswordScreen = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSave = () => {
    // Логика для сохранения пароля
    if (newPassword === repeatPassword) {
      console.log("Пароль успешно сохранен");
    } else {
      console.log("Пароли не совпадают");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Заголовок "VitaCafe" */}
        <Text style={styles.header}>VitaCafe</Text>

        {/* Заголовок "Придумайте новый пароль" */}
        <Text style={styles.title}>Придумайте новый пароль</Text>

        {/* Поле для нового пароля */}
        <TextInput
          style={styles.input}
          placeholder="Новый пароль"
          placeholderTextColor="#999"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        {/* Поле для повторения пароля */}
        <TextInput
          style={styles.input}
          placeholder="Повторите пароль"
          placeholderTextColor="#999"
          secureTextEntry
          value={repeatPassword}
          onChangeText={setRepeatPassword}
        />

        {/* Кнопка "Сохранить" */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Сохранить</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  content: {
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "serif",
    color: "#333",
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#76b82a",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default PasswordScreen;
