import '../App.css';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de que jwt-decode esté instalado
import { BiDownload } from 'react-icons/bi'; // Asegúrate de instalar react-icons
import ReportModal from './Ventana/Reportes'; // Importa el componente modal

const TopBar = ({ selectedView }) => {
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState(''); // Nuevo estado para almacenar el ID del usuario
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decodificar el token
        setUserRole(decodedToken.role); // Extraer el rol
        setUserId(decodedToken.id); // Extraer el ID del usuario (ajusta según la clave que uses en tu token)
      } catch (error) {
        console.error('Error decodificando el token:', error);
      }
    }
  }, []);

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

  const handleDownloadClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="Dashboard-text h-16 bg-[#1d3557] flex items-center justify-between px-4 lg:ml-64 ml-0 rounded-xl shadow">
        {/* Contenedor para el rol y título */}
        <div className="flex flex-col lg:flex-row items-center w-full">
          {/* Rol del usuario (visible solo en resoluciones de escritorio y tablet) */}
          {userRole && (
            <span className="text-white text-sm lg:text-lg mb-2 lg:mb-0 lg:mr-4">{`Rol: ${userRole}`}</span>
          )}
          {/* Título centrado */}
          <h1 className="text-3xl font-bold text-white text-center flex-grow">{getTitle()}</h1>
        </div>
        {/* Icono de descarga */}
        <BiDownload 
          className="text-white text-2xl cursor-pointer"
          onClick={handleDownloadClick}
        />
      </div>
  
      {/* Pasar userId y userRole al modal */}
      {isModalOpen && <ReportModal onClose={closeModal} role={userRole} Id={userId} />}
    </>
  );
};

export default TopBar;
