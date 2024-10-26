import React from 'react';
import '../css/TitleWithVideo.css'; // Asegúrate de crear este archivo CSS

const TitleWithVideo = () => {
  return (
    <div className="video-container">
      <video className="background-video" autoPlay loop muted>
        <source src="/video/home.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="capa"></div>
      <div className="content" data-aos="fade-up">
        <h1 className="title-modern">Casa Blanca</h1>
      </div>
      <div className="content2" data-aos="fade-up">
        <h1 className="title-modern2">tennis academy</h1>
      </div>
      <div className="button-container">
        <button className="cta-button">¡Únete ahora!</button>
      </div>
    </div>
  );
};

export default TitleWithVideo;