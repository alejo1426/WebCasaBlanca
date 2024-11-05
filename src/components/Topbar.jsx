/* eslint-disable react/prop-types */
import '../App.css';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de tener jwt-decode instalado
import { BiDownload } from 'react-icons/bi'; // Asegúrate de instalar react-icons
import ReportModal from './Ventana/Reportes'; // Importa el componente modal

const TopBar = ({ selectedView }) => {
  const [userRole, setUserRole] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    // Obtener el token de localStorage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decodificar el token
        setUserRole(decodedToken.role); // Extraer el rol
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
    setIsModalOpen(true); // Mostrar el modal cuando se hace clic en el ícono de descarga
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  return (
    <>
      <div className="Dashboard-text h-16 bg-[#1d3557] flex items-center justify-between px-4 lg:ml-64 ml-0 rounded-xl shadow">
        <div className="flex items-center">
          {userRole && (
            <span className="text-white text-sm lg:text-lg mr-4">{`Rol: ${userRole}`}</span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-white text-center flex-grow">{getTitle()}</h1>
        <BiDownload 
          className="text-white text-2xl cursor-pointer"
          onClick={handleDownloadClick}
        />
      </div>
      
      {/* Renderizar el modal si isModalOpen es true */}
      {isModalOpen && <ReportModal onClose={closeModal} role={userRole} />}
    </>
  );
};

export default TopBar;
