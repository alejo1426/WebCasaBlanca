import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import '../css/Header.css';
import logo from '../assets/logo.jpeg';

const Header = () => {
  return (
    <header className="site-header">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Inicio</Link></li> 
            <li><Link to="/torneos">Torneos</Link></li> {/* Link a Torneos */}
            <li><Link to="/Clases">Clases</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;