export const especialidadesOptions = [
  { value: 'Adolescentología', label: 'Adolescentología' },
  { value: 'Cardiología', label: 'Cardiología' },
  { value: 'Cirugía General', label: 'Cirugía General' },
  { value: 'Dermatología', label: 'Dermatología' },
  { value: 'Endocrinología', label: 'Endocrinología' },
  { value: 'Endodoncia', label: 'Endodoncia' },
  { value: 'Fisiatría', label: 'Fisiatría' },
  { value: 'Gastroenterología', label: 'Gastroenterología' },
  { value: 'Geriatría', label: 'Geriatría' },
  { value: 'Ginecología', label: 'Ginecología' },
  { value: 'Obstetricia', label: 'Obstetricia' },
  { value: 'Hepatología', label: 'Hepatología' },
  { value: 'Inmunología', label: 'Inmunología' },
  { value: 'Alergología', label: 'Alergología' },
  { value: 'Mastología', label: 'Mastología' },
  { value: 'Nefrología', label: 'Nefrología' },
  { value: 'Neumonología', label: 'Neumonología' },
  { value: 'Neurocirugía', label: 'Neurocirugía' },
  { value: 'Nutrición', label: 'Nutrición' },
  { value: 'Odontología', label: 'Odontología' },
  { value: 'Odontopediatría', label: 'Odontopediatría' },
  { value: 'Oftalmología', label: 'Oftalmología' },
  { value: 'Ortodoncia', label: 'Ortodoncia' },
  { value: 'Otorrinolaringología', label: 'Otorrinolaringología' },
  { value: 'Pediatría', label: 'Pediatría' },
  { value: 'Reumatología', label: 'Reumatología' },
  { value: 'Traumatología', label: 'Traumatología' },
  { value: 'Urología', label: 'Urología' },
];

export const columnsUsers = [
    {name: "Id", uid: "ID"},
    {name: "Nombre", uid: "username"},
    {name: "Contraseña", uid: "password"},
    {name: "Tipo usuario", uid: "user_type"},
    {name: "Acciones", uid: "actions"},
  ];

export const columnsDoctors = [
    {name: "Cedúla", uid: "cedula"},
    {name: "Nombre", uid: "nombre"},
    {name: "Apellido", uid: "apellido"},
    {name: "Especialidad", uid: "especialidad"},
    {name: "Teléfono", uid: "telefono"},
    {name: "Correo", uid: "correo"},
    {name: "Acciones", uid: "actions"},
  ]

export const columnsPatients = [
    {name: "Cedúla", uid: "id_number"},
    {name: "Nombre", uid: "name"},
    {name: "Apellido", uid: "lastname"},
    {name: "Fecha de nacimiento", uid: "birthday"},
    {name: "Teléfono", uid: "phone_number"},
    {name: "Correo", uid: "email"},
    {name: "Acciones", uid: "actions"},
  ]

export const columnsAppointments = [
    {name: "Id Cita", uid: "idCita"},
    {name: "Fecha Cita", uid: "fechaCita"},
    {name: "Hora Cita", uid: "horaCita"},
    {name: "Id Paciente", uid: "idPaciente"},
    {name: "Estado", uid: "status"},
    {name: "Acciones", uid: "actions"},
  ];


export const columnsAppointments1 = [
    {name: "Id Cita", uid: "idCita"},
    {name: "Fecha Cita", uid: "fechaCita"},
    {name: "Hora Cita", uid: "horaCita"},
    {name: "Id Paciente", uid: "idPaciente"},
    {name: "Estado", uid: "status"},
  ];