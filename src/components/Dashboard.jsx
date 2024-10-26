import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Sidebar from './Sidebar';
import TopBar from './Topbar';
import DashboardView from './views/DashboardView'; // Importa el nuevo componente
import InscripcionesView from './views/InscripcionesView';
import PerfilView from './views/PerfilView';
import TorneosView from './views/TorneosView';
import GestorView from './views/GestorView';
import AjustesView from './views/AjustesView'; // Importa el componente de clases // Importa el componente de torneos

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState('dashboard'); // Vista inicial: dashboard
  const [selectedItem, setSelectedItem] = useState('agregar');

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
  }, [navigate, selectedView, selectedItem]);

  // Función para renderizar el componente según la vista seleccionada
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
        return <GestorView />
      case 'ajustes':
        return <AjustesView selectedItem={selectedItem}/>;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#1d3557] text-gray-100">
      <Sidebar setSelectedView={setSelectedView} setSelectedItem={setSelectedItem} />
      <div className="flex-grow flex flex-col">
        <TopBar selectedView={selectedView} />
        <main className="max-h-screen bg-white text-gray-800 flex px-4 lg:ml-64 ml-0 rounded-xl shadow overflow-y-auto">
          <div className="flex-grow p-4">{renderSelectedView()}</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
