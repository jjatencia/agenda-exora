import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, SafeAreaView, StyleSheet } from 'react-native';

export default function Login() {
  const [fontsLoaded] = useFonts({ Poppins_700Bold });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#555BF6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: '#FFFFFF',
      fontSize: 24,
      lineHeight: 24,
      textAlign: 'center',
      letterSpacing: 0,
      fontWeight: '700',
      ...(fontsLoaded ? { fontFamily: 'Poppins_700Bold' } : null),
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../assets/images/logo-mark.png')}
          style={{ width: 128, height: 128, resizeMode: 'contain', marginBottom: 16 }}
        />
        <Text style={styles.title}>Inicia sesión</Text>
      </View>
    </SafeAreaView>
  );
}
