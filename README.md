# Sistema Integral de Gestión de Citas e Historias Médicas

<p  align="center">
  <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">  <img width="180" src="https://vitejs.dev/logo.svg" alt="Vite logo">  </a>  
  <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">  <img width="180" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg 2300px-React-icon.svg.png" alt="React logo">
  </a>
</p>
<br/>
<p  align="center">
  <a  href="https://npmjs.com/package/vite"><img  src="https://img.shields.io/npm/v/vite.svg"  alt="npm package"></a>
  <a  href="https://nodejs.org/en/about/previous-releases"><img  src="https://img.shields.io/node/v/vite.svg"  alt="node compatibility"></a
  <a  href="https://github.com/vitejs/vite/actions/workflows/ci.yml"><img  src="https://github.com/vitejs/vite/actions/workflows/ci.yml/badge.svg?branch=main"  alt="build status"></a>
  <a  href="https://pr.new/vitejs/vite"><img  src="https://developer.stackblitz.com/img/start_pr_dark_small.svg"  alt="Start new PR in StackBlitz Codeflow"></a>
  <a  href="https://chat.vitejs.dev"><img  src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord"  alt="discord chat"></a>
</p>
<br/>


## Descripción:

Este proyecto se ejecuta bajo la premisa de mejorar la atención médica mediante la implementación de soluciones tecnológicas avanzadas. El desarrollo se realiza de manera colaborativa, siguiendo las mejores prácticas de desarrollo de software, con especial atención a la calidad del código y la usabilidad de la interfaz.

---

### Arquitectura del Proyecto
-  **Frontend (ReactJs):**
- Interfaz de usuario construida con ReactJs, JSX y TailwindCSS.
- Implementación de componentes reutilizables para una experiencia visual atractiva.
- Utilización de Redux Toolkit, Formik, Next UI para el manejo de estado, formularios y componentes de interfaz.
---

### Instalación

Clonación Aplicación **Fronted**:

```
$ git clone https://github.com/jadiazinf/santa-ines-client.git
$ cd ../santa-ines-client
$ npm install
$ npm run dev
```
Para luego seguir los siguientes pasos:
>1. Dentro de la carpeta del proyecto **santa-ines-client**, crear un archivo .env para el manejo de las variables de entorno.
>2. Dentro del archivo .env copiar la siguientes variables:
>```
># BASE URL
>VITE_API_SERVER_BASE_URL=https://santainesapi.onrender.com
>VITE_API_USER_LOGIN=/user/login/
>VITE_API_USER_GET_ALL=/user/all/
>VITE_API_USER_GET_INFO=/user/info/
>VITE_API_USER_CREATE=/user/create/
>VITE_API_USER_UPDATE=/user/update/
>VITE_API_USER_DELETE=/user/delete/
># DOCTORS
>VITE_API_DOCTOR_GET_ALL=/doctor/findAll/
>VITE_API_DOCTOR_CREATE=/doctor/create
>VITE_API_DOCTOR_UPDATE=/doctor/modificate/
>VITE_API_DOCTOR_DELETE=/doctor/delete/
>VITE_API_DOCTOR_GET_BY_USERID=/doctor/findByIdUser/
># PATIENT
>VITE_API_PATIENT=/patient/
># APOINMENTS
>VITE_API_APPOINTMENT=/appointment/
>VITE_API_APPOINTMENT_GET_BY_ID_DOCTOR=/appointment/iddoctor/
>VITE_API_APPOINTMENT_GET_BY_ID_PATIENT=/appointment/idpatient/
>```
