

const ServiciosComponent = () => {
  return (
    <section id="servicios" className="flex flex-col justify-center mx-10 my-10">
      <div className="flex flex-col justify-center items-center mb-8">
        <div className="flex flex-col items-center w-[45%]">
          <h1 className="text-secondary text-[15px] font-poppins font-bold">SIEMPRE ATENTOS</h1>
          <h1 className="text-primary text-[25px] font-poppins font-bold mb-4">Servicios</h1>
          <p className="text-center text-[14px] font-poppins mb-2">El horario de atención es de lunes a viernes de 7:00 A.M. a 4:00 P.M.</p>
          <p className="text-center text-[14px] font-poppins mb-2">Las solicitudes de citas las puede realizar en la sección <button className="font-bold text-primary">agendar cita</button></p>
          <p className="text-center text-[14px] font-poppins mb-2">Si requiere más información que no esté publcada en nuestra página web o redes sociales puede llamar de lunes a viernes de 8:00 A.M. a 3:00 P.M. al número local 0212.471.12.66</p>
        </div>
      </div>
      <div className="flex flex-col">
          <p className="text-center text-[14px] font-poppins font-bold text-primary text-start mb-2">Consultas</p>
          <p className="text-center text-[14px] font-poppins font-bold text-primary text-start mb-2">Diagnóstico por imagen</p>
          <p className="text-center text-[14px] font-poppins font-bold text-primary text-start mb-2">Laboratio</p>
          <p className="text-center text-[14px] font-poppins font-bold text-primary text-start mb-2">Procedimientos</p>
          <p className="text-center text-[14px] font-poppins font-bold text-primary text-start mb-2">Rehabilitación</p>
      </div>
    </section>
  )
}

export default ServiciosComponent