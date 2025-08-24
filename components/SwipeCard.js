import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

// Tarjeta que ocupa toda la pantalla con scroll interno y acciones inferiores
export default function SwipeCard({ cita }) {
  const handleCall = () => {
    Linking.openURL('tel:' + cita.telefono);
  };

  const Row = ({ icon, label, value, onPress }) => (
    <View style={styles.row}>
      <Text style={styles.icon}>{icon}</Text>
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
        <Row icon="👤" label="Cliente" value={cita.cliente} />
        <Row icon="📞" label="Teléfono" value={cita.telefono} onPress={handleCall} />
        <Row icon="💼" label="Servicio" value={cita.servicio} />
        <Row icon="✨" label="Variante" value={cita.variante} />
        <Row icon="📍" label="Sucursal" value={cita.sucursal} />
        <Row icon="🧑‍💼" label="Profesional" value={cita.profesional} />
        <Row icon="📅" label="Fecha" value={cita.fecha} />
        <Row icon="⏰" label="Hora" value={cita.hora} />
        <Row icon="🏷️" label="Descuentos" value={cita.descuentos} />
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.bar}>
          <TouchableOpacity style={styles.barButton}>
            <Text style={styles.barIcon}>€</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.barButton}>
            <Text style={styles.barIcon}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.barButton}>
            <Text style={styles.barIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.noShow}>
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    color: '#111111',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
    fontSize: 16,
  },
  label: {
    width: 100,
    color: '#6b7280',
    fontSize: 14,
  },
  value: {
    flex: 1,
    color: '#111827',
    fontSize: 14,
  },
  link: {
    textDecorationLine: 'underline',
  },
  footer: {
    paddingTop: 10,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  barButton: {
    padding: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  barIcon: {
    fontSize: 18,
    color: '#111827',
  },
  noShow: {
    backgroundColor: '#e5e7eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  noShowText: {
    color: '#111827',
    fontWeight: 'bold',
  },
});
