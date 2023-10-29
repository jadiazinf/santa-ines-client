import { useState } from "react"
import { logo_SantaInes, menu, close } from "../../assets"

/* eslint-disable no-unused-vars */
const navLinks = [
  {
    id: 'inicio',
    title:'Inicio',
  },
  {
    id: 'somos',
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
]

const NavbarComponent = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={ logo_SantaInes } alt="logo" className="" />
      <ul className="list-none md:flex hidden justify-end items-center flex-1">
        {navLinks.map((link, index) => (
          <li key={link.id} className={`font-normal cursor-pointer ${index === navLinks.length -1 ? 'mr-0' : 'mr-10'} text-primary`}>
             <a href={`#${link.id}`} className="text-[20px]">{link.title}</a>
          </li>
        ))}
      </ul>

      <div className="md:hidden flex flex-1 justify-end items-center">
        <img src={toggle ? close : menu} alt="menu" className="w-[28px] h-[28px] object-contain cursor-pointer" onClick={() => setToggle((prev) => !prev)}/>
        <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-dimWhite absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
          <ul className="list-none flex justify-end items-center flex-1 flex-col">
            {navLinks.map((link, index) => (
              <li key={link.id} className={`font-poppins font-normal cursor-pointer ${index === navLinks.length -1 ? 'mr-0' : 'mb-5'}`}>
                 <a href={link.id} className="text-primary text-[20px]">{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavbarComponent


//De esta manera se coloca en el contenedor padre
{/* <div className={`w-full sm:px-16 px-6 flex justify-center items-center `}>
  <div className={`xl:max-w-[1280px] w-full`}>
    <Navbar/>
  </div>
</div> */}