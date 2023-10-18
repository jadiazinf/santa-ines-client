import React, { useState } from 'react';
import ServiciosComponent from './servicios.component';

// Info específica del servicio
const ServicioInfo = ({ title }) => {
  const [mostrarServicios, setMostrarServicios] = useState(false);
  const handleClick = () => {
    setMostrarServicios(true);
  };

  return (
    <section id="servicios" className="flex flex-col justify-center mx-10 my-10">

      {!mostrarServicios && (
        <div className="flex flex-col justify-center items-center mb-8">
          <div className="flex flex-col items-center w-[50%]">
            <h1 className="text-secondary text-[15px] font-poppins font-bold">SIEMPRE ATENTOS</h1>
            <h1 className="text-primary text-[25px] font-poppins font-bold mb-4">Servicios</h1>
            <p className="text-center text-[14px] font-poppins mb-2">El horario de atención es de lunes a viernes de 7:00 A.M. a 4:00 P.M.</p>
            <p className="text-center text-[14px] font-poppins mb-2">Las solicitudes de citas las puede realizar en la sección <button className="font-bold text-primary">agendar cita</button></p>
            <p className="text-center text-[14px] font-poppins mb-2">Si requiere más información que no esté publicada en nuestra página web o redes sociales puede llamar de lunes a viernes de 8:00 A.M. a 3:00 P.M. al número local 0212.471.12.66</p>
          </div>
        </div>
      )}

      {!mostrarServicios && (
        <div className="flex flex-col mb-8">
          <h1 className="text-dimBlue text-[25px] font-poppins font-bold mb-4">{title}</h1>
          <p className="flex flex-col items-justify text-center text-[14px] font-poppins mb-2">Información detallada del servicio</p>
        </div>
      )}

      {mostrarServicios && <ServiciosComponent />}

      {!mostrarServicios && (
        <button className="font-bold text-primary ml-auto" onClick={handleClick}>Ver otros servicios</button>
      )}

    </section>
  );
};

export default ServicioInfo;