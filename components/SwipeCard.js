import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Tarjeta que puede deslizarse hacia la izquierda para pasar a la siguiente cita
export default function SwipeCard({ cita, onSwipeLeft }) {
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      if (translateX.value < -100) {
        translateX.value = withSpring(-width, {}, () => {
          runOnJS(onSwipeLeft)();
          translateX.value = 0;
        });
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.card, style]}>
        <Text style={styles.name}>{cita.cliente}</Text>
        <Text style={styles.detail}>{cita.hora} · {cita.duracion}min</Text>
        <Text style={styles.detail}>{cita.servicio}</Text>
        <Text style={styles.detail}>Con {cita.profesional}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width - 32,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 24,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 8,
  },
  detail: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 4,
  },
});
