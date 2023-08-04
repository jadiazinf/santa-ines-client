import React from 'react';

function EspecialidadCard({ svgIcon, title }) {
  const cardStyle =
    'bg-dimWhite border border-gray-300 shadow py-7 transition duration-300 group hover:bg-primary';
  const imageStyle =
    'w-full mb-3 group-hover:text-dimWhite';
  const titleStyle =
    'text-center text-[12px] font-poppins group-hover:text-dimWhite';
  const iconHoverStyle =
    'svg path {fill: #007AAE;} .group:hover svg path {fill: white;}';

  return (
    <div className={cardStyle} style={{ height: '130px', width: '140px' }}>
      <div className="flex flex-col justify-center items-center">
        <svg viewBox="0 0 24 24" className={imageStyle} style={{ height: '40px', width: '50px'}} > {svgIcon} </svg>
        <h2 className={titleStyle}>{title} </h2>
      </div>
      <style>{iconHoverStyle}</style>
    </div>
  );
}

function EspecialidadesList() {
  const cards = [
    {title: 'Adolescentologia',},
    {title: 'Cardiología',},
    {title: 'Cardiología Infaltil',},
    {title: 'Cirugía Bucal',},
    {title: 'Cirugía General',},
    {title: 'Dermatología',},
    {title: 'Endocrinología',},
    {title: 'Endodoncia',},
    {title: 'Fisiatría',},
    {title: 'Inmunología-alergología',},
    {title: 'Gastroenterología',},
    {title: 'Gastroenterología Pediátrica',},
    {title: 'Geriatría',},
    {title: 'Ginecología',},
    {title: 'Gineco-obstetricia',},
    {title: 'Ginecología Infanto-juvenil',},
    {title: 'Mastología',},
    {title: 'Medicina Familiar',},
    {title: 'Medicina General',},
    {title: 'Medicina Interna',},
    {title: 'Nefrología',},
    {title: 'Nefrología Pediátrica',},
    {title: 'Neumonología',},
    {title: 'Neurología',},
    {title: 'Neurocirugía',},
    {title: 'Nutrición y Dietética',},
    {title: 'Odontología General',},
    {title: 'Odontopediatría',},
    {title: 'Oftalmología',},
    {title: 'Ortondoncia',},
    {title: 'Otorrinolaringología',},
    {title: 'Pediatría',},
    {title: 'Podología',},
    {title: 'Psicodagogía',},
    {title: 'Reumatología',},
    {title: 'Terapia del Dolor',},
    {title: 'Terapia del Lenguaje',},
    {title: 'Traumatología',},
    {title: 'Urología',},
    {title: 'Urología Infantil',},
  ];

  return (
    <div className="flex flex-wrap">
      {cards.map((card, index) => (
        <div className="flex flex-col justify-center items-center" key={index} style={{ flex: '0 0 120px' }}>
          <EspecialidadCard
            svgIcon=<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path d="M14,11H13V10a1,1,0,0,0-2,0v1H10a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0V13h1a1,1,0,0,0,0-2Zm6.16-6A6.29,6.29,0,0,0,12,4.41a6.27,6.27,0,0,0-8.16,9.48l6,6.05a3,3,0,0,0,4.24,0l6-6.05A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6,6a1,1,0,0,1-1.42,0l-6-6a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.48Z"/></svg>
            title={card.title}
          />
        </div>
      ))}
    </div>
  );
}

export default EspecialidadesList;