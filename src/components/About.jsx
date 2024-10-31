import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import backgroundVideo from '../../public/video/About.mp4';
import '../css/About.css';

const About = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFooter(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Video de fondo */}
      <video
        className="absolute inset-0 object-cover w-full h-full z-[-1]"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={backgroundVideo} type="video/mp4" />
        Tu navegador no soporta videos.
      </video>

      {/* Header visible en todo momento */}
      <Header />

      {/* Contenido principal con padding-top */}
      <main className="relative flex flex-col justify-center items-center min-h-screen text-white text-center p-6 pt-48">
        <h1 className="text-4xl font-bold font-roboto mb-6">Acerca de Nosotros</h1>
        <p className="text-lg mb-4">
          Bienvenido a la Academia de Tenis Casa Blanca. Nuestra misión es formar tenistas de todas las edades y niveles, ofreciendo programas personalizados y un ambiente motivador.
        </p>
        <p className="text-lg mb-4">
          Contamos con entrenadores experimentados y apasionados, listos para ayudarte a mejorar tu juego y alcanzar tus objetivos.
        </p>
        <p className="text-lg mb-6">
          ¡Únete a nosotros y comienza tu viaje en el tenis!
        </p>
        <a href="/Registro" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
          Únete Ahora
        </a>

        {/* Mapa de la ubicación con borde */}
        <div className="mt-12 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">Nuestra Ubicación</h2>
          <div className="w-full h-96 p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6795135433704!2d-74.17808032591086!3d4.651127942087167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9df01963d579%3A0x60f788c2e8565af7!2sDulce%20moda%20kids!5e0!3m2!1ses!2sco!4v1730351253811!5m2!1ses!2sco"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </main>

      {/* Footer visible solo al desplazarse */}
      {showFooter && <Footer />}
    </div>
  );
};

export default About;
