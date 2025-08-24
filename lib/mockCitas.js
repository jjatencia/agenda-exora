export const citasByDate = {
  '2025-08-24': [
    {
      id: 1,
      cliente: 'Juan Pérez',
      telefono: '600123456',
      servicio: 'Corte de pelo',
      variante: 'Clásico',
      sucursal: 'Centro',
      profesional: 'Ana Ruiz',
      fecha: '2025-08-24',
      hora: '09:00',
      descuentos: '10%'
    },
    {
      id: 2,
      cliente: 'María López',
      telefono: '600987654',
      servicio: 'Coloración',
      variante: 'Balayage',
      sucursal: 'Norte',
      profesional: 'Luis García',
      fecha: '2025-08-24',
      hora: '10:30',
      descuentos: '0%'
    },
    {
      id: 3,
      cliente: 'Carlos Díaz',
      telefono: '600555888',
      servicio: 'Manicura',
      variante: 'Gel',
      sucursal: 'Sur',
      profesional: 'Marta Pérez',
      fecha: '2025-08-24',
      hora: '12:00',
      descuentos: '15%'
    }
  ],
  '2025-08-25': [
    {
      id: 4,
      cliente: 'Lucía Gómez',
      telefono: '600111222',
      servicio: 'Pedicura',
      variante: 'Spa',
      sucursal: 'Centro',
      profesional: 'Ana Ruiz',
      fecha: '2025-08-25',
      hora: '11:00',
      descuentos: '5%'
    },
    {
      id: 5,
      cliente: 'Miguel Torres',
      telefono: '600333444',
      servicio: 'Corte de barba',
      variante: 'Premium',
      sucursal: 'Norte',
      profesional: 'Luis García',
      fecha: '2025-08-25',
      hora: '13:30',
      descuentos: '0%'
    }
  ],
  '2025-08-26': [
    {
      id: 6,
      cliente: 'Sofía Martínez',
      telefono: '600666777',
      servicio: 'Maquillaje',
      variante: 'Fiesta',
      sucursal: 'Sur',
      profesional: 'Marta Pérez',
      fecha: '2025-08-26',
      hora: '08:30',
      descuentos: '20%'
    },
    {
      id: 7,
      cliente: 'Diego Romero',
      telefono: '600888999',
      servicio: 'Masaje',
      variante: 'Relajante',
      sucursal: 'Centro',
      profesional: 'Ana Ruiz',
      fecha: '2025-08-26',
      hora: '10:00',
      descuentos: '0%'
    },
    {
      id: 8,
      cliente: 'Laura Sánchez',
      telefono: '600444555',
      servicio: 'Depilación',
      variante: 'Láser',
      sucursal: 'Norte',
      profesional: 'Luis García',
      fecha: '2025-08-26',
      hora: '12:30',
      descuentos: '10%'
    },
    {
      id: 9,
      cliente: 'Andrés Vidal',
      telefono: '600777888',
      servicio: 'Peinado',
      variante: 'Boda',
      sucursal: 'Sur',
      profesional: 'Marta Pérez',
      fecha: '2025-08-26',
      hora: '15:00',
      descuentos: '0%'
    },
    {
      id: 10,
      cliente: 'Paula Ruiz',
      telefono: '600222333',
      servicio: 'Tratamiento facial',
      variante: 'Anti-edad',
      sucursal: 'Centro',
      profesional: 'Ana Ruiz',
      fecha: '2025-08-26',
      hora: '16:30',
      descuentos: '25%'
    }
  ]
};

export function getCitasByDate(dateISO) {
  return citasByDate[dateISO] || [];
}
