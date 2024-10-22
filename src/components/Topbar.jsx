import '../App.css';

const TopBar = () => {
  return (
    <div className="Dashboard-text h-16 bg-gray-800 flex items-center justify-center px-4 lg:ml-64 ml-0 rounded-xl shadow">
      <h1 className="text-lg font-bold">Dashboard</h1>
      {/* Aquí puedes añadir más elementos como el perfil del usuario o notificaciones */}
    </div>
  );
};

export default TopBar;
