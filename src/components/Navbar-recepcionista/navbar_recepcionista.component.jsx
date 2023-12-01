import { useState } from "react"
import { logo_SantaInes, menu, close } from "../../assets"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../store/reducers/user.reducer";

/* eslint-disable no-unused-vars */
const navLinks = [
  {
    id: 'perfil',
    title:'Perfil',
  },
  {
    id: 'login',
    title:'Cerrar Sesión'
  },
]

export const NavbarRecepcionistaComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLinkClick = (path) => {
    if (path === 'login') {
      path = '/login';
      dispatch(authenticateUser({
        username: '',
        role: 'not-authenticated'
      }))
    }
    navigate('perfil');
  };


  return (
    <nav className="w-full flex py-6 justify-between items-center navbar px-10">
      <img src={ logo_SantaInes } alt="logo" className="" />
      <ul className="list-none flex justify-end items-center flex-1">
        {navLinks.map((link, index) => (
          <li key={link.id} className={`font-normal cursor-pointer ${index === navLinks.length -1 ? 'mr-0' : 'mr-10'} text-primary`}>
            <a onClick={() => handleLinkClick(`${link.id}`)} className="text-[20px]">{link.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}