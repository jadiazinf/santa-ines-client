import { teamSI, teamSI2 } from "../../assets"

export const VanguiardiaComponent = () => {
  return (
    <section className="flex justify-center flex-col">
      <div className="grid grid-cols-2 place-content-end bg-slate-100">
        <div className=" flex flex-col justify-center items-center md:mx-10 ">
          <div className="w-[70%]">
            <h1 className="text-dimBlue text-2xl font-semibold mm:text-[16px] ss:text-[20px] md:text-[24px]">Cuidar la vida</h1>
            <h2 className="text-primary text-lg mm:text-[12px] ss:text-[16px] md:text-[20px] leading-normal md:leading-relaxed w-[90%] ">
            Nuestro equipo altamente capacitado y comprometido trabaja incansablemente para proporcionar atención de primer nivel a nuestros pacientes.
            </h2>
          </div>

          {/* Esto se deberia cambiar con los botones de Ashley, pero el tamano del margin es muy grande */}
          <button className="m-4 bg-dimWhite hover:bg-dimWhite border-primary border-2 text-primary font-poppins mm:py-1 mm:px-5 ss:py-3 ss:px-7 ">
            Servicios
          </button>
        </div>
        <div >
          <img src={teamSI2} alt="footer_img" className="object-cover w-full mm:min-h-[300px] ss:min-h-[400px] md:min-h-[500px]" />
        </div>
      </div>
    </section>
  )
}

