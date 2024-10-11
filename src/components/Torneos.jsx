import React from 'react';
import '../css/Torneos.css';
import { FaClock, FaCalendarAlt, FaDollarSign } from 'react-icons/fa'; // Asegúrate de que esta librería esté instalada
import { Link } from 'react-router-dom'; // Importa Link

const Torneos = () => {
  return (
    <div className="torneos-page">
      <h1>Próximos Torneos</h1>
      <div className="torneos-container">
        
        {/* Torneo 1 */}
        <div className="torneo">
          <span className="tag">Nivel Avanzado</span>
          <h2>Torneo de Maestros</h2>
          <p><FaCalendarAlt /> <strong>Fecha:</strong> 10 de Octubre, 2024</p>
          <p><FaClock /> <strong>Horario:</strong> 10:00 AM - 2:00 PM</p>
          <p><FaDollarSign /> <strong>Precio:</strong> $50 por participante</p>
          <p><strong>Categoría:</strong> Avanzado</p>
          <Link to="/formulario">
            <button className="form-button">Formulario</button>
          </Link>
        </div>
        
        {/* Torneo 2 */}
        <div className="torneo">
          <span className="tag">Nivel Intermedio</span>
          <h2>Torneo de Verano</h2>
          <p><FaCalendarAlt /> <strong>Fecha:</strong> 15 de Octubre, 2024</p>
          <p><FaClock /> <strong>Horario:</strong> 1:00 PM - 5:00 PM</p>
          <p><FaDollarSign /> <strong>Precio:</strong> $30 por participante</p>
          <p><strong>Categoría:</strong> Intermedio</p>
          <Link to="/formulario">
            <button className="form-button">Formulario</button>
          </Link>
        </div>
        
        {/* Torneo 3 */}
        <div className="torneo">
          <span className="tag">Nivel Principiante</span>
          <h2>Torneo de Iniciación</h2>
          <p><FaCalendarAlt /> <strong>Fecha:</strong> 20 de Octubre, 2024</p>
          <p><FaClock /> <strong>Horario:</strong> 9:00 AM - 12:00 PM</p>
          <p><FaDollarSign /> <strong>Precio:</strong> $20 por participante</p>
          <p><strong>Categoría:</strong> Principiante</p>
          <Link to="/formulario">
            <button className="form-button">Formulario</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Torneos;