import { NavLink } from 'react-router-dom';
import { adress_pointer, facebook, footer_SantaInes_2, instagram, mail, map, phone, twitter } from '../../assets'

export const footerLinks = [
  {
    title: "MENÚ",
    links: [
      {
        name: "Inicio",
        link: "",
      },
      {
        name: "¿Quienes somos?",
        link: "quienes-somos",
      },
      {
        name: "Servicios",
        link: "servicios",
      },
      {
        name: "Doctores",
        link: "doctores",
      },
      {
        name: "Inicio de sesión",
        link: "login",
      },
    ],
  },
];

export const socialMedia = [
  {
    title: 'CONTACTANOS',
    socialLinks: [
      {
        id: "social-media-1",
        icon: instagram,
        link: "https://www.instagram.com/cssi_ucab/",
      },
      {
        id: "social-media-2",
        icon: facebook,
        link: "https://www.facebook.com/centrodesalud.santaines/",
      },
      {
        id: "social-media-3",
        icon: twitter,
        link: "https://twitter.com/cssi_ucab",
      },
      {
        id: "social-media-4",
        icon: map,
        link: "https://www.google.com/maps/place/Centro+de+Salud+Santa+Inés+UCAB/@10.4663353,-66.9743749,17z/data=!3m1!4b1!4m6!3m5!1s0x8c2a5f8cc121035d:0x75b3a2921a9d8c7c!8m2!3d10.4663353!4d-66.9743749!16s%2Fg%2F1vnnkfy8?entry=ttu",
      },
    ]
  }
];

const Info = () =>{
  return(
    <div className='flex-[1] w-full flex flex-col justify-between flex-wrap mr-24'>
      <h4 className='font-medium mm:text-[14px] ss:text-[16px] md:text-[18px] text-white '>
        ACERCA DE NOSOTROS
      </h4>
      <p className='mm:text-[14px] ss:text-[16px] md:text-[18px] text-primary mm:mt-2 md:mt-6'>Fundación Santa Inés UCAB</p>
      <p className='mm:text-[12px] ss:text-[14px] md:text-[16px] text-white mm:mt-2 md:mt-6 max-w-[90%]'>Somos la principal iniciativa en salud de la Universidad Católica Andrés Bello. Fundado el 13 de septiembre de 1999, como un ambulatorio de atención primaria en salud, de gestión privada, alta calidad y precios solidarios.</p>
    </div>
  )
}

const MenuOptions = () => {
  return (
    <div className='flex-[1] w-full flex flex-row justify-between flex-wrap mm:mt-6 md:mt-0'>
      {footerLinks.map((footerLink, index)=> (
        <div key={index} className='flex flex-col'>
          <h4 className='mm:text-[14px] ss:text-[16px] md:text-[18px] font-medium text-[18px] text-white '>
            {footerLink.title}
          </h4>
          <ul className='list-none mm:mt-2 md:mt-8 mt-8'>
            {footerLink.links.map((item, index) => (
              <li key={index} className={` text-white ${index !== footerLink.links.length -1 ? 'mb-4' : 'mb-0'} hover:text-dimYellow`}>
                {item.name !== 'Inicio de sesión'
                  ? <a href={`#${item.link}`} className=' mm:text-[12px] ss:text-[14px] md:text-[18px]'>▸ {item.name}</a>
                  : <NavLink to={item.link} className=' mm:text-[12px] ss:text-[14px] md:text-[18px]'>▸ {item.name}</NavLink>
                }
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

const ContactanosColumn = () => {
  return (
    <div className='flex-[1] w-full flex flex-col justify-between flex-wrap mm:mt-6 md:mt-0 text-white'>
      {socialMedia.map((mediaLink, index) => (
        <div key={index} className='flex flex-col' >
          <h4 className='mm:text-[14px] ss:text-[16px] md:text-[18px] font-medium text-[18px]'>
            {mediaLink.title}
          </h4>
          <ul className='list-none mm:mt-3 md:mt-8 flex flex-row'>
            {mediaLink.socialLinks.map((link, index) => (
              <li key={index} className={`e ${index !== mediaLink.socialLinks.length -1 ? 'mb-4' : 'mb-0'}`}>
                <a href={link.link} target="_blank" className='rounded-full mm:w-10 mm:h-10 md:w-12  md:h-12  flex justify-center items-center mr-3 bg-gray-600 hover:bg-dimYellow' rel="noreferrer">
                  <img  src={link.icon} alt='instagram' className={`mm:w-[20px] mm:h-[20px] md:w-[25px] md:h-[25px] object-contain cursor-pointer`}/>
                </a>
              </li>
            ))}
          </ul>
          <div className='flex flex-[1] flex-col justify-center items-start'>
            <div className='flex flex-row justify-start items-center mb-4'>
              <img src={ adress_pointer } alt="" className='h-[40px] mr-3' />
              <p className=' hover:text-secondary mm:text-[12px] ss:text-[14px] md:text-[16px]'>Parque Social Manuel Aguirre S.J., Edificio Centro de Salud Santa Inés UCAB, Urbanización Montalbán, frente a la UCAB, Caracas. Venezuela.</p>
            </div>
            <div className='flex flex-row justify-start mb-4'>
              <img src={ mail } alt="" className='mr-5 h-[25px]' />
              <p className=' hover:text-secondary mm:text-[12px] ss:text-[14px] md:text-[16px]'>contacto.cssi@gmail.com</p>
            </div>
            <div className='flex flex-row justify-start'>
              <img src={ phone } alt="" className='mr-5 h-[25px]' />
              <p className=' hover:text-secondary mm:text-[12px] ss:text-[14px] md:text-[16px]'>+58 0212-4711266</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


export const FooterComponent = () => {
  return (
    <section className="flex justify-center items-center sm:py-16 py-10 w-full relative font-poppins">
      <div className='flex justify-center items-start md:flex-row flex-col my-8 mx-20 w-full z-10'>
        <Info/>
        <MenuOptions/>
        <ContactanosColumn/>
      </div>
      {/* Imagen que se renderiza para el fondo del footer */}
      <img src={footer_SantaInes_2} alt="footer_img" className="w-full h-full object-cover absolute z-0" />
      <div className="absolute inset-0 bg-black opacity-70"></div>
      {/* Imagen que se renderiza para el fondo del footer */}
    </section>
  )
}