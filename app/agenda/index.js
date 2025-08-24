import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import SwipeCard from '../../components/SwipeCard';
import { citas } from '../../lib/mockCitas';

// Pantalla de agenda que permite navegar por las citas con gestos
export default function Agenda() {
  const [index, setIndex] = useState(0);
  const width = Dimensions.get('window').width;
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  // Cambia de cita y reinicia los valores animados
  const changeIndex = (next) => {
    setIndex(next);
    translateX.value = 0;
    opacity.value = 1;
  };

  // Maneja los gestos de swipe izquierda/derecha
  const pan = Gesture.Pan().onEnd((e) => {
    if (e.translationX < -50 && index < citas.length - 1) {
      translateX.value = withTiming(-width, { duration: 200 }, (finished) => {
        if (finished) runOnJS(changeIndex)(index + 1);
      });
      opacity.value = withTiming(0, { duration: 200 });
    } else if (e.translationX > 50 && index > 0) {
      translateX.value = withTiming(width, { duration: 200 }, (finished) => {
        if (finished) runOnJS(changeIndex)(index - 1);
      });
      opacity.value = withTiming(0, { duration: 200 });
    } else {
      translateX.value = withTiming(0);
    }
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  const current = citas[index];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Citas de hoy</Text>
      </View>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.cardWrapper, animatedStyle]}>
          <SwipeCard cita={current} />
        </Animated.View>
      </GestureDetector>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {`${index + 1}/${citas.length} — Desliza izquierda/derecha`}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
  },
  cardWrapper: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#64748b',
    fontSize: 14,
  },
});
