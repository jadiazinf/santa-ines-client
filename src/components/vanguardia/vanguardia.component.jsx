import { NavLink } from "react-router-dom";
import { teamSI, calendar, teamIcon, cash } from "../../assets"

const buttonsActions =[
  {
    text: "Consultar citas",
    icon: calendar,
    color: "bg-primary mm:left-[15%] ",
  },
  {
    text: "Precios",
    icon: cash,
    color: "bg-dimBlue mm:left-[60%] ss:left-[75%] ",
    link:'https://santainesucab.org.ve/servicios/precios/'
  },
  // {
  //   text: "Información",
  //   icon: teamIcon,
  //   color: "bg-dimYellow mm:hidden ss:block ss:left-[45%]",
  // },
]


export const VanguiardiaComponent = () => {
  return (
    <section className="flex justify-center flex-col z-0">
      <div className="grid grid-cols-2 place-content-end bg-slate-100">
        <div className=" flex flex-col justify-center items-center md:mx-10 ">
          <div className="w-[70%]">
            <h1 className="text-dimBlue text-2xl font-semibold mm:text-[16px] ss:text-[20px] md:text-[24px]">Cuidar la vida</h1>
            <h2 className="text-primary text-lg mm:text-[12px] ss:text-[16px] md:text-[20px] leading-normal md:leading-relaxed w-[90%] ">
            Nuestro equipo altamente capacitado y comprometido trabaja incansablemente para proporcionar atención de primer nivel a nuestros pacientes.
            </h2>
          </div>

          {/* Esto se deberia cambiar con los botones de Ashley, pero el tamano del margin es muy grande */}
          <a href="https://santainesucab.org.ve/servicios/" target="_blank" className="m-4 bg-dimWhite hover:bg-dimWhite border-primary border-2 text-primary font-poppins mm:py-1 mm:px-5 ss:py-3 ss:px-7 cursor-pointer hover:text-secondary" >
            Servicios
          </a>
        </div>
        <div >
          <img src={teamSI} alt="footer_img" className="object-cover w-full mm:min-h-[300px] ss:min-h-[400px] md:min-h-[500px] max-h-[500px]" />
        </div>
      </div>
      <div className="flex flex-row justify-center items-center">
        {buttonsActions.map((action, index) => (
          action.text !== 'Consultar citas' ? (
            <a href={action.link} target="_blank" key={index} className={`${action.color} absolute z-10 mm:py-3 mm:px-5 text-white mm:text-[12px] ss:text-[16px] md:text-[20px] rounded-[10px] mm:top-[385px] ss:top-[480px] md:top-[580px] hover:animate-bounce cursor-pointer`}>
              <ActionButton text={action.text} icon={action.icon} color={`${action.color}`} key={index} link={action.link} />
            </a>
          ) : (
            <NavLink to='/consultar-citas' key={index}  className={`${action.color} absolute z-10 mm:py-3 mm:px-5 text-white mm:text-[12px] ss:text-[16px] md:text-[20px] rounded-[10px] mm:top-[385px] ss:top-[480px] md:top-[580px] hover:animate-bounce cursor-pointer`}>
              <ActionButton text={action.text} icon={action.icon} color={`${action.color}`} key={index} link={action.link} />
            </NavLink>
          )
        ))}
      </div>
    </section>
  )
}

const ActionButton = (props) => {
  return (
    <>
      <div className="flex flex-row justify-center items-center" >
        <p>{props.text}</p>
        <img src={props.icon} alt="icon"  className="w-[20px] ml-3"/>
      </div>
    </>
  );
};