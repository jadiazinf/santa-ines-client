import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
   import 'slick-carousel/slick/slick-theme.css';
import { useState } from "react";
import { doctor } from "../../assets"

//DATA JSON
/* const cardData = jsonData.map((doctor) => ({
  id: doctor.id,
  photo: doctor.photo
  name: doctor.name,
  specialty: doctor.specialty,
})); */

//DATA PRUEBA
const cardData = [
  { id: 1, image: "ruta/doctor.png", name: "Doctor 1", specialty: "Especialidad 1" },
  { id: 2, image: "ruta/doctor.png" , name: "Doctor 2", specialty: "Especialidad 2" },
  { id: 3, image: "ruta/doctor.png", name: "Doctor 3", specialty: "Especialidad 3" },
  { id: 4, image: "ruta/doctor.png", name: "Doctor 4", specialty: "Especialidad 4" },
  { id: 5, image: "../../assets/png/doctor.png" , name: "Doctor 5", specialty: "Especialidad 5" },
  { id: 6, image: {doctor}, name: "Doctor 6", specialty: "Especialidad 6" },
];


//STYLE
const DoctorCard = ({ image, title, description }) => {
  const cardStyle =
    'bg-dimWhite border border-gray-300 shadow py-7 transition duration-300';
  const imageStyle =
    'w-full mb-3';
  const titleStyle =
    'text-center text-[15px] font-poppins text-primary';
  const descriptionStyle =
    'text-center text-[16px] font-bold font-poppins text-primary';

  return (
    <div className={cardStyle} style={{ height: '400px', width: '230px' }}>
      <div className="flex flex-col justify-center items-center">
        <img src={doctor} alt={title} className={imageStyle} style={{ height: '240px', width: '230px'}} />
        <h2 className={titleStyle}>{title}</h2>
        <h2 className={descriptionStyle}>{description.toUpperCase()}</h2>
        <button className="bg-primary text-white py-2 px-14 rounded mt-3">Ver perfil</button>
      </div>
    </div>
  );
};


//CAROUSEL
const DoctorCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    beforeChange: (current, next) => setCurrentSlide(next),
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: i === currentSlide ? '#73B72B' : '#ABE36F',
          borderRadius: "50%",
          display: "inline-block",
        }}
      />
    ),
  };

  return (
    <Slider {...settings}>
      {cardData.map((card) => (
        <div key={card.id}>
          <DoctorCard
            svgIcon={card.image}
            title={card.name}
            description={card.specialty}
          />
        </div>
      ))}
    </Slider>
  );
};

export default DoctorCarousel;