import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../css/About.css';

const About = () => {
  const [showFooter, setShowFooter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowFooter(window.scrollY > 0);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 624);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload video on resize
    }
  }, [isMobile]);

  return (
    <div className="relative overflow-hidden">
      {/* Video de fondo */}
      <video
        ref={videoRef}
        className="absolute inset-0 object-cover w-full h-full z-[-2]"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Video de fondo de la Academia de Tenis Casa Blanca"
      >
        <source src={isMobile ? "/video/AboutMobile.mp4" : "/video/About.mp4"} type="video/mp4" />
        Tu navegador no soporta videos.
      </video>

      {/* Capa de opacidad sobre el video */}
      <div className="absolute inset-0 bg-black opacity-50 z-[-1]"></div>

      {/* Header visible en todo momento */}
      <Header />

      {/* Contenido principal con padding-top */}
      <main className="relative flex flex-col justify-center items-center min-h-screen text-white text-center p-6 pt-48">
        <h1 className="neon-text-tittle text-4xl font-bold font-roboto mb-6">Acerca de Nosotros</h1>
        
        {/* Contenedor para centrar el texto */}
        <div className="neon-text max-w-2xl text-center">
          <p className="text-lg mb-4">
            Bienvenido a la Academia de Tenis Casa Blanca. Nuestra misión es formar tenistas de todas las edades y niveles, ofreciendo programas personalizados y un ambiente motivador.
          </p>
          <p className="text-lg mb-4">
            Contamos con entrenadores experimentados y apasionados, listos para ayudarte a mejorar tu juego y alcanzar tus objetivos.
          </p>
          <p className="text-lg mb-6">
            ¡Únete a nosotros y comienza tu viaje en el tenis!
          </p>
        </div>

        {/* Mapa de la ubicación con borde */}
        <div className="mt-12 w-full max-w-2xl">
          <h2 className="neon-text-tittle text-2xl font-semibold mb-4">Nuestra Ubicación</h2>
          <div className="w-full h-96 p-4 border border-blue-500 rounded-lg shadow-2xl bg-[#1d3557]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.189641611283!2d-74.07653312429872!3d4.737090141339522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f850328464465%3A0xbee523d6055c67bf!2sCra.%2076%20%23%20146-30%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1730401956037!5m2!1ses!2sco"
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
