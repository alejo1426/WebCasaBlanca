/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import backgroundImage from '../assets/images/background.jpg';
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';
import image4 from '../assets/images/image4.jpg';
import image5 from '../assets/images/image5.jpg';
import '../css/HeroSection.css';

const animations = ['fade-up', 'fade-left', 'fade-right', 'zoom-in', 'fade-down']; // Lista de animaciones

const InfoCard = ({ image, title, subtitle, description, className, aosEffect }) => (
  <div
    className={`image-container bg-white backdrop-blur-lg shadow-md rounded-lg overflow-hidden ${className}`}
    data-aos={aosEffect} // Asignar la animación
    data-aos-duration="500"
  >
    <img src={image} alt={title} className="w-full h-40 object-cover" loading="lazy"/>
    <div className="p-3">
      <h2 className="text-lg text-center text-[#1d3557] font-bold">{title}</h2>
      <h3 className="text-gray-800 font-semibold text-center">{subtitle}</h3>
      <p className="text-gray-600 text-center mt-1">{description}</p>
    </div>
  </div>
);

const HeroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="hero-section bg-gray-100">
      <div className="relative h-[500px] md:h-[650px] flex items-start justify-center">
        <img
          src={backgroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 w-full h-10 bg-gradient-to-t from-[#8da9c4] to-transparent"></div>
        <h1
          className="relative text-4xl md:text-6xl text-white font-semibold backdrop-blur-lg bg-opacity-80 p-5 rounded-md shadow-2xl mt-12 md:mt-36"
          data-aos="fade-up"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Donde los Campeones Empiezan su Camino
        </h1>
      </div>

      <div className="section-2 flex flex-col md:flex-row justify-center items-center p-4 space-y-4 md:space-y-0 md:space-x-4">
        <InfoCard
          image={image1}
          title="Horarios disponibles Lunes A Domingo"
          subtitle="7:00 am - 6:00pm"
          description="Consigue un horario que se adapte a ti."
          aosEffect={animations[0]}
        />
        <InfoCard
          image={image2}
          title="Academia de Tenis Casa Blanca"
          subtitle="En la Academia de Tenis Casa Blanca, nos dedicamos a formar a tenistas de todas las edades y niveles."
          description="Ofrecemos programas personalizados, entrenamientos de calidad y un ambiente motivador para que cada jugador desarrolle su potencial. ¡Únete a nosotros y comienza tu viaje en el tenis!"
          aosEffect={animations[1]}
        />
      </div>

      <div className="section-3 flex flex-col md:flex-row justify-center items-center p-4 space-y-4 md:space-y-0 md:space-x-4">
        <InfoCard
          image={image3}
          title="Conoce a Nuestros Entrenadores"
          subtitle="Profesionales apasionados listos para ayudarte a mejorar."
          description="Nuestro equipo de entrenadores cuenta con años de experiencia y están comprometidos con el desarrollo de cada jugador."
          aosEffect={animations[2]}
        />
        <InfoCard
          image={image4}
          title="Participa en Nuestros Torneos"
          subtitle="Demuestra tus habilidades y gana premios."
          description="Inscríbete en nuestros torneos y compite con otros apasionados del tenis. ¡Los mejores premios te están esperando!"
          aosEffect={animations[3]}
        />
      </div>

      <div className="section-4 flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
        <InfoCard
          image={image5}
          title="Academia de Tenis Casa Blanca"
          subtitle="La Academia de Tenis Casa Blanca es el lugar ideal para descubrir y potenciar tu pasión por el tenis. Ofrecemos entrenamientos especializados en un ambiente dinámico y profesional, con programas diseñados para jugadores de todos los niveles, desde principiantes hasta avanzados."
          aosEffect={animations[4]} // Animación 5
        />
      </div>
    </div>
  );
};

export default HeroSection;
