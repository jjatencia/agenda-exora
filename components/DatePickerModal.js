import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';
import { colors, typography, radius, spacing } from '../src/theme/exora';

export default function DatePickerModal({ visible, initialDateISO, onClose, onSelect }) {
  const markedDates = {
    [initialDateISO]: { selected: true, selectedColor: colors.primary, selectedTextColor: '#ffffff' }
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Selecciona una fecha</Text>
        </View>
        <Calendar
          current={initialDateISO}
          onDayPress={(day) => {
            onSelect(day.dateString);
            onClose();
          }}
          markedDates={markedDates}
          theme={{
            todayTextColor: colors.primary,
            arrowColor: colors.primary,
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: { margin: 0, justifyContent: 'center' },
  container: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    marginHorizontal: spacing.md,
    overflow: 'hidden'
  },
  header: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    alignItems: 'center'
  },
  headerText: {
    ...typography.h2,
    color: '#ffffff'
  }
});
