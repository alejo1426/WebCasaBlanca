import '../../css/Clases.css'; // Asegúrate de importar el nuevo CSS
import { FaClock, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Importa Link

const Clases = () => {
  return (
    <div className="clases-page">
      <h1>Clases Disponibles</h1>
      <div className="clases-container">

        {/* Clase 1 - Grupo */}
        <div className="clase">
          <span className="tag">Clase en Grupo</span>
          <h2>Clase de Entrenamiento en Grupo</h2>
          <p><FaCalendarAlt /> <strong>Fecha:</strong> Todos los Lunes</p>
          <p><FaClock /> <strong>Horario:</strong> 6:00 PM - 8:00 PM</p>
          <p><FaDollarSign /> <strong>Precio:</strong> $20 por participante</p>
          <p><strong>Categoría:</strong> Grupo</p>
          <Link to="/formulario">
            <button className="form-button">Formulario</button>
          </Link>
        </div>

        {/* Clase 2 - Individual */}
        <div className="clase">
          <span className="tag">Clase Individual</span>
          <h2>Clase de Entrenamiento Individual</h2>
          <p><FaCalendarAlt /> <strong>Fecha:</strong> Todos los Miércoles</p>
          <p><FaClock /> <strong>Horario:</strong> 4:00 PM - 5:00 PM</p>
          <p><FaDollarSign /> <strong>Precio:</strong> $40 por participante</p>
          <p><strong>Categoría:</strong> Individual</p>
          <Link to="/formulario">
            <button className="form-button">Formulario</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Clases;