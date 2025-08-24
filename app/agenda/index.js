import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import SwipeCard from '../../components/SwipeCard';
import DatePickerModal from '../../components/DatePickerModal';
import EmptyState from '../../components/EmptyState';
import { getCitasByDate } from '../../lib/mockCitas';
import { colors, spacing, typography, radius } from '../../src/theme/exora';

dayjs.locale('es');

// Pantalla de agenda que permite navegar por las citas con gestos y selección de fecha
export default function Agenda() {
  const [selectedDateISO, setSelectedDateISO] = useState(dayjs().format('YYYY-MM-DD'));
  const [citas, setCitas] = useState(getCitasByDate(selectedDateISO));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const width = Dimensions.get('window').width;
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    setCitas(getCitasByDate(selectedDateISO));
    setCurrentIndex(0);
  }, [selectedDateISO]);

  const changeIndex = (next) => {
    setCurrentIndex(next);
    translateX.value = 0;
    opacity.value = 1;
  };

  const pan = Gesture.Pan().onEnd((e) => {
    if (e.translationX < -50 && currentIndex < citas.length - 1) {
      translateX.value = withTiming(-width, { duration: 200 }, (finished) => {
        if (finished) runOnJS(changeIndex)(currentIndex + 1);
      });
      opacity.value = withTiming(0, { duration: 200 });
    } else if (e.translationX > 50 && currentIndex > 0) {
      translateX.value = withTiming(width, { duration: 200 }, (finished) => {
        if (finished) runOnJS(changeIndex)(currentIndex - 1);
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

  const formattedDate = dayjs(selectedDateISO).format('ddd, D MMM YYYY');
  const current = citas[currentIndex];

  const goPrev = () =>
    setSelectedDateISO(dayjs(selectedDateISO).subtract(1, 'day').format('YYYY-MM-DD'));
  const goNext = () =>
    setSelectedDateISO(dayjs(selectedDateISO).add(1, 'day').format('YYYY-MM-DD'));
  const goToday = () => setSelectedDateISO(dayjs().format('YYYY-MM-DD'));
  const onSelectDate = (dateISO) => setSelectedDateISO(dateISO);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={goPrev}>
          <Text style={styles.nav}>◀︎</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.chip}>
          <Text style={styles.chipText}>{formattedDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goNext}>
          <Text style={styles.nav}>▶︎</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={goToday} style={styles.todayButton}>
        <Text style={styles.todayText}>Hoy</Text>
      </TouchableOpacity>

      <GestureDetector gesture={pan} enabled={citas.length > 0}>
        <Animated.View style={[styles.cardWrapper, animatedStyle]}>
          {citas.length > 0 ? <SwipeCard cita={current} /> : <EmptyState />}
        </Animated.View>
      </GestureDetector>

      {citas.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>{`${currentIndex + 1}/${citas.length} — Desliza izquierda/derecha`}</Text>
        </View>
      )}

      <DatePickerModal
        visible={modalVisible}
        initialDateISO={selectedDateISO}
        onClose={() => setModalVisible(false)}
        onSelect={onSelectDate}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  nav: {
    ...typography.h2,
    color: colors.text,
  },
  chip: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: {
    ...typography.label,
  },
  todayButton: {
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  todayText: {
    ...typography.label,
    color: colors.primary,
  },
  cardWrapper: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  footerText: {
    ...typography.meta,
  },
});
