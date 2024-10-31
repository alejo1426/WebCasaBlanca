import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TitleWithVideo = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 624);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [isMobile]);

  const handleRegistroClick = () => {
    navigate('/signup');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-between">
      <video 
        ref={videoRef} 
        className="absolute inset-0 w-full h-full object-cover" 
        autoPlay 
        loop 
        muted 
        aria-label="Video de fondo de la Academia de Tenis Casa Blanca"
      >
        <source src={isMobile ? "/video/homeMobile.mp4" : "/video/home.mp4"} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
      <div className="overlay-layer absolute inset-0 bg-black opacity-50"></div>
      <div className="content text-center relative flex flex-col h-full justify-center">
        <h1 className="title-modern text-white text-6xl md:text-5xl font-roboto mt-20">
          CASA BLANCA<br />
          TENNIS ACADEMY
        </h1>
        <div className="button-container mt-20 mb-0 flex items-center justify-center">
          <button 
            onClick={handleRegistroClick} 
            className="cta-button bg-transparent text-2xl bg-opacity-80 backdrop-blur-lg text-white px-6 py-2 rounded-[16px] transition duration-300 hover:bg-orange-500 hover:text-white font-roboto"
          >
            ¡Registrate!
          </button>
        </div>
      </div>
    </div>
  );      
};

export default TitleWithVideo;
