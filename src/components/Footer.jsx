import React from 'react';
import '../css/Footer.css';
import logo from '../assets/logo.jpeg'; // Asegúrate de que esta ruta sea correcta

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Nosotros</a></li>
            <li><a href="#">Servicios</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Academia de Tenis Casa Blanca. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;