import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const passwordRef = useRef(null);

  const emailValid = /.+@.+\..+/.test(email);
  const passwordValid = password.length >= 4;
  const canSubmit = emailValid && passwordValid;

  const onSubmit = () => {
    if (!canSubmit) return;
    router.push('/agenda');
  };

  const showEmailError = email.length > 0 && !emailValid;
  const showPasswordError = password.length > 0 && !passwordValid;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#555BF6',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
      }}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, width: '100%' }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require('../assets/images/logo-mark.png')}
            style={{
              width: 128,
              height: 128,
              resizeMode: 'contain',
              marginBottom: 16,
            }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 24,
              lineHeight: 24,
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            Inicia sesión
          </Text>

          <View
            style={{
              width: '100%',
              maxWidth: 420,
            }}
          >
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 20,
                padding: 18,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <TextInput
                placeholder="tu@correo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                style={{
                  height: 52,
                  borderRadius: 28,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  paddingHorizontal: 18,
                  color: '#111827',
                  marginBottom: showEmailError ? 4 : 16,
                }}
              />
              {showEmailError && (
                <Text style={{ color: '#EF4444', fontSize: 12, marginBottom: 12 }}>
                  Email inválido
                </Text>
              )}
              <TextInput
                ref={passwordRef}
                placeholder="••••••••"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                returnKeyType="done"
                onSubmitEditing={onSubmit}
                style={{
                  height: 52,
                  borderRadius: 28,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  paddingHorizontal: 18,
                  color: '#111827',
                  marginBottom: showPasswordError ? 4 : 0,
                }}
              />
              {showPasswordError && (
                <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>
                  Mínimo 4 caracteres
                </Text>
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
                marginBottom: 16,
              }}
            >
              <Pressable
                onPress={() => setRemember(!remember)}
                hitSlop={10}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: remember ? '#fff' : '#E5E7EB',
                  backgroundColor: remember ? '#fff' : 'transparent',
                  marginRight: 8,
                }}
              />
              <Text
                style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}
              >
                Recordarme
              </Text>
            </View>

            <Pressable
              onPress={onSubmit}
              disabled={!canSubmit}
              style={{
                height: 52,
                borderRadius: 28,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: canSubmit ? 1 : 0.5,
              }}
            >
              <Text
                style={{
                  color: '#555BF6',
                  fontSize: 18,
                  fontWeight: '600',
                }}
              >
                Entrar
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

