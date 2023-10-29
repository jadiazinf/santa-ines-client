import React from 'react';

function Card({ svgIcon, altText, title, description1, description2 }) {
  const cardStyle =
    'bg-dimWhite border border-gray-300 rounded shadow p-5 transition duration-300 group hover:bg-primary';
  const imageStyle =
    'w-full group-hover:text-dimWhite';
  const titleStyle =
    'text-xl font-poppins font-bold text-primary mb-2 group-hover:text-dimWhite';
  const description1Style =
    'text-primary font-poppins leading-relaxed text-base group-hover:text-dimWhite';
  const description2Style =
    'text-primary font-poppins leading-relaxed text-base group-hover:text-dimWhite';
  const iconHoverStyle =
    'svg path {fill: #73B72B;} .group:hover svg path {fill: white;}';

  return (
    <div className={cardStyle} style={{ height: '270px', width: '280px' }}>
      <div className="group">
        <svg viewBox="0 0 24 24" className={imageStyle} style={{ height: '90px', width: '100px'}} > {svgIcon} </svg>
        <h2 className={titleStyle}>{title} </h2>
        <p className={description1Style}>{description1}</p>
        <p className={description2Style}>{description2}</p>
      </div>
      <style>{iconHoverStyle}</style>
    </div>
  );
}

function CardList() {
  const cards = [
    {
      svgIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16"> <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/> </svg>
      ),
      title: '¡Llámanos!',
      description1: '(0212) 471-12-66',
      description2: 'Puede llamar de lunes a viernes de 8:00 A.M a 3:00 P.M',
    },
    {
      svgIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16"> <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/> <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
      ),
      title: 'Ubicación',
      description1: 'Parque Social Padre Manuel Aguirre S.J. Urb. Montalbán, Av. Teherán. Caracas, Venezuela',
    },
    {
      svgIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16"> <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/> </svg>
      ),
      title: 'Correo',
      description1: 'contacto.cssi@gmail.com',
    },
    {
      svgIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16"> <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/> <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/> </svg>
      ),
      title: 'Horario',
      description1: 'El horario de atención es de lunes a viernes de 7.00 A.M. a 4:00 P.M',
    },
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {cards.map((card, index) => (
        <div className="m-5" key={index} style={{ flex: '0 1 200px' }}>
          <Card
            svgIcon={card.svgIcon}
            altText={card.altText}
            title={card.title}
            description1={card.description1}
            description2={card.description2}
          />
        </div>
      ))}
    </div>
  );
}

export default CardList;