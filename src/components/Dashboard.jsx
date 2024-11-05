import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Sidebar from './Sidebar';
import TopBar from './Topbar';
import DashboardView from './views/DashboardView';
import InscripcionesView from './views/InscripcionesView';
import PerfilView from './views/PerfilView';
import TorneosView from './views/TorneosView';
import GestorView from './views/GestorView';
import AjustesView from './views/AjustesView';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState('dashboard');
  const [selectedItem, setSelectedItem] = useState('agregar');
  const [userRole, setUserRole] = useState(''); // Estado para almacenar el rol del usuario

  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch {
      return true;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token');
      navigate('/login');
    } else {
      // Decodifica el token y extrae el rol
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role); // Suponiendo que el rol está en el campo 'role'
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, [navigate, selectedView, selectedItem]);

  const renderSelectedView = () => {
    switch (selectedView) {
      case 'dashboard':
        return <DashboardView />;
      case 'inscripciones':
        return <InscripcionesView />;
      case 'perfil':
        return <PerfilView />;
      case 'torneos':
        return <TorneosView />;
      case 'gestion':
        return <GestorView />;
      case 'ajustes':
        return <AjustesView selectedItem={selectedItem} />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#1d3557] text-gray-100">
      <Sidebar setSelectedView={setSelectedView} setSelectedItem={setSelectedItem} />
      <div className="flex-grow flex flex-col">
        <TopBar selectedView={selectedView} userRole={userRole} /> {/* Pasa el rol a TopBar */}
        <main className="max-h-screen bg-gray-100 text-gray-800 flex px-4 lg:ml-64 ml-0 rounded-xl shadow overflow-y-auto">
          <div className="flex-grow p-4">{renderSelectedView()}</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
