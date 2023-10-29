import { arrowNext, section_Qsomos } from "../../assets"

export const QSomosComponent = () => {
  return (
    <section id="quienes-somos" className="flex flex-col justify-center mx-10 mt-20 mb-10">
      <div className="flex flex-col justify-center items-center mb-8 ">
        <div className="flex flex-col items-center w-[45%] ">
          <h1 className="text-primary text-[25px] mb-4 font-bold">¿Quienes somos?</h1>
          <p className="text-center mb-2">Somos la principal iniciativa en salud de la Universidad Católica Andrés Bello. Fundado el 13 de septiembre de 1999, como un ambulatorio de atención primaria en salud, de gestión privada, alta calidad y precios solidarios.</p>
        </div>
        <a href="https://santainesucab.org.ve/quienes-somos/" target="_blank" className="flex flex-row justify-center items-center text-primary ">
          Leer más <img src={arrowNext} alt="arrowIcon" className="w-[10px] ml-2 flex justify-center items-center"/>
        </a>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img src={section_Qsomos} alt="" />
      </div>
    </section>
  )
}
