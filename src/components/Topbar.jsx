const TopBar = ({ toggleSidebar, isSidebarOpen }) => {
    return (
      <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4">
        <button onClick={toggleSidebar} className="lg:hidden">
          <i className="ai-menu"></i>
        </button>
        <h1 className="text-lg font-bold">Dashboard</h1>
        {/* Aquí puedes añadir más elementos como el perfil del usuario o notificaciones */}
      </div>
    );
  };
  
export default TopBar;