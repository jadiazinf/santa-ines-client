import { useState } from "react"
import { logo_SantaInes, menu, close } from "../../assets"
import { useSelector } from "react-redux";

/* eslint-disable no-unused-vars */
const navLinks = [
  {
    id: 'inicio',
    title:'Inicio',
  },
  {
    id: 'quienes-somos',
    title:'¿Quiénes Somos?'
  },
  {
    id: 'servicios',
    title:'Servicios'
  },
  {
    id: 'doctores',
    title:'Doctores'
  },
  {
    id: 'sesión',
    title:'Iniciar Sesión'
  },
]

export const NavbarComponent = () => {

  const { role } = useSelector(state => state.authenticatedUser);

  const [toggle, setToggle] = useState(false);
  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={ logo_SantaInes } alt="logo" className="w-[130px] ml-4" />
      <ul className="list-none md:flex hidden justify-end items-center flex-1">
        {navLinks.map((link, index) => (
          <li key={link.id} className={`font-normal cursor-pointer ${index === navLinks.length -1 ? 'mr-4' : 'mr-10'} text-primary`}>
            {link.title !== 'Iniciar Sesión' 
              ? <a href={`#${link.id}`} className="text-[17px]">{link.title}</a> 
              : role === 'not-authenticated'
                  ?  <a href={`#${link.id}`} className="text-[17px]">{link.title}</a>  
                  :  null
            }
          </li>
        ))}
      </ul>

      <div className="md:hidden flex flex-1 justify-end items-center">
        <img src={toggle ? close : menu} alt="menu" className="mm:w-[15px] xs:w-[20px] object-contain cursor-pointer mr-4" onClick={() => setToggle((prev) => !prev)}/>
        <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-dimWhite absolute top-16 right-4 min-w-[140px] rounded-xl sidebar mx-4 my-2`}>
          <ul className="list-none flex justify-end items-center flex-1 flex-col">
            {navLinks.map((link, index) => (
              <li key={link.id} className={`font-poppins font-normal cursor-pointer ${index === navLinks.length -1 ? 'mr-0' : 'mm:mb-1 ss:mb-3'}`}>
                {link.title !== 'Iniciar Sesión' 
                  ?  <a href={`#${link.id}`} className="text-primary hover:text-dimYellow  mm:text-[12px] ss:text-[14px] md:text-[16px]">{link.title}</a>
                  : role === 'not-authenticated'
                      ?   <a href={`#${link.id}`} className="text-primary hover:text-dimYellow  mm:text-[12px] ss:text-[14px] md:text-[16px]">{link.title}</a>
                      :  null
                }
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}



//De esta manera se coloca en el contenedor padre
{/* <div className={`w-full sm:px-16 px-6 flex justify-center items-center `}>
  <div className={`xl:max-w-[1280px] w-full`}>
    <Navbar/>
  </div>
</div> */}