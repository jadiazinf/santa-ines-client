export function contarCitasPorPaciente(citas, pacientes) {
  let cont = 0
  let arra = []
  for(let i = 0; i < pacientes.length; i++) {
    for(let j = 0; j < citas.length; j++) {
      if(citas[j].patientId === pacientes[i].id_number) {
        cont++
      }
    }
    arra.push({axis:  pacientes[i].name, count: cont})
    cont = 0
  }
  return arra
}

