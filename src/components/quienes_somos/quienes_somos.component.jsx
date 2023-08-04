import { arrowNext, section_Qsomos } from "../../assets"

const QSomosComponent = () => {
  return (
    <section id="qSomos" className="flex flex-col justify-center mx-10 my-10">
      <div className="flex flex-col justify-center items-center mb-8">
        <div className="flex flex-col items-center w-[45%]">
          <h1 className="text-primary text-[25px] mb-4">¿Quienes somos?</h1>
          <p className="text-center mb-2">Somos la principal iniciativa en salud de la Universidad Católica Andrés Bello. Fundado el 13 de septiembre de 1999, como un ambulatorio de atención primaria en salud, de gestión privada, alta calidad y precios solidarios.</p>
        </div>
        <button className="flex flex-row justify-center items-center text-primary">Leer mas <img src={arrowNext} alt="arrowIcon" className="w-[10px] ml-2 flex justify-center items-center"/></button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img src={section_Qsomos} alt="" />
      </div>
    </section>
  )
}

export default QSomosComponent