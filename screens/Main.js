import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  return (
    <ImageBackground source={require('./assets/back.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>{`Твое здоровье\nв каждой\nдоставке!`}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>Регистрация</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 311,
    height: 650,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#A5C882',
    paddingVertical: 10,
    paddingHorizontal: 110,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  registerText: {
    fontSize: 16,
    color: '#000',
    textDecorationLine: 'underline',
  },
});

export default App;