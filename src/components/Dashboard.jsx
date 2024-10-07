import { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import TopBar from './topbar';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-gray-100">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-grow flex flex-col">
            <TopBar toggleSidebar={toggleSidebar} />
            <main className="p-6 grid grid-cols-3 gap-6">
            <h1>DATOS</h1>
            </main>
        </div>
    </div>
  );
};

export default Dashboard;
