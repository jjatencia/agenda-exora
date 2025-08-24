import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

// Pantalla de login rediseñada sin recursos binarios
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const emailRegex = /^.+@.+\..+$/;
  const isValid = emailRegex.test(email) && password.length >= 4;

  const handleSubmit = () => {
    if (!isValid) return;
    router.push('/agenda'); // TODO: conectar con API real
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["#555BF6", "#6A67F7"]}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.brandMark}>
          <View style={styles.quarterCircle} />
          <View style={styles.coralDot} />
        </View>
        <Text style={styles.title}>Inicia sesión</Text>
      </LinearGradient>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(17,24,39,0.35)"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="rgba(17,24,39,0.35)"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Pressable
          onPress={() => setRemember(!remember)}
          style={styles.rememberRow}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: remember }}
          hitSlop={8}
        >
          <View style={[styles.checkbox, remember && styles.checkboxChecked]} />
          <Text style={styles.rememberText}>Recordarme</Text>
        </Pressable>
        <Pressable
          onPress={handleSubmit}
          disabled={!isValid}
          style={[styles.button, !isValid && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  header: {
    height: '45%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 32,
  },
  brandMark: {
    position: 'relative',
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  quarterCircle: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 60,
    transform: [{ rotate: '270deg' }],
  },
  coralDot: {
    position: 'absolute',
    width: 14,
    height: 14,
    backgroundColor: '#FD778B',
    borderRadius: 7,
    top: -7,
    right: -7,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 24,
    marginTop: -24,
  },
  input: {
    backgroundColor: '#FFFFFF',
    height: 56,
    paddingHorizontal: 18,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    fontSize: 16,
    color: '#111827',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 11,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#555BF6',
  },
  rememberText: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '600',
  },
  button: {
    height: 54,
    borderRadius: 28,
    backgroundColor: '#555BF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

