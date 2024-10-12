import React, { useEffect } from 'react';
import '../css/HeroSection.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import backgroundImage from '../assets/images/background.jpg';
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';
import image4 from '../assets/images/image4.jpg';
import image5 from '../assets/images/image5.jpg';
import Header from './Header'; // Importa el Header si ya lo tienes

const HeroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 }); // Inicializa AOS
  }, []);

  return (
    <div className="hero-section">
      <div className="main-image fade-in" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="titular" data-aos="fade-up">
          <h1>Academia de Tenis casa blanca</h1>
        </div>
      </div>
      
      <div className="collage-images fade-in" data-aos="fade-up">
        <div className="image-container image-left_cra">
          <img src={image1} alt="Imagen 1" />
          <h2>Cra. 76 # 146-30, Bogotá</h2>
          <h3>Bogotá D.C</h3>
        </div>
        <div className="image-container image-right">
          <img src={image2} alt="Imagen 2" />
          <h2>Horarios diponibles 24/7</h2>
          <h3>Lunes a Domingo</h3>
        </div>
      </div>

      <div className="collage-images fade-in" data-aos="fade-up">
        <div className="image-container image-left">
          <img src={image3} alt="Imagen 3" />
          <h2>Academia de tenis Casa Blanca</h2>
          <h3>En la Academia de Tenis Casa Blanca, nos dedicamos a formar a tenistas de todas las edades y niveles. </h3>
        </div>
        <div className="image-container image-right">
          <img src={image4} alt="Imagen 4" />
          <h2>Título Imagen 4</h2>
          <h3>Subtítulo Imagen 4</h3>
        </div>
      </div>
      
      <div className="image5-container fade-in" data-aos="fade-up">
        <img src={image5} alt="Image 5" />
        <h2>Academia de Tenis Casa Blanca</h2>
        <h3>La Academia de Tenis Casa Blanca es el lugar ideal para descubrir y potenciar tu pasión por el tenis. Ofrecemos entrenamientos especializados en un ambiente dinámico y profesional, con programas diseñados para jugadores de todos los niveles, desde principiantes hasta avanzados.</h3>
      </div>
    </div>
  );
};

export default HeroSection;