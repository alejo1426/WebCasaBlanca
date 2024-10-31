/* eslint-disable react/prop-types */
import '../App.css';

const TopBar = ({ selectedView }) => {
  const getTitle = () => {
    switch (selectedView) {
      case 'dashboard':
        return 'Dashboard';
      case 'inscripciones':
        return 'Inscripciones';
      case 'torneos':
        return 'Torneos';
      case 'gestion':
        return 'Gestion';
      case 'perfil':
        return 'Perfil';
      case 'ajustes':
        return 'Ajustes';
      default:
        return 'Dashboard'; // Valor por defecto
    }
  };

  return (
    <div className="Dashboard-text h-16 bg-[#1d3557] flex items-center justify-center px-4 lg:ml-64 ml-0 rounded-xl shadow">
      <h1 className="text-3xl font-bold">{getTitle()}</h1> {/* Cambiado a text-xl */}
      {/* Aquí puedes añadir más elementos como el perfil del usuario o notificaciones */}
    </div>
  );
};

export default TopBar;
