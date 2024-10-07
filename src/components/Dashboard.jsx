import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './Topbar';
import DashboardView from './views/DashboardView'; // Importa el nuevo componente
import ClasesView from './views/ClasesView';
import PerfilView from './views/PerfilView';
import TorneosView from './views/TorneosView';
import AjustesView from './views/AjustesView'; // Importa el componente de clases // Importa el componente de torneos

const Dashboard = () => {
  const [selectedView, setSelectedView] = useState('dashboard'); // Vista inicial: dashboard
  const [selectedItem, setSelectedItem] = useState('agregar');

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
        return <AjustesView selectedItem={selectedItem}/>;
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
      </div>
    </div>
  );
};

export default Dashboard;
