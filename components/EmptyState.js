import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../src/theme/exora';

export default function EmptyState() {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Sin citas en esta fecha</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  text: {
    ...typography.label,
    color: colors.label,
  },
});
