import { adress_pointer, facebook, footer_SantaInes_2, instagram, linkedin, mail, phone, twitter } from '../../assets'

export const footerLinks = [
  {
    title: "MENÚ",
    links: [
      {
        name: "Quienes somos?",
        link: "https://www.hoobank.com/content/",
      },
      {
        name: "Servicios",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "Doctores",
        link: "https://www.hoobank.com/create/",
      },
      {
        name: "Contacto",
        link: "https://www.hoobank.com/explore/",
      },
      {
        name: "Inicio de sesión",
        link: "https://www.hoobank.com/terms-and-services/",
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
        link: "https://www.instagram.com/",
      },
      {
        id: "social-media-2",
        icon: facebook,
        link: "https://www.facebook.com/",
      },
      {
        id: "social-media-3",
        icon: twitter,
        link: "https://www.twitter.com/",
      },
      {
        id: "social-media-4",
        icon: linkedin,
        link: "https://www.linkedin.com/",
      },
    ]
  }
];

const Info = () =>{
  return(
    <div className='flex-[1] w-full flex flex-col justify-between flex-wrap mr-24'>
      <h4 className='font-medium text-[18px] text-white'>
        ACERCA DE NOSOTROS
      </h4>
      <p className=' text-[16px] text-primary xs:mt-2 md:mt-8'>Fundación Santa Inés UCAB</p>
      <p className=' text-[16px] text-white xs:mt-2 md:mt-8 max-w-[90%]'>Somos la principal iniciativa en salud de la Universidad Católica Andrés Bello.Fundado el 13 de septiembre de 1999, como un ambulatorio de atención primaria en salud, de gestión privada, alta calidad y precios solidarios.</p>
    </div>
  )
}

const MenuOptions = () => {
  return (
    <div className='flex-[1] w-full flex flex-row justify-between flex-wrap   xs:mt-6 md:mt-0'>
      {footerLinks.map((footerLink)=> (
        <div key={footerLink.key} className='flex flex-col'>
          <h4 className=' font-medium text-[18px] text-white '>
            {footerLink.title}
          </h4>
          <ul className='list-none xs:mt-2 md:mt-8 mt-8'>
            {footerLink.links.map((link, index) => (
              <li key={index} className={`text-[16px] text-white ${index !== footerLink.links.length -1 ? 'mb-4' : 'mb-0'} hover:text-dimYellow`}>
                <a href="#">▸ {link.name}</a>
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
    <div className='flex-[1] w-full flex flex-col justify-between flex-wrap xs:mt-6 md:mt-0 text-white'>
      {socialMedia.map((mediaLink) => (
        <div key={mediaLink.key} className='flex flex-col' >
          <h4 className='font-medium text-[18px]'>
            {mediaLink.title}
          </h4>
          <ul className='list-none xs:mt-2 md:mt-8 flex flex-row'>
            {mediaLink.socialLinks.map((link, index) => (
              <li key={index} className={`e ${index !== mediaLink.socialLinks.length -1 ? 'mb-4' : 'mb-0'}`}>
                <span className='rounded-full w-12 h-12 flex justify-center items-center mr-3 bg-gray-600 hover:bg-dimYellow'>
                  <img  src={link.icon} alt='instagram' className={`w-[25px] h-[25px] object-contain cursor-pointer`}/>
                </span>
              </li>
            ))}
          </ul>
          <div className='flex flex-[1] flex-col justify-center items-start'>
            <div className='flex flex-row justify-start items-center mb-4'>
              <img src={ adress_pointer } alt="" className='h-[40px] mr-3' />
              <p className=' hover:text-secondary '>Parque Social Manuel Aguirre S.J., Edificio Centro de Salud Santa Inés UCAB, Urbanización Montalbán, frente a la UCAB, Caracas. Venezuela.</p>
            </div>
            <div className='flex flex-row justify-start mb-4'>
              <img src={ mail } alt="" className='mr-5 h-[25px]' />
              <p className=' hover:text-secondary'>contacto.cssi@gmail.com</p>
            </div>
            <div className='flex flex-row justify-start'>
              <img src={ phone } alt="" className='mr-5 h-[25px]' />
              <p className=' hover:text-secondary'>+58 0212-4711266</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


const FooterComponent = () => {
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


export default FooterComponent


