import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
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
        {index > 0 && (
          <TouchableOpacity onPress={() => changeIndex(index - 1)}>
            <Text style={styles.back}>◀︎</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Citas de hoy</Text>
        <View style={{ width: 24 }} />
      </View>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.cardWrapper, animatedStyle]}>
          <SwipeCard cita={current} />
        </Animated.View>
      </GestureDetector>
      <View style={styles.footer}>
        <Text style={styles.pagination}>{index + 1}/{citas.length}</Text>
        <Text style={styles.hint}>Desliza para cambiar</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  back: {
    fontSize: 18,
    color: '#111827',
    paddingRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    color: '#111827',
    textAlign: 'center',
    flex: 1,
  },
  cardWrapper: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
  },
  pagination: {
    color: '#111827',
    marginBottom: 4,
  },
  hint: {
    color: '#6b7280',
    fontSize: 12,
  },
});
