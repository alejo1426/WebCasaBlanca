import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de que jwt-decode esté instalado
import Sidebar from './Sidebar';
import TopBar from './Topbar';
import DashboardView from './views/DashboardView';
import ClasesView from './views/ClasesView';
import PerfilView from './views/PerfilView';
import TorneosView from './views/TorneosView';
import AjustesView from './views/AjustesView';

const DashboardAdmin = () => {
  const navigate = useNavigate(); // Hook para redireccionar
  const [selectedView, setSelectedView] = useState('dashboard');
  const [selectedItem, setSelectedItem] = useState('agregar');

  // Función para verificar si el token ha expirado
  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Tiempo actual en segundos
      return decodedToken.exp < currentTime; // Retorna true si el token ha expirado
    } catch {
      return true; // Si hay un error al decodificar, consideramos el token como expirado
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Verificar si hay un token y si ha expirado
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token'); // Eliminar el token expirado
      navigate('/login'); // Redirigir a la página de inicio de sesión
    }
  }, [navigate]);

  // Función para renderizar el componente según la vista seleccionada
  const renderSelectedView = () => {
    switch (selectedView) {
      case 'dashboard':
        return <DashboardView />;
      case 'clases':
        return <ClasesView />;
      case 'perfil':
        return <PerfilView />;
      case 'torneos':
        return <TorneosView />;
      case 'ajustes':
        return <AjustesView selectedItem={selectedItem} />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-gray-100">
      <Sidebar setSelectedView={setSelectedView} setSelectedItem={setSelectedItem} />
      <div className="flex-grow flex flex-col">
        <TopBar />
        <main className="h-screen bg-white text-gray-800 flex px-4 lg:ml-64 ml-0 rounded-xl shadow">
          <div className="flex-grow p-4">{renderSelectedView()}</div>
        </main>
        <h1>ADMIN</h1>
      </div>
    </div>
  );
};

export default DashboardAdmin;
