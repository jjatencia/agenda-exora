import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwipeCard from '../../components/SwipeCard';
import citas from '../../lib/mockCitas';

// Pantalla de agenda que muestra las citas mediante tarjetas swippeables
export default function Agenda() {
  const [index, setIndex] = useState(0);

  // Avanza a la siguiente cita al hacer swipe izquierdo
  const handleSwipeLeft = () => {
    setIndex((prev) => prev + 1);
  };

  const current = citas[index];

  return (
    <SafeAreaView style={styles.container}>
      {current ? (
        <SwipeCard cita={current} onSwipeLeft={handleSwipeLeft} />
      ) : (
        <View>
          <Text style={styles.empty}>No hay más citas</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    color: '#fff',
    fontSize: 18,
  },
});
