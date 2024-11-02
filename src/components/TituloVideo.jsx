import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/TituloVideo.css';

const TitleWithVideo = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
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
        <div className="content text-center relative flex flex-col h-full justify-center p-4">
          <h1 className="neon-text title-modern text-white text-5xl sm:text-6xl md:text-7xl font-roboto mt-20">
            CASA BLANCA<br />
            TENNIS ACADEMY
          </h1>
          <div className="button-container mt-20 mb-0 flex items-center justify-center">
            <div className="container-button hover:cursor-pointer" onClick={handleRegistroClick} >
              <div className="hover bt-1" />
              <div className="hover bt-2" />
              <div className="hover bt-3" />
              <div className="hover bt-4" />
              <div className="hover bt-5" />
              <div className="hover bt-6" />
              <button className="button-titulo-video" onClick={handleRegistroClick}></button>
            </div>
          </div>
      </div>
    </div>
  );      
};

export default TitleWithVideo;
