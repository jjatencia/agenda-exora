import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

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
          <Text style={styles.noShowText}>No se ha presentado a la cita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 20,
  },
  content: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    width: 120,
    color: '#475569',
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    flex: 1,
    color: '#111827',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'right',
  },
  link: {
    textDecorationLine: 'underline',
  },
  footer: {
    paddingTop: 20,
  },
  noShow: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  noShowText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
