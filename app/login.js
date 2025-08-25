import React, { useState } from 'react';
import { SafeAreaView, Image, Text, TextInput, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const emailValid = /.+@.+\..+/.test(email);
  const passwordValid = password.length >= 4;
  const canSubmit = emailValid && passwordValid;

  const onSubmit = () => {
    if (canSubmit) {
      router.push('/agenda');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#555BF6',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <Image
        source={require('../assets/images/logo-mark.png')}
        style={{ width: 128, height: 128, marginBottom: 24 }}
      />
      <Text
        style={{
          color: '#fff',
          fontSize: 24,
          fontWeight: '700',
          marginBottom: 20,
        }}
      >
        Inicia sesión
      </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          width: '100%',
          maxWidth: 320,
          backgroundColor: '#fff',
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 12,
        }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Contraseña"
        secureTextEntry
        style={{
          width: '100%',
          maxWidth: 320,
          backgroundColor: '#fff',
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 16,
        }}
      />
      <Pressable
        onPress={() => setRemember(!remember)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          marginBottom: 16,
          maxWidth: 320,
        }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: '#fff',
            backgroundColor: remember ? '#fff' : 'transparent',
            marginRight: 8,
          }}
        />
        <Text style={{ color: '#fff' }}>Recordarme</Text>
      </Pressable>
      <Pressable
        onPress={onSubmit}
        disabled={!canSubmit}
        style={{
          width: '100%',
          maxWidth: 320,
          backgroundColor: '#fff',
          borderRadius: 8,
          paddingVertical: 12,
          alignItems: 'center',
          opacity: canSubmit ? 1 : 0.5,
        }}
      >
        <Text
          style={{
            color: '#555BF6',
            fontSize: 16,
            fontWeight: '600',
          }}
        >
          Entrar
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
