import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { colors, radius, spacing, typography } from '../src/theme/exora';

// Tarjeta que ocupa toda la pantalla con scroll interno
export default function SwipeCard({ cita }) {
  const handleCall = () => {
    Linking.openURL('tel:' + cita.telefono);
  };

  const Row = ({ label, value, onPress }) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, onPress && styles.link]} onPress={onPress}>
        {value}
      </Text>
    </View>
  );

  return (
    <View style={styles.card}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Reserva</Text>
        <Row label="Cliente" value={cita.cliente} />
        <Row label="Teléfono" value={cita.telefono} onPress={handleCall} />
        <Row label="Servicio" value={cita.servicio} />
        <Row label="Variante" value={cita.variante} />
        <Row label="Sucursal" value={cita.sucursal} />
        <Row label="Profesional" value={cita.profesional} />
        <Row label="Fecha" value={cita.fecha} />
        <Row label="Hora" value={cita.hora} />
        <Row label="Descuentos" value={cita.descuentos} />
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.noShow}
          onPress={() => console.log('NO_SHOW', cita.id)}
        >
          <Text style={styles.noShowText}>NO SE HA PRESENTADO A LA CITA</Text>
        </TouchableOpacity>
      </View>
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
    padding: spacing.lg,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  label: {
    width: 120,
    ...typography.label,
  },
  value: {
    flex: 1,
    ...typography.value,
    textAlign: 'right',
  },
  link: {
    textDecorationLine: 'underline',
    color: colors.primary,
  },
  footer: {
    paddingTop: spacing.lg,
  },
  noShow: {
    backgroundColor: colors.secondary,
    borderRadius: radius.lg,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  noShowText: {
    ...typography.label,
    color: '#ffffff',
    textTransform: 'uppercase',
  },
});
