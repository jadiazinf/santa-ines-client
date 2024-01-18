export function dataToPie(appointments) {
  let data = [
    { id: 0, value: 0, label: 'Activa' },
    { id: 1, value: 0, label: 'Eliminada' },
    { id: 2, value: 0, label: 'Actualizada' },
  ];
  appointments.forEach(appointment => {
    switch(appointment.status) {
      case 'Activa':
        data[0].value += 1;
        break;
      case 'Deleted':
        data[1].value += 1;
        break;
      case 'Actualizada':
        data[2].value += 1;
        break;
      default:
        break;
    }
  });
  return data;
}