# Sistema Integral de Gestión de Citas e Historias Médicas

## Descripción:
Este proyecto se ejecuta bajo la premisa de mejorar la atención médica mediante la implementación de soluciones tecnológicas avanzadas. El desarrollo se realiza de manera colaborativa, siguiendo las mejores prácticas de desarrollo de software, con especial atención a la calidad del código y la usabilidad de la interfaz.

---
### Arquitectura del Proyecto


-   **Backend (NestJs):**
    -   Desarrollado con NestJS y Node.js utilizando TypeScript.
    -   Estructurado en capas: Infraestructura, Aplicación y Dominio.
    -   Uso de PostgreSQL con Typeorm para la gestión de la base de datos.
    
-   **Frontend (ReactJs):**
    -   Interfaz de usuario construida con ReactJs, JSX y TailwindCSS.
    -   Implementación de componentes reutilizables para una experiencia visual atractiva.
    -   Utilización de Redux Toolkit, Formik, Next UI para el manejo de estado, formularios y componentes de interfaz.
 
 ---

### Instalación
Clonación Aplicación **Fronted**:
```
$ git clone https://github.com/jadiazinf/santa-ines-client.git
$ cd ../santa-ines-client
$ npm install
$ npm run dev
```
Clonación Aplicación **Backend**:
```
$ git clone https://github.com/Davidals70/SantaInesBackend.git
$ cd ../SantaInesBackend
$ npm install
$ npm run start:dev
```

>Ademas será necesario la creación de una BD en **PostgreSQL** con la siguiente estructura de datos:
>  
>![Estructura de datos](https://i.imgur.com/nkF8swB.png)
>
>Para luego seguir los siguientes pasos:
>
>1. Dentro de la carpeta del proyecto **backend**, crear un archivo .env para el manejo de las variables de entorno.
>2. Dentro del archivo .env copiar la siguientes variables, cambiando los valores por los suyos:
>```
>require('dotenv').config()      #No modificar
>POSTGRES_HOST  = nombre_host
>POSTGRES_PORT  = puerto
>POSTGRES_DB  = nombre_BD
>POSTGRES_USER  = nombre_usuario
>POSTGRES_PASSWORD  =  contraseña_BD
>```

